package edu.ua.cs495.hpc_interface.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

@Log4j2
@ControllerAdvice
public class IndexController {

  @ExceptionHandler(NoHandlerFoundException.class)
  public String forwardSPA() {
    log.info("In forwardSPA");
    log.info("In forwardSPA");
    log.info("In forwardSPA");
    log.info("In forwardSPA");
    log.info("In forwardSPA");
    log.info("In forwardSPA");
    log.info("In forwardSPA");
    log.info("In forwardSPA");
    return "forward:/index.html";
  }
}
