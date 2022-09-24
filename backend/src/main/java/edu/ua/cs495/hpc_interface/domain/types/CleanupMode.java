package edu.ua.cs495.hpc_interface.domain.types;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.ToString;

/**
 * Available clean-up modes
 */
@ToString
@AllArgsConstructor
public enum CleanupMode {
  ALL_ENDED("ALL_ENDED"),
  ALL_SUCCESS("ALL_SUCCESS"),
  NEVER("NEVER");

  private String value;

  @JsonCreator
  public static CleanupMode from(String value) {
    for (CleanupMode b : CleanupMode.values()) {
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
