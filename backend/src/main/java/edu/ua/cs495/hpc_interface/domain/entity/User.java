package edu.ua.cs495.hpc_interface.domain.entity;

import java.io.Serializable;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;
import org.hibernate.annotations.Type;

@Data
@With
@Entity
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User implements Serializable {

  /** Unique ID for this user */
  @Id
  @NotNull
  @GeneratedValue
  @Column(name = "id")
  private UUID id;

  /** The myBama ID for this user */
  @NotNull
  @Column(name = "username")
  private String username;

  /** The user's email address (for notifications and other such features) */
  @NotNull
  @Column(name = "email")
  private String email;

  /** If the user is an administrator */
  @Column(name = "admin")
  private Boolean admin;

  /**
   * The private key that should be used to access the HPC cluster on the user's behalf
   */
  @NotNull
  @Column(name = "private_key")
  private String privateKey;

  /** The public key that should be installed on the HPC cluster by the user */
  @NotNull
  @Column(name = "public_key")
  private String publicKey;
}
