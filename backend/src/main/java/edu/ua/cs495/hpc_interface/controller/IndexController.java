package edu.ua.cs495.hpc_interface.controller;

import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

  @GetMapping(value = "/")
  public void method(HttpServletResponse httpServletResponse) {
    httpServletResponse.setHeader(
      "Location",
      "http://localhost:3000/home"
    );
    httpServletResponse.setStatus(HttpStatus.MOVED_PERMANENTLY.value());
  }
}
