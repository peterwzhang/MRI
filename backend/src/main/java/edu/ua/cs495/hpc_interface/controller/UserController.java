package edu.ua.cs495.hpc_interface.controller;

import edu.ua.cs495.hpc_interface.domain.dto.UserWithKeyDTO;
import edu.ua.cs495.hpc_interface.domain.entity.User;
import edu.ua.cs495.hpc_interface.domain.mapper.UserMapper;
import edu.ua.cs495.hpc_interface.exception.NotImplementedException;
import edu.ua.cs495.hpc_interface.rest.resource.UserApi;
import edu.ua.cs495.hpc_interface.service.AuthenticationService;
import javax.servlet.http.HttpServletRequest;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequestMapping(value = "/")
public class UserController implements UserApi {

  @Autowired
  private HttpServletRequest httpServletRequest;

  @Autowired
  private AuthenticationService authenticationService;

  @Autowired
  private UserMapper userMapper;

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<UserWithKeyDTO> getCurrentUserWithKey() {
    User user = authenticationService.getAuthenticatedUser();
    return ResponseEntity.ok(userMapper.toDtoWithKey(user));
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<UserWithKeyDTO> regenerateCurrentUserKey() {
    throw new NotImplementedException(httpServletRequest);
  }
}
