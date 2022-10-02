package edu.ua.cs495.hpc_interface.service;

import com.google.common.base.Splitter;
import edu.ua.cs495.hpc_interface.exception.UnknownException;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.interfaces.RSAPublicKey;
import java.util.Base64;
import org.springframework.stereotype.Service;

@Service
public class SSHService {

  public static final int KEY_SIZE = 4096;
  public static final int BASE_64_LINE_LENGTH = 64;
  public static final String SSH_KEY_COMMENT = "hpc-interface";

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

  protected String getBase64Blob(byte[] in) {
    return String.join(
      "\n",
      Splitter
        .fixedLength(BASE_64_LINE_LENGTH)
        .split(Base64.getEncoder().encodeToString(in))
    );
  }

  public String privateKeyToString(PrivateKey key) {
    StringBuilder builder = new StringBuilder();

    builder.append("-----BEGIN RSA PRIVATE KEY-----\n");
    builder.append(getBase64Blob(key.getEncoded()));
    builder.append("\n-----END RSA PRIVATE KEY-----\n");

    return builder.toString();
  }

  @SuppressWarnings("java:S3242")
  public String publicKeyToString(PublicKey key) {
    RSAPublicKey publicKey = (RSAPublicKey) key;

    ByteArrayOutputStream byteOs = new ByteArrayOutputStream();
    DataOutputStream dos = new DataOutputStream(byteOs);

    try {
      dos.writeInt("ssh-rsa".getBytes().length);
      dos.write("ssh-rsa".getBytes());

      dos.writeInt(publicKey.getPublicExponent().toByteArray().length);
      dos.write(publicKey.getPublicExponent().toByteArray());

      dos.writeInt(publicKey.getModulus().toByteArray().length);
      dos.write(publicKey.getModulus().toByteArray());
    } catch (IOException e) {
      throw new UnknownException(e);
    }

    String enc = Base64.getEncoder().encodeToString(byteOs.toByteArray());

    return ("ssh-rsa " + enc + " " + SSH_KEY_COMMENT);
  }
}
