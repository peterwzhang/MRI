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
public enum BatchStatus {
  /** The setup script has not been queued but will be soon */
  QUEUEING_SETUP("QUEUEING_SETUP"),
  /** The setup script is currently running */
  SETTING_UP("SETTING_UP"),
  /** Jobs are being generated */
  GENERATING("GENERATING"),
  /** Jobs are generated, however, require manual approval before they may be queued */
  AWAITING_APPROVAL("AWAITING_APPROVAL"),
  /** Jobs are being queued */
  QUEUEING("QUEUEING"),
  /** Jobs are queued */
  RUNNING("RUNNING"),
  /** Jobs have finished; the cleanup script is now in the process of queueing */
  CLEAN_UP_QUEUEING("CLEAN_UP_QUEUEING"),
  /** The cleanup script is now in the process of running */
  CLEAN_UP_RUNNING("CLEAN_UP_RUNNING"),
  /** The batch has completed running (with or without failing jobs) */
  COMPLETED("COMPLETED"),
  /**
   * The batch experienced a severe error and failed to queue/run in general.  This may
   * be due to invalid scripts, improper user SSH key setup, or any other issue that
   * prevents the core of this application from working.
   */
  FAILED("FAILED"),
  /**
   * The batch was explicitly cancelled by the user
   */
  CANCELLED("CANCELLED");

  private String value;

  @JsonCreator
  public static BatchStatus from(String value) {
    for (BatchStatus b : BatchStatus.values()) {
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
