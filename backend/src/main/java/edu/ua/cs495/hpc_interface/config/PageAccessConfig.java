package edu.ua.cs495.hpc_interface.config;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebSecurity
public class PageAccessConfig implements WebMvcConfigurer {

  private static final String INDEX_ROUTE = "forward:/index.html";

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
        "https://localhost:8443",
        "https://hpc-interface-dev.ua.edu",
        "https://dev-00449127.okta.com"
      );
  }

  /**
   * Thank you https://stackoverflow.com/a/50709789/4236490
   * Ensure client-side paths redirect to index.html because client handles routing.
   * NOTE: Do NOT use @EnableWebMvc or it will break this.
   */
  @Override
  public void addViewControllers(ViewControllerRegistry registry) {
    // Map "/"
    registry.addViewController("/").setViewName(INDEX_ROUTE);

    // Map "/word", "/word/word", and "/word/word/word" - except for anything starting with "/api/..." or ending with
    // a file extension like ".js" - to index.html. By doing this, the client receives and routes the url. It also
    // allows client-side URLs to be bookmarked.

    // Single directory level - no need to exclude "api"
    registry.addViewController("/{x:[\\w\\-]+}").setViewName(INDEX_ROUTE);
    // Multi-level directory path, need to exclude "api" on the first part of the path
    registry
      .addViewController("/{x:^(?!api$).*$}/**/{y:[\\w\\-]+}")
      .setViewName(INDEX_ROUTE);
  }

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry
      .addResourceHandler("/**")
      .addResourceLocations("classpath:/public/");
  }
}
