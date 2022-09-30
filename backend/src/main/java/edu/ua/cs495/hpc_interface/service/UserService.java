package edu.ua.cs495.hpc_interface.service;

import edu.ua.cs495.hpc_interface.domain.entity.User;
import edu.ua.cs495.hpc_interface.domain.repository.UserRepository;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor(onConstructor_ = { @Autowired })
public class UserService {

  private UserRepository repository;

  protected User createUser(String email) {
    User user = User
      .builder()
      .username(email.split("@")[0])
      .email(email)
      .admin(false)
      .privateKey(new byte[] {})
      .publicKey(new byte[] {})
      .build();
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
