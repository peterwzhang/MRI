package edu.ua.cs495.hpc_interface.async.jobs;

import edu.ua.cs495.hpc_interface.domain.entity.Batch;
import edu.ua.cs495.hpc_interface.domain.types.BatchStatus;
import edu.ua.cs495.hpc_interface.service.SSHService;

/**
 * This job submits the setup portion of a batch to be run on compute via Slurm.
 */
public final class SubmitSetupJob extends AbstractSubmissionJob {

  private Batch batch;

  public SubmitSetupJob(SSHService sshService, Batch batch) {
    super(sshService);
    this.batch = batch;
  }

  protected void runJob() throws InterruptedException {
    log.info("Starting!!");

    // TODO: replace this with actual logic
    Thread.sleep(5000);
    log.info("Pre-save");
    this.service.getBatchRepository()
      .save(this.batch.withStatus(BatchStatus.SETTING_UP));

    log.info("And done!!");
  }
}
