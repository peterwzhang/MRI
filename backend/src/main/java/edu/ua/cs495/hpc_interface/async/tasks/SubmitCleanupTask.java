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
import org.hibernate.Session;

/**
 * This job submits the cleanup portion of a batch to be run on compute via Slurm.
 */
public final class SubmitCleanupTask extends AbstractOneTimeTask {

  private Batch batch;

  public SubmitCleanupTask(SSHService sshService, Batch batch) {
    super(sshService);
    this.batch = batch;
  }

  @SuppressWarnings({ "java:S2093", "java:S2629", "java:S4042" })
  protected void runJob() throws InterruptedException {
    Session session = this.service.getSessionFactory().openSession();
    this.batch = session.get(Batch.class, this.batch.getId());

    log.info("Starting");

    Script script = this.batch.getScriptUsed();
    if (script.getCleanupScript().isEmpty()) {
      log.info(
        "This batch has no cleanup script.  Moving straight to COMPLETED stage"
      );

      this.service.getBatchRepository()
        .save(this.batch.withStatus(BatchStatus.COMPLETED));

      session.close();
      return;
    }

    StringBuilder cleanupScriptBuilder = new StringBuilder();
    cleanupScriptBuilder.append(SSHService.HASH_BANG);
    cleanupScriptBuilder.append("\n");
    cleanupScriptBuilder.append(script.getHeader());
    cleanupScriptBuilder.append("\n\n");
    cleanupScriptBuilder.append(script.getCleanupScript());
    cleanupScriptBuilder.append("\n");

    String cleanupScript = cleanupScriptBuilder.toString();

    File localScript = null;
    File localSlurm = null;
    try {
      localScript =
        this.service.createTempFileWithContents(
            "cleanup-script-",
            String.format("-%s.sh", this.batch.getId()),
            cleanupScript
          );

      StringBuilder slurmScriptBuilder = new StringBuilder();
      slurmScriptBuilder.append(SSHService.HASH_BANG);
      slurmScriptBuilder.append("\n");
      slurmScriptBuilder.append(script.getCleanupSlurmConfig());
      slurmScriptBuilder.append("\n\n");
      slurmScriptBuilder.append("srun ");
      slurmScriptBuilder.append(SSHService.SCRATCH_SCRIPT_LOCATION);
      slurmScriptBuilder.append(localScript.getName());
      slurmScriptBuilder.append("\n");

      localSlurm =
        this.service.createTempFileWithContents(
            "cleanup-slurm-",
            String.format("-%s.sh", this.batch.getId()),
            slurmScriptBuilder.toString()
          );

      Job job = Job
        .builder()
        .batch(this.batch)
        .state(JobState.QUEUEING)
        .slurmState("")
        .logPath("")
        .logTail("Loading...")
        .identifier("cleanup")
        .scriptPath(localScript.getName())
        .slurmQueueScriptPath(localSlurm.getName())
        .setupJob(false)
        .generatorJob(false)
        .cleanupJob(true)
        .lastSync(Instant.now())
        .build();
      this.service.getJobRepository().save(job);

      try (SshClient ssh = this.service.getClient(this.batch.getUser())) {
        this.service.copyScript(ssh, localScript);
        this.service.copyScript(ssh, localSlurm);

        String logLocation = "log." + job.getId();

        job.setLogPath(logLocation);

        int slurmId = this.service.submitJobToSlurm(ssh, job);

        this.service.getJobRepository()
          .save(
            job
              .withSlurmId(slurmId)
              .withState(JobState.PENDING)
              .withQueuedTime(Instant.now())
              .withLastSync(Instant.now())
          );

        this.service.getBatchRepository()
          .save(this.batch.withStatus(BatchStatus.CLEAN_UP_RUNNING));
      }
    } catch (IOException | SshException | InvalidPassphraseException e) {
      log.info("Batch has FAILED");

      log.error(e);
      e.printStackTrace();

      // mark batch and all jobs as failures
      this.service.getBatchRepository().refresh(this.batch);

      this.service.getBatchRepository()
        .save(this.batch.withStatus(BatchStatus.FAILED));

      this.batch.getJobs()
        .forEach(
          job ->
            this.service.getJobRepository().save(job.withState(JobState.FAILED))
        );
    } finally {
      this.service.cleanupFile(localScript);
      this.service.cleanupFile(localSlurm);

      session.close();
    }
  }
}
