package edu.ua.cs495.hpc_interface.controller;

import edu.ua.cs495.hpc_interface.domain.dto.UserWithKeyDTO;
import edu.ua.cs495.hpc_interface.domain.mapper.UserMapper;
import edu.ua.cs495.hpc_interface.rest.resource.UserApi;
import edu.ua.cs495.hpc_interface.service.AuthenticationService;
import edu.ua.cs495.hpc_interface.service.SSHService;
import edu.ua.cs495.hpc_interface.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/")
public class UserController implements UserApi {

  @Autowired
  private AuthenticationService authenticationService;

  @Autowired
  private UserMapper userMapper;

  @Autowired
  private SSHService sshService;

  @Autowired
  private UserService userService;

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<UserWithKeyDTO> getCurrentUserWithKey() {
    return ResponseEntity.ok(
      userMapper.toDtoWithKey(authenticationService.getAuthenticatedUser())
    );
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<UserWithKeyDTO> regenerateCurrentUserKey() {
    return ResponseEntity.ok(
      userMapper.toDtoWithKey(
        userService.regenerateKey(authenticationService.getAuthenticatedUser())
      )
    );
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<UserWithKeyDTO> verifyCurrentUserSsh() {
    return ResponseEntity.ok(
      userMapper.toDtoWithKey(
        sshService.checkSsh(authenticationService.getAuthenticatedUser())
      )
    );
  }
}
