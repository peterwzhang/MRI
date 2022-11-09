package edu.ua.cs495.hpc_interface.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

  // forward all un-handled requests to index
  @GetMapping(value = { "/{regex:\\w+}", "/**/{regex:\\w+}" })
  public String forwardSPA() {
    return "forward:/";
  }
}
