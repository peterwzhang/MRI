package edu.ua.cs495.hpc_interface;

import edu.ua.cs495.hpc_interface.domain.repository.RefreshableRepositoryImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
@EnableJpaRepositories(repositoryBaseClass = RefreshableRepositoryImpl.class)
public class HPCInterfaceApplication extends SpringBootServletInitializer {

  @Override
  protected SpringApplicationBuilder configure(
    SpringApplicationBuilder application
  ) {
    return application.sources(HPCInterfaceApplication.class);
  }

  public static void main(String[] args) {
    SpringApplication.run(HPCInterfaceApplication.class, args);
  }
}
