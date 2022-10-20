import { ScriptMetadata } from "./ScriptMetadata";

/**
 * All data for a single script
 */
export type Script = ScriptMetadata & {
  /**
   * This block is prepended to all scripts (setup, parallel jobs, slurm
   * configs, and cleanups) and can contain global constants/variables,
   * functions, shell options, and more.
   */
  header: string;
  /**
   * This script is used to setup the environment for the processing.  This
   * will typically include extraction of archives, creation of folders, etc.
   * This, if provided, will be ran on compute nodes.
   */
  setupScript: string;
  /**
   * Slurm configuration to use to run the setup script, not including the srun.
   */
  setupScriptSlurmConfig: string;
  /**
   * The top of the loop used to generate jobs. This can be a block of code
   * ended by a for loop, for example (including the do).  If only
   * performing one job, leave this blank.
   */
  loopWrapperTop: string;
  /**
   * This should be a unique variable (e.g. $subject, including the $) that can
   * be used to identify jobs.  This should/will be used in job names, output log
   * filenames, etc.  If there is only a single job, use any string without a $.
   */
  idVariable: string;
  /**
   * This is the code that should be run in parallel on compute nodes.
   */
  jobTemplate: string;
  /**
   * This is the script that will define the Slurm configuration and queue the
   * jobs generated from JOB_TEMPLATE.  This should not include the sbatch
   * command, only options.
   */
  slurmTemplate: string;
  /**
   * The bottom of the loop used to generate jobs.  This should close any loops
   * started in the LOOP_WRAPPER_TOP.  If only performing one job, leave this blank.
   */
  loopWrapperBottom: string;
  /**
   * This script can be used to cleanup the environment after jobs have been
   * completed.  This can include deleting temporary files, moving results into
   * appropriate locations, etc.
   */
  cleanupScript: string;
  /**
   * Slurm configuration to use for the cleanup job, excluding the srun.
   */
  cleanupSlurmConfig: string;
  /**
   * This dictates when the cleanup script should be run: if it should run
   * after all jobs have ended (regardless of success), all jobs have
   */
  cleanupMode: "ALL_ENDED" | "ALL_SUCCESS" | "NEVER";
};
