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
import java.io.PrintWriter;
import java.io.StringWriter;
import java.time.Instant;
import java.util.Arrays;
import java.util.UUID;

/**
 * This job generated the jobs of a batch
 */
public final class GenerateJobsTask extends AbstractOneTimeTask {

  private Batch batch;

  public GenerateJobsTask(SSHService sshService, Batch batch) {
    super(sshService);
    this.batch = batch;
  }

  @SuppressWarnings({ "java:S2093", "java:S2629", "java:S4042" })
  protected void runJob() throws InterruptedException {
    log.info("Starting");

    Script script = this.batch.getScriptUsed();

    StringBuilder jobGeneratorBuilder = new StringBuilder();
    jobGeneratorBuilder.append(SSHService.HASH_BANG);
    jobGeneratorBuilder.append("\n");
    jobGeneratorBuilder.append(script.getHeader());
    jobGeneratorBuilder.append("\n\n");
    jobGeneratorBuilder.append(script.getLoopWrapperTop());
    jobGeneratorBuilder.append("\n");

    String generatedJobListFile =
      SSHService.SCRATCH_SCRIPT_LOCATION +
      "generated-job-list-" +
      this.batch.getId() +
      ".txt";

    jobGeneratorBuilder.append("echo ");
    jobGeneratorBuilder.append(script.getIdVariable());
    jobGeneratorBuilder.append(" >> ");
    jobGeneratorBuilder.append(generatedJobListFile);
    jobGeneratorBuilder.append("\n\n");

    jobGeneratorBuilder.append("cat > ");
    jobGeneratorBuilder.append(SSHService.SCRATCH_SCRIPT_LOCATION);
    jobGeneratorBuilder.append(this.batch.getId());
    jobGeneratorBuilder.append("-");
    jobGeneratorBuilder.append(script.getIdVariable());
    UUID heredoc = UUID.randomUUID();
    jobGeneratorBuilder.append(".sh <<");
    jobGeneratorBuilder.append(heredoc);
    jobGeneratorBuilder.append("\n");
    jobGeneratorBuilder.append(script.getJobTemplate());
    jobGeneratorBuilder.append("\n");
    jobGeneratorBuilder.append(heredoc);
    jobGeneratorBuilder.append("\n\n");

    jobGeneratorBuilder.append("cat > ");
    jobGeneratorBuilder.append(SSHService.SCRATCH_SCRIPT_LOCATION);
    jobGeneratorBuilder.append(this.batch.getId());
    jobGeneratorBuilder.append("-");
    jobGeneratorBuilder.append(script.getIdVariable());
    jobGeneratorBuilder.append("-slurm.sh <<");
    jobGeneratorBuilder.append(heredoc);
    jobGeneratorBuilder.append("\n");
    jobGeneratorBuilder.append(script.getSlurmTemplate());
    jobGeneratorBuilder.append("\n");
    jobGeneratorBuilder.append(heredoc);
    jobGeneratorBuilder.append("\n\n");

    jobGeneratorBuilder.append(script.getLoopWrapperBottom());
    jobGeneratorBuilder.append("\n");

    String generator = jobGeneratorBuilder.toString();

    Job job = Job
      .builder()
      .batch(this.batch)
      .state(JobState.RUNNING)
      .slurmState("")
      .logPath(generatedJobListFile)
      .logTail("Loading...")
      .identifier("")
      .scriptPath("TBD")
      .slurmQueueScriptPath("n/a")
      .setupJob(false)
      .generatorJob(true)
      .cleanupJob(false)
      .lastSync(Instant.now())
      .build();
    this.service.getJobRepository().save(job);

    File localScript = null;
    try {
      localScript =
        this.service.createTempFileWithContents(
            "generator-",
            String.format("-%s.sh", this.batch.getId()),
            generator
          );

      job.setScriptPath(localScript.getName());
      this.service.getJobRepository().save(job);

      try (SshClient ssh = this.service.getClient(this.batch.getUser())) {
        this.service.copyScript(ssh, localScript);

        String scriptOutput =
          this.service.guaranteeCommand(
              ssh,
              SSHService.SCRATCH_SCRIPT_LOCATION + localScript.getName(),
              "Unable to run generation script"
            );

        job.setLogTail(scriptOutput);
        this.service.getJobRepository().save(job);

        String[] generatedJobs =
          this.service.guaranteeCommand(
              ssh,
              "cat " + generatedJobListFile,
              generator
            )
            .trim()
            .split("\n");

        job.setState(JobState.SUCCESS);
        this.service.getJobRepository().save(job);

        log.info("Generated %d jobs", generatedJobs.length);

        if (generatedJobs.length == 0) {
          this.service.getBatchRepository()
            .save(this.batch.withStatus(BatchStatus.COMPLETED));
          return;
        }

        this.service.getJobRepository()
          .saveAll(
            Arrays
              .stream(generatedJobs)
              .map(
                identifier ->
                  Job
                    .builder()
                    .batch(this.batch)
                    .state(JobState.QUEUEING)
                    .slurmState("")
                    .logPath("log." + job.getId())
                    .logTail("Loading...")
                    .identifier(identifier)
                    .scriptPath(
                      String.format("%s-%s.sh", this.batch.getId(), identifier)
                    )
                    .slurmQueueScriptPath(
                      String.format(
                        "%s-%s-slurm.sh",
                        this.batch.getId(),
                        identifier
                      )
                    )
                    .setupJob(false)
                    .generatorJob(false)
                    .cleanupJob(false)
                    .lastSync(Instant.now())
                    .build()
              )
              .toList()
          );
        // TODO: submit these or do something for approval
      }
    } catch (IOException | SshException | InvalidPassphraseException e) {
      log.info("Batch has FAILED");

      log.error(e);
      StringWriter trace = new StringWriter();
      e.printStackTrace(new PrintWriter(trace));
      log.error(trace);

      this.service.getBatchRepository()
        .save(this.batch.withStatus(BatchStatus.FAILED));

      job.setState(JobState.FAILED);
      job.setLogTail(job.getLogTail() + "\n\n" + trace);
    } finally {
      this.service.cleanupFile(localScript);
    }
  }
}
