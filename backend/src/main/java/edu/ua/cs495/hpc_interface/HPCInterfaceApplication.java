package edu.ua.cs495.hpc_interface;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@EnableWebMvc
@SpringBootApplication
public class HPCInterfaceApplication {

  public static void main(String[] args) {
    SpringApplication.run(HPCInterfaceApplication.class, args);
  }
}
