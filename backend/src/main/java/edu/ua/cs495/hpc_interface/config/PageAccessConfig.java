package edu.ua.cs495.hpc_interface.config;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.catalina.Context;
import org.apache.tomcat.util.http.Rfc6265CookieProcessor;
import org.apache.tomcat.util.http.SameSiteCookies;
import org.springframework.boot.web.embedded.tomcat.TomcatContextCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebSecurity
public class PageAccessConfig implements WebMvcConfigurer {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .authorizeHttpRequests(
        authorize ->
          authorize
            .mvcMatchers("/api/**")
            .permitAll()
            .mvcMatchers("/logout")
            .permitAll()
            .anyRequest()
            .authenticated()
      )
      .cors()
      .and()
      .csrf()
      .disable()
      .logout(
        logout ->
          logout
            .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "POST"))
            .permitAll()
            .logoutSuccessHandler(
              (HttpServletRequest request, HttpServletResponse response, Authentication authentication) ->
                response.setStatus(HttpServletResponse.SC_OK)
            )
      )
      .saml2Login();
    return http.build();
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry
      .addMapping("/**")
      .allowCredentials(true)
      .allowedMethods("HEAD", "GET", "POST", "PUT", "DELETE")
      .allowedOrigins(
        "https://localhost:3000",
        "http://localhost:3000",
        "https://localhost:8443"
      );
  }

  @Bean
  public TomcatContextCustomizer sameSiteCookiesConfig() {
    return (Context context) -> {
      final Rfc6265CookieProcessor cookieProcessor = new Rfc6265CookieProcessor();
      cookieProcessor.setSameSiteCookies(SameSiteCookies.NONE.getValue());
      context.setCookieProcessor(cookieProcessor);
    };
  }
}
