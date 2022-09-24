package edu.ua.cs495.hpc_interface.domain.entity;

import edu.ua.cs495.hpc_interface.domain.types.CleanupMode;
import java.io.Serializable;
import java.time.Instant;
import java.util.UUID;
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
import lombok.NoArgsConstructor;
import lombok.With;

@Data
@With
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "scripts")
public class Script implements Serializable {

  /** The script's unique ID */
  @Id
  @NotNull
  @GeneratedValue
  @Column(name = "id")
  private UUID id;

  /** The script's creator */
  @NotNull
  @JoinColumn(name = "user_id")
  @ManyToOne(fetch = FetchType.EAGER)
  private User user;

  /** A name for the script */
  @NotNull
  @Column(name = "name")
  private String name;

  /**
   * The block to be prepended to all scripts (setup jobs, parallel jobs, slurm configs,
   * and even cleanups).  This should contain important script-wide configuration settings,
   * such as fillable variables, functions, shell options, etc.
   */
  @NotNull
  @Column(name = "header")
  private String header;

  /**
   * A script to prepare the environment for processing.  This can include things like
   * extracting archives of data, moving them to an appropriate location in /scratch,
   * creation of folders, etc.  If provided, this job will be ran on compute rather than
   * the head node.
   */
  @NotNull
  @Column(name = "setup_script")
  private String setupScript;

  /** The slurm configuration for the setup script (excluding the srun) */
  @NotNull
  @Column(name = "setup_slurm_config")
  private String setupScriptSlurmConfig;

  /**
   * The top portion of the job-generation script, likely ended with the start of a loop.
   * This will be responsible for setting up variables needed for script generation and
   * contain all of the logic to determine which jobs need to have scripts generated
   * (e.g. looping through a folder of patient's MRI scans).  Batches with only one job
   * should leave this blank.
   */
  @NotNull
  @Column(name = "loop_wrapper_top")
  private String loopWrapperTop;

  /**
   * This variable MUST uniquely identify a job, including the $.  For example, this
   * could be something like $file or $subject.  This variable must be declared,
   * initialized, and updated as part of the loop code.  This variable will be used to
   * uniquely identify jobs and has implications with the filesystem.
   *
   * Single-job batches can use any non-empty string, so long as it does not begin with $
   */
  @NotNull
  @Column(name = "id_var")
  private String idVariable;

  /** The template of code for the actual jobs (to be run on compute) */
  @NotNull
  @Column(name = "job_template")
  private String jobTemplate;

  /** Slurm configuration for job queueing (excluding the srun) */
  @NotNull
  @Column(name = "slurm_template")
  private String slurmTemplate;

  /**
   * The bottom of the script started by loopWrapperTop (this must close any opened loops)
   */
  @NotNull
  @Column(name = "loop_wrapper_bottom")
  private String loopWrapperBottom;

  /**
   * A script to cleanup the environment after completion (ran selectively depending on
   * cleanupMode).  Typical tasks may include deleting temporary files, moving results
   * into permanent storage, etc.  This script will be ran on compute.
   */
  @NotNull
  @Column(name = "cleanup_script")
  private String cleanupScript;

  /** Slurm configuration (excluding srun) for the cleanup script */
  @NotNull
  @Column(name = "cleanup_slurm_config")
  private String cleanupSlurmConfig;

  /** Under what circumstances the cleanup script should be run */
  @NotNull
  @Column(name = "cleanup_mode")
  @Enumerated(EnumType.STRING)
  private CleanupMode cleanupMode;

  /** When this script was first created */
  @NotNull
  @Column(name = "created_ts")
  private Instant createdAt;

  /** When this script was last edited */
  @NotNull
  @Column(name = "updated_ts")
  private Instant updatedAt;

  /** If this script is a global template that should be accessible to all users */
  @Column(name = "global_template")
  private boolean globalTemplate;

  /** If the script has been archived (viewable but not editable) */
  @Column(name = "archived")
  private boolean archived;
}
