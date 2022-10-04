/**
 * Information about a user
 */
export interface User {
  /**
   * A unique UUID identifying this user
   */
  id: string;
  /**
   * The user's myBama ID
   */
  username: string;
  /**
   * The user's email address
   */
  email?: string;
  /**
   * If the user is an administrator
   */
  admin?: boolean;
}
