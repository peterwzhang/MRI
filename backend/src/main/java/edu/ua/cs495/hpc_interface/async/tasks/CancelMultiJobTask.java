package edu.ua.cs495.hpc_interface.async.tasks;

import com.sshtools.common.publickey.InvalidPassphraseException;
import edu.ua.cs495.hpc_interface.domain.entity.Job;
import edu.ua.cs495.hpc_interface.domain.entity.User;
import edu.ua.cs495.hpc_interface.domain.types.JobState;
import edu.ua.cs495.hpc_interface.service.SSHService;
import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;
import net.schmizz.sshj.SSHClient;

/**
 * This job cancels a given list of jobs within Slurm
 */
public final class CancelMultiJobTask extends AbstractOneTimeTask {

  private List<Job> jobs;
  private User user;

  public CancelMultiJobTask(SSHService sshService, List<Job> jobs, User user) {
    super(sshService);
    this.jobs = jobs;
    this.user = user;
  }

  @SuppressWarnings({ "java:S2093", "java:S2629", "java:S4042" })
  protected void runJob() throws InterruptedException {
    log.info("Starting");

    List<Job> toCancel = jobs
      .stream()
      .filter((Job job) -> {
        if (
          job.getState() != JobState.PENDING &&
          job.getState() != JobState.RUNNING
        ) {
          log.info("Cannot cancel job {} as it is not slurmed", job.getId());
          return false;
        }
        if (job.getSlurmId() == null) {
          log.info("Cannot cancel job {} as it has no slurm ID!", job.getId());
          return false;
        }
        return true;
      })
      .toList();

    if (toCancel.isEmpty()) {
      return;
    }

    try (SSHClient ssh = this.service.getClient(this.user)) {
      this.service.guaranteeCommand(
          ssh,
          "scancel -Q " +
          toCancel
            .stream()
            .map(Job::getSlurmId)
            .map(i -> i.toString())
            .collect(Collectors.joining(",")),
          "Unable to cancel job"
        );

      this.service.getJobRepository()
        .saveAll(
          toCancel
            .stream()
            .map(j ->
              j
                .withState(JobState.CANCELLED)
                .withEndTime(Instant.now())
                .withLastSync(Instant.now())
            )
            .toList()
        );
    } catch (IOException | InvalidPassphraseException e) {
      log.info("Job cancellation has FAILED");

      log.error(e);
      e.printStackTrace();
    }
  }
}
