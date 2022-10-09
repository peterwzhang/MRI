package edu.ua.cs495.hpc_interface.controller;

import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class IndexController {

  @GetMapping(value = "/")
  public void method(HttpServletResponse httpServletResponse) {
    httpServletResponse.setHeader(
      "Location",
      "http://localhost:3000/dashboard"
    );
    httpServletResponse.setStatus(HttpStatus.MOVED_PERMANENTLY.value());
  }
}
