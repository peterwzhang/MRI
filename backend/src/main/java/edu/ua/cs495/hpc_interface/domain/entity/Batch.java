package edu.ua.cs495.hpc_interface.domain.entity;

import edu.ua.cs495.hpc_interface.domain.types.BatchStatus;
import java.io.Serializable;
import java.time.Instant;
import java.util.Set;
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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Singular;
import lombok.With;

@Data
@With
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class Batch implements Serializable {

  /** Unique ID for this batch */
  @Id
  @NotNull
  @GeneratedValue
  @Column(name = "id")
  private UUID id;

  /** A name for the batch */
  @NotNull
  @Column(name = "name")
  private String name;

  /** The batch's creator */
  @NotNull
  @JoinColumn(name = "user_id")
  @ManyToOne(fetch = FetchType.EAGER)
  private User user;

  /** The batch's current status */
  @NotNull
  @Column(name = "status")
  @Enumerated(EnumType.STRING)
  private BatchStatus status;

  /** If this batch requires approval for starting jobs */
  @Column(name = "needs_approval")
  private boolean needsApproval;

  /** The script used for this batch */
  @NotNull
  @JoinColumn(name = "script_used")
  @ManyToOne(fetch = FetchType.LAZY)
  private Script scriptUsed;

  /** When the batch was initially submitted */
  @NotNull
  @Column(name = "start_time")
  private Instant startedAt;

  /** The jobs that are part of this batch */
  @Singular
  @OneToMany(fetch = FetchType.EAGER, mappedBy = "batch")
  private Set<Job> jobs;
}
