package edu.ua.cs495.hpc_interface;

import edu.ua.cs495.hpc_interface.domain.repository.RefreshableRepositoryImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@EnableWebMvc
@SpringBootApplication
@EnableTransactionManagement
@EnableJpaRepositories(repositoryBaseClass = RefreshableRepositoryImpl.class)
public class HPCInterfaceApplication {

  public static void main(String[] args) {
    SpringApplication.run(HPCInterfaceApplication.class, args);
  }
}
