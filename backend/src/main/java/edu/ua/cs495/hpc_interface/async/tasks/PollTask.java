package edu.ua.cs495.hpc_interface.async.tasks;

import com.sshtools.client.SshClient;
import com.sshtools.common.publickey.InvalidPassphraseException;
import com.sshtools.common.ssh.SshException;
import edu.ua.cs495.hpc_interface.domain.dto.SlurmJob;
import edu.ua.cs495.hpc_interface.domain.entity.Job;
import edu.ua.cs495.hpc_interface.service.SSHService;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

/**
 * This job submits the setup portion of a batch to be run on compute via Slurm.
 */
@Log4j2
@AllArgsConstructor
public final class PollTask implements Runnable {

  public static final String SACCT_COMMAND =
    "sacct -j %s " +
    "--format=JobID,state,Reason,Timelimit,start,end,elapsed,nodelist,DerivedExitcode " +
    "--allocations " +
    "--parsable2 --noheader";

  private SSHService service;

  @SuppressWarnings({ "java:S1612" })
  protected void runJob() throws InterruptedException {
    log.info("Starting");

    List<Job> jobs = (this.service.getJobRepository().findJobsToPoll());
    if (jobs.isEmpty()) {
      log.info("No jobs to poll...");
      return;
    }

    try (SshClient ssh = this.service.getQueryUserClient()) {
      String jobList = jobs
        .stream()
        .map(Job::getSlurmId)
        .map(i -> i.toString())
        .collect(Collectors.joining(","));

      log.info("Querying " + jobList);

      String response =
        this.service.guaranteeCommand(
            ssh,
            String.format(SACCT_COMMAND, jobList),
            "Unable to poll sacct"
          );

      Arrays
        .stream(response.split("\n"))
        .map(String::trim)
        .map(SlurmJob::new)
        .forEach(j -> log.info(j));
    } catch (IOException | SshException | InvalidPassphraseException e) {
      log.error("Unable to poll jobs");

      log.error(e);
      e.printStackTrace();
    }
  }

  public void run() {
    try {
      this.runJob();
    } catch (InterruptedException e) {
      log.error(String.format("Job was interrupted: %s", e.getMessage()));
      e.printStackTrace();

      Thread.currentThread().interrupt();
    } catch (RuntimeException e) {
      log.error(String.format("Job failed: %s", e.getMessage()));
      e.printStackTrace();
    }
  }
}
