import { BatchMetadataWithId } from "./BatchMetadataWithId";
import { JobCollection } from "./JobCollection";

/**
 * All data for a single script
 */
export type BatchWithJobs = BatchMetadataWithId & {
  jobs: JobCollection;
};
