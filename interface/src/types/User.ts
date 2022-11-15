/**
 * Information about a user
 */
export interface User {
  /**
   * A unique UUID identifying this user
   */
  id: string;
  /**
   * If SSH works for the user
   */
  sshWorking?: boolean;
  /**
   * The user's myBama ID
   */
  username: string;
  /**
   * If the user is an administrator
   */
  admin?: boolean;
}
