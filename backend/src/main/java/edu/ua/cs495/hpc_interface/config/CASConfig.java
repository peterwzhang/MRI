package edu.ua.cs495.hpc_interface.config;

import edu.ua.cs495.hpc_interface.service.AuthenticationService;
import lombok.extern.log4j.Log4j2;
import org.jasig.cas.client.session.SingleSignOutFilter;
import org.jasig.cas.client.validation.Cas30ServiceTicketValidator;
import org.jasig.cas.client.validation.TicketValidator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.cas.ServiceProperties;
import org.springframework.security.cas.authentication.CasAuthenticationProvider;
import org.springframework.security.cas.web.CasAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;

@Log4j2
@Configuration
public class CASConfig {

  @Bean
  public CasAuthenticationFilter casAuthenticationFilter(
    AuthenticationManager authenticationManager,
    ServiceProperties serviceProperties
  ) {
    CasAuthenticationFilter filter = new CasAuthenticationFilter();
    filter.setAuthenticationManager(authenticationManager);
    filter.setServiceProperties(serviceProperties);
    return filter;
  }

  @Bean
  public ServiceProperties serviceProperties() {
    log.info("service properties");
    ServiceProperties serviceProperties = new ServiceProperties();
    serviceProperties.setService("https://hpc-interface-dev.ua.edu/login/cas");
    serviceProperties.setSendRenew(false);
    return serviceProperties;
  }

  @Bean
  public TicketValidator ticketValidator() {
    return new Cas30ServiceTicketValidator("https://login.ua.edu/cas");
  }

  @Bean
  public CasAuthenticationProvider casAuthenticationProvider(
    TicketValidator ticketValidator,
    ServiceProperties serviceProperties,
    AuthenticationService authenticationService
  ) {
    CasAuthenticationProvider provider = new CasAuthenticationProvider();
    provider.setServiceProperties(serviceProperties);
    provider.setTicketValidator(ticketValidator);
    provider.setUserDetailsService(authenticationService);
    provider.setKey("CAS_PROVIDER_UA");
    return provider;
  }

  @Bean
  public SecurityContextLogoutHandler securityContextLogoutHandler() {
    return new SecurityContextLogoutHandler();
  }

  @Bean
  public LogoutFilter logoutFilter() {
    LogoutFilter logoutFilter = new LogoutFilter(
      "https://login.ua.edu/cas/logout",
      securityContextLogoutHandler()
    );
    logoutFilter.setFilterProcessesUrl("/logout/cas");
    return logoutFilter;
  }

  @Bean
  public SingleSignOutFilter singleSignOutFilter() {
    SingleSignOutFilter singleSignOutFilter = new SingleSignOutFilter();
    singleSignOutFilter.setLogoutCallbackPath("/exit/cas");
    singleSignOutFilter.setIgnoreInitConfiguration(true);
    return singleSignOutFilter;
  }
}
