package edu.ua.cs495.hpc_interface.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.ua.cs495.hpc_interface.domain.types.JobState;
import java.io.Serializable;
import java.time.Instant;
import java.util.UUID;
import javax.annotation.CheckForNull;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.With;

@Data
@With
@Entity
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "jobs")
public class Job implements Serializable {

  /** Unique ID for this job */
  @Id
  @NotNull
  @GeneratedValue
  @Column(name = "id")
  private UUID id;

  /** The batch which this job is a part of */
  // must ensure we don't include in string representations
  // otherwise we will cause a circular loop
  @NotNull
  @JsonIgnore
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JoinColumn(name = "batch_id")
  @ManyToOne(fetch = FetchType.LAZY)
  private Batch batch;

  /** The slurm ID for the job, if known */
  @CheckForNull
  @Column(name = "slurm_id")
  private Integer slurmId;

  /** The job's current state */
  @NotNull
  @Column(name = "state")
  @Enumerated(EnumType.STRING)
  private JobState state;

  /** The job's state according to Slurm (may have more specific information) */
  @NotNull
  @Column(name = "slurm_state")
  private String slurmState;

  /** The location of the logfile on scratch (should be derived from the ID somehow) */
  @NotNull
  @Column(name = "log_path")
  private String logPath;

  /** The last 50 KB of the logfile */
  @NotNull
  @Column(name = "log_tail")
  private String logTail;

  /** The identifying variable printed by the script */
  @NotNull
  @Column(name = "variable_id")
  private String identifier;

  /** The location of the job's compute script on disk */
  @NotNull
  @Column(name = "script_path")
  private String scriptPath;

  /** The location of the slurm queueing script on disk */
  @NotNull
  @Column(name = "slurm_queue_script_path")
  private String slurmQueueScriptPath;

  /** If this job is used as the setup for a batch */
  @Column(name = "is_setup_job")
  private Boolean setupJob;

  /** If this job is used as the cleanup for a batch */
  @Column(name = "is_cleanup_job")
  private Boolean cleanupJob;

  /** When this job entered the Slurm queue */
  @CheckForNull
  @Column(name = "queued_time")
  private Instant queuedTime;

  /** When Slurm started this job (or our best guess) */
  @CheckForNull
  @Column(name = "start_time")
  private Instant startTime;

  /** When Slurm finished this job (or our best guess) */
  @CheckForNull
  @Column(name = "end_time")
  private Instant endTime;

  /** The maximum amount of time that this script is allowed to run, in seconds */
  @CheckForNull
  @Column(name = "time_limit")
  private Integer timeLimit;

  /** The list of nodes this job has run on, if known */
  @CheckForNull
  @Column(name = "node_list")
  private String nodeList;

  /** The exit code of the script, if known.  If unknown, this will be 0 */
  @Builder.Default
  @Column(name = "exit_code")
  private Integer exitCode = 0;

  /** When this job was last synchronized with Slurm */
  @NotNull
  @Column(name = "last_sync")
  private Instant lastSync;
}
