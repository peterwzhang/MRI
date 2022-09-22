import { ScriptMetadata } from "./ScriptMetadata";

/**
 * Metadata for a single script, with required ID
 */
export type ScriptMetadataWithId = ScriptMetadata & {
  /**
   * The script's ID
   */
  id: string;
};
