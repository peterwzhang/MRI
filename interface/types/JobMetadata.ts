/**
 * The basic metadata for a single job
 */
export interface JobMetadata {
  /**
   * A unique UUID identifying this job
   */
  id: string;
  /**
   * The ID slurm has assigned for this job, if available
   */
  slurmId: number;
  /**
   * The current state of the job
   */
  state:
    | "WAITING_FOR_SETUP"
    | "QUEUEING"
    | "PENDING"
    | "RUNNING"
    | "TIMEOUT"
    | "FAILED"
    | "CANCELLED"
    | "UNAPPROVED";
  /**
   * The job's state, according to slurm.  This may provide more (or less) information than the regular state.
   */
  slurmState: string;
  /**
   * A unique variable identifying this job, as derived from the setup script (such as a patient ID).
   */
  identifier: string;
  /**
   * If this job is a special part of a batch (setup, cleanup, etc)
   */
  specialJobType: "NONE" | "SETUP" | "GENERATOR" | "CLEANUP";
  /**
   * When this was formally queued into Slurm, if known
   */
  queuedTime: string;
  /**
   * When this job was started according to Slurm, if known
   */
  startTime: string;
  /**
   * When this job was finished according to Slurm, if known
   */
  endTime: string;
  /**
   * The maximum amount of time this job can be running, according to Slurm (if known)
   */
  timeLimit: number;
  /**
   * What nodes the job is running/has ran on, according to Slurm (if known)
   */
  nodeList: string;
  /**
   * What exit code the script finished with, if known (zero if unknown)
   */
  exitCode: number;
  /**
   * When this job was last synced/updated with Slurm
   */
  lastSync: string;
}
