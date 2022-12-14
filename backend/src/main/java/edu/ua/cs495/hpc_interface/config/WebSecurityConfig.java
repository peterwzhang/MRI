package edu.ua.cs495.hpc_interface.config;

import java.util.Collections;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.jasig.cas.client.session.SingleSignOutFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.cas.ServiceProperties;
import org.springframework.security.cas.authentication.CasAuthenticationProvider;
import org.springframework.security.cas.web.CasAuthenticationEntryPoint;
import org.springframework.security.cas.web.CasAuthenticationFilter;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  private SingleSignOutFilter singleSignOutFilter;
  private LogoutFilter logoutFilter;
  private CasAuthenticationProvider casAuthenticationProvider;
  private ServiceProperties serviceProperties;

  @Autowired
  public WebSecurityConfig(
    SingleSignOutFilter singleSignOutFilter,
    LogoutFilter logoutFilter,
    CasAuthenticationProvider casAuthenticationProvider,
    ServiceProperties serviceProperties
  ) {
    this.logoutFilter = logoutFilter;
    this.singleSignOutFilter = singleSignOutFilter;
    this.serviceProperties = serviceProperties;
    this.casAuthenticationProvider = casAuthenticationProvider;
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
      .authorizeRequests()
      .mvcMatchers("/api/**")
      .permitAll()
      .mvcMatchers("/login/cas")
      .permitAll()
      .anyRequest()
      .authenticated()
      .and()
      .exceptionHandling()
      .authenticationEntryPoint(authenticationEntryPoint())
      .and()
      .addFilterBefore(singleSignOutFilter, CasAuthenticationFilter.class)
      .addFilterBefore(logoutFilter, LogoutFilter.class)
      .csrf()
      .disable()
      .cors()
      .configurationSource((HttpServletRequest request) -> {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(
          List.of(
            "http://localhost:3000",
            "https://localhost:3000",
            "https://hpc-interface-dev.ua.edu"
          )
        );
        config.setAllowedMethods(
          List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")
        );
        config.setAllowCredentials(true);
        return config;
      });
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.authenticationProvider(casAuthenticationProvider);
  }

  @Bean
  @Override
  protected AuthenticationManager authenticationManager() throws Exception {
    return new ProviderManager(
      Collections.singletonList(casAuthenticationProvider)
    );
  }

  public AuthenticationEntryPoint authenticationEntryPoint() {
    CasAuthenticationEntryPoint entryPoint = new CasAuthenticationEntryPoint();
    entryPoint.setLoginUrl("https://login.ua.edu/cas/login");
    entryPoint.setServiceProperties(serviceProperties);
    return entryPoint;
  }
}
