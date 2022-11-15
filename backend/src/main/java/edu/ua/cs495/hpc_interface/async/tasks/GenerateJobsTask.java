package edu.ua.cs495.hpc_interface.async.tasks;

import com.sshtools.common.publickey.InvalidPassphraseException;
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
import java.util.List;
import java.util.UUID;
import net.schmizz.sshj.SSHClient;
import org.hibernate.Session;

/**
 * This job generated the jobs of a batch
 */
public final class GenerateJobsTask extends AbstractOneTimeTask {

  private Batch batch;

  public GenerateJobsTask(SSHService sshService, Batch batch) {
    super(sshService);
    this.batch = batch;
  }

  @SuppressWarnings({ "java:S2093", "java:S2629", "java:S4042", "java:S1774" })
  protected void runJob() throws InterruptedException {
    Session dbSession = this.service.getSessionFactory().openSession();
    this.batch = dbSession.get(Batch.class, this.batch.getId());

    log.info("Starting for {}", this.batch.getId());

    Script script = this.batch.getScriptUsed();

    String generatedJobListFile =
      "generated-job-list-" + this.batch.getId() + ".txt";

    StringBuilder jobGeneratorBuilder = new StringBuilder();
    jobGeneratorBuilder.append(SSHService.HASH_BANG);
    jobGeneratorBuilder.append("\n");
    jobGeneratorBuilder.append(script.getHeader());
    jobGeneratorBuilder.append("\n\n");
    jobGeneratorBuilder.append("touch ");
    jobGeneratorBuilder.append(
      SSHService.SCRATCH_SCRIPT_LOCATION + generatedJobListFile
    );
    jobGeneratorBuilder.append("\n\n");
    jobGeneratorBuilder.append(script.getLoopWrapperTop());
    jobGeneratorBuilder.append("\n");

    jobGeneratorBuilder.append("IDENTIFIER=$(echo ");
    jobGeneratorBuilder.append(script.getIdVariable());
    jobGeneratorBuilder.append("| sed -e 's/[^a-zA-Z0-9_.]/-/g')");
    jobGeneratorBuilder.append("\n\n");

    jobGeneratorBuilder.append("echo $IDENTIFIER >> ");
    jobGeneratorBuilder.append(
      SSHService.SCRATCH_SCRIPT_LOCATION + generatedJobListFile
    );
    jobGeneratorBuilder.append("\n\n");

    jobGeneratorBuilder.append("cat > ");
    jobGeneratorBuilder.append(SSHService.SCRATCH_SCRIPT_LOCATION);
    jobGeneratorBuilder.append(this.batch.getId());
    jobGeneratorBuilder.append("-$IDENTIFIER.sh <<");
    UUID heredoc = UUID.randomUUID();
    jobGeneratorBuilder.append(heredoc);
    jobGeneratorBuilder.append("\n");
    jobGeneratorBuilder.append(SSHService.HASH_BANG);
    jobGeneratorBuilder.append("\n");
    jobGeneratorBuilder.append("\n");
    jobGeneratorBuilder.append(script.getHeader());
    jobGeneratorBuilder.append("\n");
    jobGeneratorBuilder.append("\n");
    jobGeneratorBuilder.append(script.getJobTemplate());
    jobGeneratorBuilder.append("\n");
    jobGeneratorBuilder.append(heredoc);
    jobGeneratorBuilder.append("\n\n");

    jobGeneratorBuilder.append("cat > ");
    jobGeneratorBuilder.append(SSHService.SCRATCH_SCRIPT_LOCATION);
    jobGeneratorBuilder.append(this.batch.getId());
    jobGeneratorBuilder.append("-$IDENTIFIER-slurm.sh <<");
    jobGeneratorBuilder.append(heredoc);
    jobGeneratorBuilder.append("\n");
    jobGeneratorBuilder.append(SSHService.HASH_BANG);
    jobGeneratorBuilder.append("\n");
    jobGeneratorBuilder.append(script.getSlurmTemplate());
    jobGeneratorBuilder.append("\n\n");
    jobGeneratorBuilder.append("srun ");
    jobGeneratorBuilder.append(SSHService.SCRATCH_SCRIPT_LOCATION);
    jobGeneratorBuilder.append(this.batch.getId());
    jobGeneratorBuilder.append("-$IDENTIFIER.sh");
    jobGeneratorBuilder.append("\n");
    jobGeneratorBuilder.append(heredoc);
    jobGeneratorBuilder.append("\n\n");

    jobGeneratorBuilder.append("chmod +x ");
    jobGeneratorBuilder.append(SSHService.SCRATCH_SCRIPT_LOCATION);
    jobGeneratorBuilder.append(this.batch.getId());
    jobGeneratorBuilder.append("-$IDENTIFIER.sh ");
    jobGeneratorBuilder.append(SSHService.SCRATCH_SCRIPT_LOCATION);
    jobGeneratorBuilder.append(this.batch.getId());
    jobGeneratorBuilder.append("-$IDENTIFIER-slurm.sh");
    jobGeneratorBuilder.append("\n\n");

    jobGeneratorBuilder.append(script.getLoopWrapperBottom());
    jobGeneratorBuilder.append("\n");

    String generator = jobGeneratorBuilder.toString();

    Job job = Job
      .builder()
      .batch(this.batch)
      .state(JobState.RUNNING)
      .slurmState("")
      .logPath("log.generator." + this.batch.getId())
      .logTail("Loading...")
      .identifier("generator")
      .scriptPath("TBD")
      .slurmQueueScriptPath("n/a")
      .setupJob(false)
      .generatorJob(true)
      .cleanupJob(false)
      .lastSync(Instant.now())
      .nodeList("head node")
      .queuedTime(Instant.now())
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
      job.setStartTime(Instant.now());
      this.service.getJobRepository().save(job);

      try (SSHClient ssh = this.service.getClient(this.batch.getUser())) {
        this.service.copyScript(ssh, localScript);

        String scriptOutput =
          this.service.guaranteeCommand(
              ssh,
              SSHService.SCRATCH_SCRIPT_LOCATION +
              localScript.getName() +
              " 2>&1 | tee " +
              SSHService.SCRATCH_SCRIPT_LOCATION +
              "log.generator." +
              this.batch.getId(),
              "Unable to run generation script"
            );

        job.setLogTail(scriptOutput);
        this.service.getJobRepository().save(job);

        String[] generatedJobs =
          this.service.guaranteeCommand(
              ssh,
              "cat " +
              SSHService.SCRATCH_SCRIPT_LOCATION +
              generatedJobListFile,
              generator
            )
            .trim()
            .split("\n");

        job.setState(JobState.SUCCESS);
        job.setEndTime(Instant.now());
        this.service.getJobRepository().save(job);

        log.info("Generated {} jobs", generatedJobs.length);

        if (
          generatedJobs.length == 0 ||
          (generatedJobs.length == 1 && generatedJobs[0].isBlank())
        ) {
          log.info("Batch is moving to done as there are no jobs to do...");
          this.service.getBatchRepository()
            .save(this.batch.withStatus(BatchStatus.COMPLETED));
          return;
        }

        List<Job> jobs = Arrays
          .stream(generatedJobs)
          .map(identifier ->
            Job
              .builder()
              .batch(this.batch)
              .state(
                Boolean.TRUE.equals(this.batch.getNeedsApproval())
                  ? JobState.UNAPPROVED
                  : JobState.QUEUEING
              )
              .slurmState("")
              .logPath("log." + job.getId() + "." + identifier)
              .logTail("Loading...")
              .identifier(identifier)
              .scriptPath(
                String.format("%s-%s.sh", this.batch.getId(), identifier)
              )
              .slurmQueueScriptPath(
                String.format("%s-%s-slurm.sh", this.batch.getId(), identifier)
              )
              .setupJob(false)
              .generatorJob(false)
              .cleanupJob(false)
              .lastSync(Instant.now())
              .build()
          )
          .toList();

        this.service.getJobRepository().saveAll(jobs);

        if (Boolean.TRUE.equals(this.batch.getNeedsApproval())) {
          this.service.getBatchRepository()
            .saveAndFlush(this.batch.withStatus(BatchStatus.AWAITING_APPROVAL));
        } else {
          this.service.getBatchRepository()
            .saveAndFlush(this.batch.withStatus(BatchStatus.QUEUEING));
          this.service.getOneTimeExecutor()
            .submit(new SubmitMainJobsTask(this.service, this.batch, jobs));
        }
      }
    } catch (IOException | InvalidPassphraseException e) {
      log.info("Generation has FAILED");

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
      dbSession.close();
    }
  }
}
