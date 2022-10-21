import { ScriptForCreation } from "./ScriptForCreation";

/**
 * The basic metadata needed to submit a single batch
 */
export interface BatchForSubmission {
  /**
   * The batch's name
   */
  name: string;
  /**
   * If this batch should wait to submit jobs pending a manual approval
   */
  requiresApprovalStep: boolean;
  /**
   * Metadata for a single script, with required ID
   */
  script: ScriptForCreation;
}
