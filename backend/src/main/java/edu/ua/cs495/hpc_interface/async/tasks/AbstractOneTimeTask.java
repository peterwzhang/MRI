package edu.ua.cs495.hpc_interface.async.tasks;

import edu.ua.cs495.hpc_interface.service.SSHService;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.UUID;
import lombok.Getter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.transaction.annotation.Transactional;

public abstract class AbstractOneTimeTask implements Runnable {

  @Getter
  protected final UUID id;

  protected SSHService service;

  protected final Logger log;

  protected AbstractOneTimeTask(SSHService sshService) {
    this.id = UUID.randomUUID();
    this.service = sshService;

    this.log =
      LogManager.getLogger(
        this.getId().toString() + " " + this.getClass().getSimpleName()
      );
  }

  protected abstract void runJob() throws InterruptedException;

  @Transactional
  public void run() {
    try {
      this.runJob();
    } catch (InterruptedException e) {
      log.error("Job was interrupted: {}", e.getMessage());

      StringWriter trace = new StringWriter();
      e.printStackTrace(new PrintWriter(trace));
      log.error(trace);

      Thread.currentThread().interrupt();
    } catch (RuntimeException e) {
      log.error("Job failed: {}", e.getMessage());

      StringWriter trace = new StringWriter();
      e.printStackTrace(new PrintWriter(trace));
      log.error(trace);
    }
  }
}
