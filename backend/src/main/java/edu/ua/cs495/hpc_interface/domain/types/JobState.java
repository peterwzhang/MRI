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
public enum JobState {
  /** The job is ready to go into the queue */
  QUEUEING("QUEUEING"),
  /** The job is queued, however, blocked (usage limits, compute availability, etc) */
  PENDING("PENDING"),
  /** The job is actively running on compute node(s) */
  RUNNING("RUNNING"),
  /** The job has completed successfully */
  SUCCESS("SUCCESS"),
  /** The job has run for longer than it was permitted */
  TIMEOUT("TIMEOUT"),
  /** The job failed (non-zero exit code) */
  FAILED("FAILED"),
  /** The job was explicitly cancelled by the owner */
  CANCELLED("CANCELLED"),
  /**
   * The parent batch required manual selection of jobs to run and this job either is
   * awaiting the outcome of this decision or the decision has already been made (and
   * resulted in this job being left out)
   */
  UNAPPROVED("UNAPPROVED");

  private String value;

  public boolean isWaiting() {
    return this == JobState.QUEUEING || this == JobState.PENDING;
  }

  public boolean isRunning() {
    return this == JobState.RUNNING;
  }

  public boolean isFailed() {
    return (
      this == JobState.CANCELLED ||
      this == JobState.FAILED ||
      this == JobState.TIMEOUT
    );
  }

  public boolean isCompleted() {
    return this == JobState.SUCCESS;
  }

  @JsonCreator
  public static JobState from(String value) {
    for (JobState b : JobState.values()) {
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
