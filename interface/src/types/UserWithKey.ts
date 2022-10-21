import { User } from "./User";

/**
 * A user's data, including their public key
 */
export type UserWithKey = User & {
  /**
   * The public key to authenticate the user over SSH.  This key will be
   * presented in a format ready for entry into .ssh/authorized_keys
   */
  publicKey: string;
};
