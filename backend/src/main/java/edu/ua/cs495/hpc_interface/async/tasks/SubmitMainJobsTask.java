package edu.ua.cs495.hpc_interface.async.tasks;

import com.sshtools.client.SshClient;
import com.sshtools.common.publickey.InvalidPassphraseException;
import com.sshtools.common.ssh.SshException;
import edu.ua.cs495.hpc_interface.domain.entity.Batch;
import edu.ua.cs495.hpc_interface.domain.entity.Job;
import edu.ua.cs495.hpc_interface.domain.entity.Script;
import edu.ua.cs495.hpc_interface.domain.types.BatchStatus;
import edu.ua.cs495.hpc_interface.domain.types.JobState;
import edu.ua.cs495.hpc_interface.service.SSHService;
import java.io.File;
import java.io.IOException;
import java.time.Instant;
import java.util.List;

/**
 * This job submits the setup portion of a batch to be run on compute via Slurm.
 */
public final class SubmitMainJobsTask extends AbstractOneTimeTask {

  private Batch batch;
  private List<Job> jobs;

  public SubmitMainJobsTask(
    SSHService sshService,
    Batch batch,
    List<Job> jobs
  ) {
    super(sshService);
    this.batch = batch;
    this.jobs = jobs;
  }

  @SuppressWarnings({ "java:S2093", "java:S2629", "java:S4042" })
  protected void runJob() throws InterruptedException {
    log.info("Starting");
    // if (this.jobs.isEmpty()) {
    //   log.info("No jobs were generated");

    //   this.service.getBatchRepository()
    //     .save(this.batch.withStatus(BatchStatus.COMPLETED));

    //   return;
    // }

    // try (SshClient ssh = this.service.getClient(this.batch.getUser())) {
    //   String logLocation = "log." + job.getId();

    //   job.setLogPath(logLocation);

    //   int slurmId = this.service.submitJobToSlurm(ssh, job);

    //   this.service.getJobRepository()
    //     .save(
    //       job
    //         .withSlurmId(slurmId)
    //         .withState(JobState.PENDING)
    //         .withQueuedTime(Instant.now())
    //         .withLastSync(Instant.now())
    //     );

    //   this.service.getBatchRepository()
    //     .save(this.batch.withStatus(BatchStatus.SETTING_UP));
    // } catch (IOException | SshException | InvalidPassphraseException e) {
    //   log.info("Batch has FAILED");

    //   log.error(e);
    //   e.printStackTrace();

    //   // mark batch and all jobs as failures
    //   this.service.getBatchRepository().refresh(this.batch);

    //   this.service.getBatchRepository()
    //     .save(this.batch.withStatus(BatchStatus.FAILED));

    //   this.batch.getJobs()
    //     .forEach(
    //       job ->
    //         this.service.getJobRepository().save(job.withState(JobState.FAILED))
    //     );
    // } finally {
    //   this.service.cleanupFile(localScript);
    //   this.service.cleanupFile(localSlurm);
    // }
  }
}
