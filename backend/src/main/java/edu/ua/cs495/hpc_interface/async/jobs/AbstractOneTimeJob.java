package edu.ua.cs495.hpc_interface.async.jobs;

import edu.ua.cs495.hpc_interface.service.SSHService;
import java.util.UUID;
import lombok.Getter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public abstract class AbstractOneTimeJob implements Runnable {

  @Getter
  protected final UUID id;

  protected SSHService service;

  protected final Logger log;

  protected AbstractOneTimeJob(SSHService sshService) {
    this.id = UUID.randomUUID();
    this.service = sshService;

    this.log =
      LogManager.getLogger(
        this.getClass().getSimpleName() + " " + this.getId().toString()
      );
  }

  protected abstract void runJob() throws InterruptedException;

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
