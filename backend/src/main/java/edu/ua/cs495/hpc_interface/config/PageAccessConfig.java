package edu.ua.cs495.hpc_interface.config;

import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @EnableWebSecurity
public class PageAccessConfig implements WebMvcConfigurer {

  private static final String INDEX_ROUTE = "forward:/index.html";

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
