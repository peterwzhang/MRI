import { Script } from "./Script";

/**
 * All data for a single script, with required ID
 */
export type ScriptWithId = Script & {
  /**
   * The script's ID
   */
  id: string;
};
