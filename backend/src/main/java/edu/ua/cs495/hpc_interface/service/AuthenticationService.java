package edu.ua.cs495.hpc_interface.service;

import edu.ua.cs495.hpc_interface.domain.entity.User;
import edu.ua.cs495.hpc_interface.exception.NeedsAuthenticationException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.saml2.provider.service.authentication.Saml2AuthenticatedPrincipal;
import org.springframework.security.saml2.provider.service.authentication.Saml2Authentication;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor(onConstructor_ = { @Autowired })
public class AuthenticationService {

  private UserService userService;

  public boolean isAuthenticated() {
    return (
      SecurityContextHolder
        .getContext()
        .getAuthentication() instanceof Saml2Authentication
    );
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
    Saml2AuthenticatedPrincipal principal = (Saml2AuthenticatedPrincipal) SecurityContextHolder
      .getContext()
      .getAuthentication()
      .getPrincipal();

    return userService.createUserIfNotExists(principal.getName());
  }
}
