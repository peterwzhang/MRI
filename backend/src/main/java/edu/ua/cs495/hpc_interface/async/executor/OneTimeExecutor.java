package edu.ua.cs495.hpc_interface.async.executor;

import edu.ua.cs495.hpc_interface.async.jobs.AbstractOneTimeJob;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;
import javax.annotation.PreDestroy;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

@Log4j2
@Component
public class OneTimeExecutor {

  private ThreadPoolExecutor executor;

  public OneTimeExecutor() {
    this.executor = (ThreadPoolExecutor) Executors.newCachedThreadPool();
  }

  public void submit(AbstractOneTimeJob job) {
    log.info("Submitting job " + job.getId());
    this.executor.submit(job);
  }

  @PreDestroy
  public void destroy() {
    if (
      !this.executor.getQueue().isEmpty() || this.executor.getActiveCount() != 0
    ) {
      log.warn("Killed submission executor mid-task!");
    } else {
      log.info("Shutting down submission executor");
    }
    // forcibly kill all running tasks
    this.executor.shutdownNow();
  }
}
