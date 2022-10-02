package edu.ua.cs495.hpc_interface.service;

import edu.ua.cs495.hpc_interface.domain.entity.User;
import edu.ua.cs495.hpc_interface.domain.repository.UserRepository;
import java.security.KeyPair;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@AllArgsConstructor(onConstructor_ = { @Autowired })
public class UserService {

  private UserRepository repository;
  private SSHService sshService;

  protected User createUser(String email) {
    log.info(String.format("Creating user with email %s", email));

    KeyPair keyPair = sshService.generateKeyPair();

    User user = User
      .builder()
      .username(email.split("@")[0])
      .email(email)
      .admin(false)
      .privateKey(sshService.privateKeyToString(keyPair.getPrivate()))
      .publicKey(sshService.publicKeyToString(keyPair.getPublic()))
      .build();

    return repository.save(user);
  }

  public User regenerateKey(User source) {
    log.info(
      String.format("Regenerating keypair for user ID %s", source.getId())
    );

    KeyPair newKeyPair = sshService.generateKeyPair();

    User user = source
      .withPrivateKey(sshService.privateKeyToString(newKeyPair.getPrivate()))
      .withPublicKey(sshService.publicKeyToString(newKeyPair.getPublic()));

    return repository.save(user);
  }

  public User createUserIfNotExists(String email) {
    Optional<User> dbResult = repository.findOne(
      Example.of(
        User.builder().email(email).build(),
        ExampleMatcher.matching().withIgnoreCase()
      )
    );
    if (dbResult.isPresent()) {
      return dbResult.get();
    }

    return createUser(email);
  }
}
