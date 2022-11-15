package edu.ua.cs495.hpc_interface.async.tasks;

import edu.ua.cs495.hpc_interface.domain.entity.Job;
import edu.ua.cs495.hpc_interface.service.SSHService;
import java.io.IOException;
import java.util.concurrent.TimeUnit;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.schmizz.sshj.SSHClient;
import net.schmizz.sshj.common.IOUtils;
import net.schmizz.sshj.connection.channel.direct.Session;
import net.schmizz.sshj.connection.channel.direct.Session.Command;

/**
 * Get log contents from a job
 */
@Log4j2
@AllArgsConstructor
public final class SyncJobLogSubTask {

  public static final int TAIL_BYTES = 50 * 1024; // 50kb
  public static final String TAIL_COMMAND =
    "tail -c " +
    TAIL_BYTES +
    " -- " +
    SSHService.SCRATCH_SCRIPT_LOCATION +
    "%s";

  private SSHService service;
  private SSHClient ssh;
  private Job job;

  @SuppressWarnings({ "java:S1151", "java:S1612" })
  protected void run() {
    try (Session session = ssh.startSession()) {
      Command cmd = session.exec(
        String.format(TAIL_COMMAND, this.job.getLogPath())
      );

      cmd.join(SSHService.TIMEOUT, TimeUnit.MILLISECONDS);

      String response = IOUtils.readFully(cmd.getInputStream()).toString();

      log.info("Got " + response.length() + "B of log for job " + job.getId());
      job.setLogTail(response);
      this.service.getJobRepository().save(job);
    } catch (IOException e) {
      log.info("Unable to read log for job " + job.getId());
      log.info(e);

      job.setLogTail("Unable to read logfile...");
      this.service.getJobRepository().save(job);
    }
  }
}
