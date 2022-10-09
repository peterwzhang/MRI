package edu.ua.cs495.hpc_interface.async.executor;

import edu.ua.cs495.hpc_interface.async.tasks.PollTask;
import edu.ua.cs495.hpc_interface.service.SSHService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import javax.annotation.PreDestroy;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Log4j2
@Component
public class PollExecutor {

  /** how long to wait for the first poll (ms) */
  public static final int INITIAL_DELAY = 100;
  /** how long to wait between polls (ms) */
  public static final int RERUN_DELAY = 10000;

  private ScheduledExecutorService executor;

  @Autowired
  public PollExecutor(SSHService sshService) {
    this.executor = Executors.newSingleThreadScheduledExecutor();
    this.executor.scheduleWithFixedDelay(
        new PollTask(sshService),
        INITIAL_DELAY,
        RERUN_DELAY,
        TimeUnit.MILLISECONDS
      );
  }

  @PreDestroy
  public void destroy() {
    log.info("Shutting down polling executor");

    this.executor.shutdownNow();
  }
}
