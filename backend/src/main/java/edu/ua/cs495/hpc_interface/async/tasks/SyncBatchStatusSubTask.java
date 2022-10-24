package edu.ua.cs495.hpc_interface.async.tasks;

import edu.ua.cs495.hpc_interface.domain.entity.Batch;
import edu.ua.cs495.hpc_interface.domain.entity.Job;
import edu.ua.cs495.hpc_interface.domain.types.BatchStatus;
import edu.ua.cs495.hpc_interface.domain.types.CleanupMode;
import edu.ua.cs495.hpc_interface.domain.types.JobState;
import edu.ua.cs495.hpc_interface.service.SSHService;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.hibernate.Session;

/**
 * Update a batch's state based on its job states
 */
@Log4j2
@AllArgsConstructor
public class SyncBatchStatusSubTask {

  private SSHService service;
  private Batch batch;

  private void checkSetupCompletion() {
    if (
      this.batch.getJobs()
        .stream()
        .filter(Job::getSetupJob)
        .allMatch(j -> j.getState().isCompleted())
    ) {
      log.info(
        "setup complete, moving batch " +
        this.batch.getId() +
        " to GENERATING and spawning generation job"
      );
      batch.setStatus(BatchStatus.GENERATING);
      this.service.getBatchRepository().save(batch);
      this.service.getOneTimeExecutor()
        .submit(new GenerateJobsTask(this.service, batch));
    } else if (
      this.batch.getJobs()
        .stream()
        .filter(Job::getSetupJob)
        .allMatch(j -> j.getState() == JobState.CANCELLED)
    ) {
      log.info(
        "Setup cancelled, moving batch " + this.batch.getId() + " to CANCELLED"
      );
      batch.setStatus(BatchStatus.CANCELLED);
      this.service.getBatchRepository().save(batch);
    } else if (
      this.batch.getJobs()
        .stream()
        .filter(Job::getSetupJob)
        .allMatch(j -> j.getState().isFailed())
    ) {
      log.info(
        "Setup failed, moving batch " + this.batch.getId() + " to FAILED"
      );
      batch.setStatus(BatchStatus.FAILED);
      this.service.getBatchRepository().save(batch);
    }
  }

  private void checkAllCompletion() {
    List<Job> jobsToCheck =
      this.batch.getJobs()
        .stream()
        .filter(j -> j.getState() != JobState.UNAPPROVED)
        .toList();

    log.info(jobsToCheck);

    if (
      jobsToCheck
        .stream()
        .allMatch(j -> j.getState().isCompleted() || j.getState().isFailed())
    ) {
      log.info(
        "All jobs completed, evaluating cleanup configuration for batch " +
        this.batch.getId()
      );
      if (
        this.batch.getScriptUsed().getCleanupMode() == CleanupMode.ALL_ENDED ||
        (
          this.batch.getScriptUsed().getCleanupMode() ==
          CleanupMode.ALL_SUCCESS &&
          jobsToCheck.stream().allMatch(j -> j.getState().isCompleted())
        )
      ) {
        log.info(
          "Setup script WILL run for batch " +
          this.batch.getId() +
          ", marking as CLEAN_UP_QUEUEING and queueing cleanup job"
        );
        batch.setStatus(BatchStatus.CLEAN_UP_QUEUEING);
        this.service.getBatchRepository().save(batch);

        this.service.getOneTimeExecutor()
          .submit(new SubmitCleanupTask(this.service, batch));
      } else {
        log.info(
          "Setup script will NOT run for batch " +
          this.batch.getId() +
          ", marking complete"
        );
        batch.setStatus(BatchStatus.COMPLETED);
        this.service.getBatchRepository().save(batch);
      }
    }
  }

  private void checkCleanupCompletion() {
    if (
      this.batch.getJobs()
        .stream()
        .filter(Job::getCleanupJob)
        .allMatch(j -> j.getState().isCompleted() || j.getState().isFailed())
    ) {
      log.info(
        "cleanup complete, moving batch " + this.batch.getId() + " to COMPLETED"
      );
      batch.setStatus(BatchStatus.COMPLETED);
      this.service.getBatchRepository().save(batch);
    }
  }

  public void run() {
    try (Session session = this.service.getSessionFactory().openSession()) {
      this.batch = session.get(Batch.class, this.batch.getId());
      switch (this.batch.getStatus()) {
        case SETTING_UP:
          this.checkSetupCompletion();
          break;
        case RUNNING:
          this.checkAllCompletion();
          break;
        case CLEAN_UP_RUNNING:
          this.checkCleanupCompletion();
          break;
        // not eligible for state change
        case QUEUEING_SETUP:
        case GENERATING:
        case AWAITING_APPROVAL:
        case QUEUEING:
        case CLEAN_UP_QUEUEING:
        case COMPLETED:
        case FAILED:
        case CANCELLED:
        default:
      }
    }
  }
}
