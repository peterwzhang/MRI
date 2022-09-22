import { BatchMetadata } from "./BatchMetadata";

/**
 * Batch metadata with required ID
 */
export type BatchMetadataWithId = BatchMetadata & {
  /**
   * The ID of the batch
   */
  id: string;
};
