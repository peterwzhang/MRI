import { User } from "./User";

/**
 * The basic metadata for a single script
 */
export interface ScriptMetadata {
  /**
   * A unique UUID identifying this script
   */
  id?: string;
  /**
   * The info about the script's creator
   */
  user: User;
  /**
   * A descriptive name for the script
   */
  name: string;
  /**
   * When this script was created
   */
  createdAt: string;
  /**
   * When this script was created
   */
  updatedAt: string;
  /**
   * If this script is a globally-available template
   */
  globalTemplate: boolean;
  /**
   * If this script has been archived
   */
  archived: boolean;
}
