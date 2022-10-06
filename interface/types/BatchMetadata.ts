import { JobCollection } from "./JobCollection";
import { ScriptMetadataWithId } from "./ScriptMetadataWithId";
import { User } from "./User";

/**
 * The basic metadata for a single batch
 */
export interface BatchMetadata {
  /**
   * A unique UUID identifying this batch
   */
  id?: string;
    /**
   * Summary information of multiple jobs
   */
  jobs: JobCollection;
      /**
   * Information about a user
   */
  user: User;
  /**
   * The batch's name
   */
  name: string;
  /**
   * The current state of the batch
   */
  status:
    | "QUEUEING_SETUP"
    | "SETTING_UP"
    | "GENERATING"
    | "AWAITING_APPROVAL"
    | "QUEUEING"
    | "RUNNING"
    | "CLEAN_UP_QUEUEING" 
    | "CLEAN_UP_RUNNING" 
    | "COMPLETED" 
    | "CANCELLED" 
    | "FAILED";
  /**
   * If this batch should wait to submit jobs pending a manual approval
   */
  requiresApprovalStep: boolean;
  /**
   * Metadata for a single script, with required ID
   */
  scriptUsed: ScriptMetadataWithId;
  /**
   * When execution for this batch was started
   */
  startedAt: string;
  /**
   * A summary of the number of jobs by state.  Note that jobs which were not
   * approved and/or not started are not included here.
   */
  statusSummary: {
    /**
     * The number of jobs waiting for setup, queueing, or pending (waiting for a node to become available)
     */
    waiting: number;
    /**
     * The number of jobs running
     */
    running: number;
    /**
     * The number of jobs which completed successfully
     */
    success?: number;
    /**
     * The number of jobs that have timed out, failed, or been cancelled
     */
    failed: number;
  };
  /**
   * The last time this batch's data was synchronized with the server.
   */
  lastSynced?: string;
}
