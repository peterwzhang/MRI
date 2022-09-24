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
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User implements Serializable {

  @Id
  @NotNull
  @GeneratedValue
  @Column(name = "id")
  private UUID id;

  @NotNull
  @Column(name = "username")
  private String username;

  @NotNull
  @Column(name = "email")
  private String email;

  @Lob
  @NotNull
  @Column(name = "private_key")
  @Type(type = "org.hibernate.type.BinaryType")
  private byte[] privateKey;

  @Lob
  @NotNull
  @Column(name = "public_key")
  @Type(type = "org.hibernate.type.BinaryType")
  private byte[] publicKey;
}
