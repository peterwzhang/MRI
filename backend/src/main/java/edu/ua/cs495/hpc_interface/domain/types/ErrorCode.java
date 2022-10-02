package edu.ua.cs495.hpc_interface.domain.types;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum ErrorCode {
  /**
   * The current user does not have permission to access the requested entity
   * or does not have permission to perform the requested action
   */
  FORBIDDEN("FORBIDDEN"),
  /** The requested resource could not be found */
  NOT_FOUND("NOT_FOUND"),

  // meta-errors

  /** The requested endpoint could not be found */
  ENDPOINT_NOT_FOUND("ENDPOINT_NOT_FOUND"),
  /** This method (GET, POST, etc.) is not supported for this endpoint */
  ENDPOINT_INVALID_METHOD("ENDPOINT_INVALID_METHOD"),
  /** Please login before using this endpoint */
  AUTHENTICATION_REQUIRED("AUTHENTICATION_REQUIRED"),

  // catch-alls
  /**
   * Catch-all for any invalid request.  Should be used as little as possible,
   * only really when Spring cannot parse the request parameters whatsoever
   * (e.g. an invalid UUID)
   */
  INVALID_REQUEST("INVALID_REQUEST"),
  NOT_IMPLEMENTED("NOT_IMPLEMENTED"),
  /** Catch all for any internal server error */
  UNKNOWN_ERROR("UNKNOWN_ERROR");

  private String value;

  @JsonCreator
  public static ErrorCode from(String value) {
    for (ErrorCode b : ErrorCode.values()) {
      if (b.value.equals(value.toUpperCase())) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  @JsonValue
  public String getValue() {
    return this.value;
  }
}
