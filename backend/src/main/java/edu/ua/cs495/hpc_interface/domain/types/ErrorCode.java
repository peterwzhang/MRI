package edu.ua.cs495.hpc_interface.domain.types;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum ErrorCode {
  SCRIPT_NOT_FOUND("SCRIPT_NOT_FOUND"),
  ENDPOINT_NOT_FOUND("ENDPOINT_NOT_FOUND"),
  ENDPOINT_INVALID_METHOD("ENDPOINT_INVALID_METHOD"),
  AUTHENTICATION_REQUIRED("AUTHENTICATION_REQUIRED"),
  /**
   * Catch-all for any invalid request.  Should be used as little as possible,
   * only really when Spring cannot parse the request parameters whatsoever
   * (e.g. an invalid UUID)
   */
  INVALID_REQUEST("INVALID_REQUEST"),
  NOT_IMPLEMENTED("NOT_IMPLEMENTED"),
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
