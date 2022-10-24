package edu.ua.cs495.hpc_interface.async.tasks;

import com.sshtools.client.SshClient;
import com.sshtools.common.publickey.InvalidPassphraseException;
import com.sshtools.common.ssh.SshException;
import edu.ua.cs495.hpc_interface.domain.entity.Job;
import edu.ua.cs495.hpc_interface.domain.entity.User;
import edu.ua.cs495.hpc_interface.domain.types.JobState;
import edu.ua.cs495.hpc_interface.service.SSHService;
import java.io.IOException;
import java.time.Instant;

/**
 * This job cancels a given job within Slurm
 */
public final class CancelJobTask extends AbstractOneTimeTask {

  private Job job;
  private User user;

  public CancelJobTask(SSHService sshService, Job job, User user) {
    super(sshService);
    this.job = job;
    this.user = user;
  }

  @SuppressWarnings({ "java:S2093", "java:S2629", "java:S4042" })
  protected void runJob() throws InterruptedException {
    log.info("Starting");

    if (
      this.job.getState() != JobState.PENDING &&
      this.job.getState() != JobState.RUNNING
    ) {
      log.info("Cannot cancel job {} as it is not slurmed", this.job.getId());
      return;
    }
    if (this.job.getSlurmId() == null) {
      log.info("Cannot cancel job {} as it has no slurm ID!", this.job.getId());
      return;
    }

    try (SshClient ssh = this.service.getClient(this.user)) {
      this.service.guaranteeCommand(
          ssh,
          "scancel -Q " + this.job.getSlurmId(),
          "Unable to cancel job"
        );

      this.service.getJobRepository()
        .save(
          job
            .withState(JobState.CANCELLED)
            .withEndTime(Instant.now())
            .withLastSync(Instant.now())
        );
    } catch (IOException | SshException | InvalidPassphraseException e) {
      log.info("Job cancellation has FAILED");

      log.error(e);
      e.printStackTrace();
    }
  }
}
