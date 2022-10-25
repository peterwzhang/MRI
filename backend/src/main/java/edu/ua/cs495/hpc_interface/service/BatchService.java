package edu.ua.cs495.hpc_interface.service;

import edu.ua.cs495.hpc_interface.async.executor.OneTimeExecutor;
import edu.ua.cs495.hpc_interface.async.tasks.CancelMultiJobTask;
import edu.ua.cs495.hpc_interface.async.tasks.SubmitMainJobsTask;
import edu.ua.cs495.hpc_interface.async.tasks.SubmitSetupTask;
import edu.ua.cs495.hpc_interface.domain.dto.BatchForSubmissionDTO;
import edu.ua.cs495.hpc_interface.domain.entity.Batch;
import edu.ua.cs495.hpc_interface.domain.entity.Job;
import edu.ua.cs495.hpc_interface.domain.entity.Script;
import edu.ua.cs495.hpc_interface.domain.entity.User;
import edu.ua.cs495.hpc_interface.domain.mapper.BatchMapper;
import edu.ua.cs495.hpc_interface.domain.mapper.ScriptMapper;
import edu.ua.cs495.hpc_interface.domain.repository.BatchRepository;
import edu.ua.cs495.hpc_interface.domain.repository.JobRepository;
import edu.ua.cs495.hpc_interface.domain.repository.ScriptRepository;
import edu.ua.cs495.hpc_interface.domain.types.BatchStatus;
import edu.ua.cs495.hpc_interface.domain.types.JobState;
import edu.ua.cs495.hpc_interface.exception.NotFoundException;
import edu.ua.cs495.hpc_interface.exception.UnauthorizedException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor(onConstructor_ = { @Autowired })
public class BatchService {

  private BatchMapper batchMapper;
  private BatchRepository batchRepository;

  private ScriptMapper scriptMapper;
  private ScriptRepository scriptRepository;

  private JobRepository jobRepository;

  private SSHService sshService;

  private OneTimeExecutor oneTimeExecutor;

  public Batch createFromDTO(BatchForSubmissionDTO batch, User creator) {
    String scriptName = "";
    if (!batch.getScript().getName().isBlank()) {
      scriptName = String.format(" (%s)", batch.getScript().getName());
    }

    Script script = scriptMapper
      .fromCreationDto(batch.getScript())
      .toBuilder()
      .name(
        String.format(
          "Script used for %s on %s%s",
          batch.getName(),
          LocalDateTime
            .now()
            .format(DateTimeFormatter.ofPattern("MMM d yyyy 'at' hh:mm a")),
          scriptName
        )
      )
      .user(creator)
      .createdAt(Instant.now())
      .updatedAt(Instant.now())
      .archived(true)
      .globalTemplate(false)
      .build();
    script = scriptRepository.save(script);

    Batch newBatch = batchRepository.save(
      batchMapper
        .fromSubmissionDto(batch)
        .toBuilder()
        .status(BatchStatus.QUEUEING_SETUP)
        .user(creator)
        .startedAt(Instant.now())
        .scriptUsed(script)
        .build()
    );

    oneTimeExecutor.submit(new SubmitSetupTask(sshService, newBatch));

    return newBatch;
  }

  public List<Batch> getAllForUser(User user) {
    return batchRepository.findAll(
      Example.of(Batch.builder().user(user).build())
    );
  }

  public Batch getForUserById(UUID id, User user) {
    Optional<Batch> dbResult = batchRepository.findById(id);

    if (dbResult.isEmpty()) {
      throw new NotFoundException();
    }

    Batch batch = dbResult.get();

    if (!batch.getUser().equals(user)) {
      throw new UnauthorizedException();
    }

    return batch;
  }

  public void approveJobListForUser(UUID batchId, List<Job> jobs, User user) {
    Batch batch = this.getForUserById(batchId, user);
    if (batch.getStatus() != BatchStatus.AWAITING_APPROVAL) {
      throw new UnauthorizedException();
    }

    jobs.forEach(j -> j.setState(JobState.QUEUEING));
    jobRepository.saveAll(jobs);

    batch.setStatus(BatchStatus.QUEUEING);
    oneTimeExecutor.submit(new SubmitMainJobsTask(sshService, batch, jobs));
  }

  public void cancelForUserById(UUID batchId, User user) {
    Batch batch = this.getForUserById(batchId, user);

    // nothing to do
    if (
      batch.getStatus() == BatchStatus.FAILED ||
      batch.getStatus() == BatchStatus.COMPLETED ||
      batch.getStatus() == BatchStatus.CANCELLED
    ) {
      return;
    }

    this.batchRepository.save(batch.withStatus(BatchStatus.CANCELLED));

    List<Job> jobsToSlurmCancel = new ArrayList<>();
    batch
      .getJobs()
      .forEach(
        (Job job) -> {
          switch (job.getState()) {
            case UNAPPROVED:
            // not yet submitted to slurm (hopefully we interjected in time)
            case QUEUEING:
              this.jobRepository.save(job.withState(JobState.CANCELLED));
              break;
            case RUNNING:
            case PENDING:
              jobsToSlurmCancel.add(job);
              break;
            case SUCCESS:
            case FAILED:
            case CANCELLED:
            case TIMEOUT:
            default:
              // nothing to do
              break;
          }
        }
      );

    if (!jobsToSlurmCancel.isEmpty()) {
      oneTimeExecutor.submit(
        new CancelMultiJobTask(sshService, jobsToSlurmCancel, user)
      );
    }
  }
}
