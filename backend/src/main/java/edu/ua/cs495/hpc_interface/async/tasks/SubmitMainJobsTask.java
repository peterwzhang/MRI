package edu.ua.cs495.hpc_interface.async.tasks;

import com.sshtools.client.SshClient;
import com.sshtools.common.publickey.InvalidPassphraseException;
import com.sshtools.common.ssh.SshException;
import edu.ua.cs495.hpc_interface.domain.entity.Batch;
import edu.ua.cs495.hpc_interface.domain.entity.Job;
import edu.ua.cs495.hpc_interface.domain.types.BatchStatus;
import edu.ua.cs495.hpc_interface.domain.types.JobState;
import edu.ua.cs495.hpc_interface.service.SSHService;
import java.io.IOException;
import java.time.Instant;
import java.util.List;
import org.hibernate.Session;

/**
 * This job submits the generated jobs of a batch to be run on compute via Slurm.
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
    try (Session session = this.service.getSessionFactory().openSession()) {
      this.batch = session.get(Batch.class, this.batch.getId());
      this.jobs =
        this.jobs.stream().map(j -> session.get(Job.class, j.getId())).toList();

      log.info("Submitting jobs {}", this.jobs);

      try (SshClient ssh = this.service.getClient(this.batch.getUser())) {
        for (Job job : this.jobs) {
          this.service.getJobRepository()
            .save(
              job
                .withSlurmId(this.service.submitJobToSlurm(ssh, job))
                .withState(JobState.PENDING)
                .withQueuedTime(Instant.now())
                .withLastSync(Instant.now())
            );
        }

        this.service.getBatchRepository()
          .save(this.batch.withStatus(BatchStatus.RUNNING));
      } catch (IOException | SshException | InvalidPassphraseException e) {
        log.info("Batch has FAILED");

        log.error(e);
        e.printStackTrace();

        // mark batch and all jobs as failures
        // refresh batch
        this.batch = session.get(Batch.class, this.batch.getId());
        session.refresh(this.batch);

        this.service.getBatchRepository()
          .save(this.batch.withStatus(BatchStatus.FAILED));

        this.batch.getJobs()
          .forEach(
            (Job job) -> {
              if (
                Boolean.FALSE.equals(job.getSetupJob()) &&
                Boolean.FALSE.equals(job.getGeneratorJob())
              ) {
                this.service.getJobRepository()
                  .save(job.withState(JobState.FAILED));
              }
            }
          );
      }
    }
  }
}
