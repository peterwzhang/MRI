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
  /**
   * After all jobs have ended, even if there were failures.
   * Note: this will not include cancelled batches; these will never cleanup
   */
  ALL_ENDED("ALL_ENDED"),
  /**
   * After all jobs successfully completed
   */
  ALL_SUCCESS("ALL_SUCCESS"),
  /**
   * Never run a cleanup script
   */
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
