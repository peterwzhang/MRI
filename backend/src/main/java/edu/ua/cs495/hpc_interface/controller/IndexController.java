package edu.ua.cs495.hpc_interface.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticatedPrincipal;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {

  @RequestMapping("/")
  public ResponseEntity<String> root(
    @AuthenticationPrincipal AuthenticatedPrincipal principal
  ) {
    return ResponseEntity.ok(String.format("Welcome %s!", principal.getName()));
  }
}
