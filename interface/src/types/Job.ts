import { JobMetadata } from "./JobMetadata";

/**
 * All data for a single job
 */
export type Job = JobMetadata & {
  /**
   * The location of this job's log file on disk, should be within /scratch/
   */
  logPath: string;
  /**
   * The end of the log file, if available.  This will be limited to the last 50 KB.
   */
  logTail: string;
  /**
   * The location of this job's script on disk, should be within /scratch/
   */
  scriptPath: string;
  /**
   * The file which is responsible for queueing the script in scriptPath; this
   * will contain Slurm configuration, as applicable.
   */
  scriptPathSlurmQueuer: string;
};
