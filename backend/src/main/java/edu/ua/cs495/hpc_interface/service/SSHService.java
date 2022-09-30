package edu.ua.cs495.hpc_interface.service;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import org.springframework.stereotype.Service;

@Service
public class SSHService {

  public static final int KEY_SIZE = 4096;

  public KeyPair generateKeyPair() {
    KeyPairGenerator kpg;
    try {
      kpg = KeyPairGenerator.getInstance("RSA");
    } catch (NoSuchAlgorithmException e) {
      throw new IllegalStateException(e);
    }
    kpg.initialize(KEY_SIZE);
    return kpg.generateKeyPair();
  }
}
