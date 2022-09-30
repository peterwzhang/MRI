package edu.ua.cs495.hpc_interface.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
public class PageAccessConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .authorizeHttpRequests(
        authorize ->
          authorize
            .mvcMatchers("/api/**")
            .permitAll()
            .anyRequest()
            .authenticated()
      )
      .saml2Login();
    return http.build();
  }
}
