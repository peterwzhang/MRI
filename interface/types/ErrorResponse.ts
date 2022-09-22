/**
 * An error from a request
 */
export interface ErrorResponse {
  /**
   * The time that the error occurred
   */
  timestamp: string;
  /**
   * The HTTP response code
   */
  status: number;
  /**
   * An error code describing the type of error
   */
  code?: string;
  /**
   * A description of the error, properly localized.
   */
  message?: string;
  /**
   * Additional data that may be used for rich error display in the UI
   */
  data?: {
    [k: string]: unknown;
  };
  /**
   * A stack trace of the exception which may or may not be useful.
   */
  _trace?: string[];
}
