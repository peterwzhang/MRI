package edu.ua.cs495.hpc_interface.service;

import edu.ua.cs495.hpc_interface.async.executor.OneTimeExecutor;
import edu.ua.cs495.hpc_interface.async.tasks.CancelJobTask;
import edu.ua.cs495.hpc_interface.domain.entity.Job;
import edu.ua.cs495.hpc_interface.domain.entity.User;
import edu.ua.cs495.hpc_interface.domain.repository.JobRepository;
import edu.ua.cs495.hpc_interface.domain.types.JobState;
import edu.ua.cs495.hpc_interface.exception.NotFoundException;
import edu.ua.cs495.hpc_interface.exception.UnauthorizedException;
import java.util.Optional;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor(onConstructor_ = { @Autowired })
public class JobService {

  private JobRepository jobRepository;
  private OneTimeExecutor oneTimeExecutor;
  private SSHService sshService;

  public Job getForUserByBatchAndJobId(UUID batchId, UUID jobId, User user) {
    Optional<Job> dbResult = jobRepository.findById(jobId);

    if (dbResult.isEmpty()) {
      throw new NotFoundException();
    }

    Job job = dbResult.get();

    if (!job.getBatch().getId().equals(batchId)) {
      throw new NotFoundException();
    }

    if (!job.getBatch().getUser().equals(user)) {
      throw new UnauthorizedException();
    }

    return job;
  }

  public void cancelForUserByBatchAndJobId(
    UUID batchId,
    UUID jobId,
    User user
  ) {
    this.cancelJob(getForUserByBatchAndJobId(batchId, jobId, user), user);
  }

  public void cancelJob(Job job, User user) {
    switch (job.getState()) {
      case UNAPPROVED:
      // not yet submitted to slurm (hopefully we interjected in time)
      case QUEUEING:
        this.jobRepository.save(job.withState(JobState.CANCELLED));
        break;
      case RUNNING:
      case PENDING:
        oneTimeExecutor.submit(new CancelJobTask(sshService, job, user));
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
}
