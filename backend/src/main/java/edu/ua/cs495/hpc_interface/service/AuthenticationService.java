package edu.ua.cs495.hpc_interface.service;

import edu.ua.cs495.hpc_interface.domain.entity.User;
import edu.ua.cs495.hpc_interface.domain.types.UserPrincipal;
import edu.ua.cs495.hpc_interface.exception.NeedsAuthenticationException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.cas.authentication.CasAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor(onConstructor_ = { @Autowired })
public class AuthenticationService implements UserDetailsService {

  private UserService userService;

  public boolean isAuthenticated() {
    return (
      SecurityContextHolder
        .getContext()
        .getAuthentication() instanceof CasAuthenticationToken
    );
  }

  @Override
  public UserDetails loadUserByUsername(String username) {
    return new UserPrincipal(userService.createUserIfNotExists(username));
  }

  /**
   * Get the current user.  If the current session is not authenticated,
   * throws a {@link NeedsAuthenticationException}
   * @return the current user
   */
  public User getAuthenticatedUser() {
    if (!isAuthenticated()) {
      throw new NeedsAuthenticationException();
    }
    UserPrincipal principal = (UserPrincipal) SecurityContextHolder
      .getContext()
      .getAuthentication()
      .getPrincipal();

    return principal.getUser();
  }
}
