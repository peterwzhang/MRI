package edu.ua.cs495.hpc_interface.util;

import edu.ua.cs495.hpc_interface.exception.UnknownException;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.interfaces.RSAPrivateCrtKey;
import java.security.interfaces.RSAPublicKey;
import java.util.Arrays;
import java.util.Base64;
import java.util.Random;
import lombok.experimental.UtilityClass;

@UtilityClass
public class KeyUtils {

  public static final int KEY_SIZE = 4096;
  public static final int BASE_64_LINE_LENGTH = 68;
  public static final String SSH_KEY_COMMENT = "hpc-interface";

  public static KeyPair generateKeyPair() {
    KeyPairGenerator kpg;
    try {
      kpg = KeyPairGenerator.getInstance("RSA");
    } catch (NoSuchAlgorithmException e) {
      throw new IllegalStateException(e);
    }
    kpg.initialize(KEY_SIZE);
    return kpg.generateKeyPair();
  }

  /* spell-checker: disable */
  @SuppressWarnings(
    {
      "java:S109",
      "java:S127",
      "java:S139",
      "java:S881",
      "java:S1192",
      "java:S2119",
    }
  )
  public static String privateKeyToString(PrivateKey pkey) {
    RSAPrivateCrtKey key = (RSAPrivateCrtKey) pkey;
    // some straight witchcraft, thanks https://stackoverflow.com/a/71501385/4236490

    byte[] alg = "ssh-rsa".getBytes();
    byte[] none = "none".getBytes();
    byte[] nbyt = key.getModulus().toByteArray();
    byte[] ebyt = key.getPublicExponent().toByteArray();
    int rand = new Random().nextInt();

    // always enough, but not too much over
    ByteBuffer pub = ByteBuffer.allocate(nbyt.length + 50);
    for (byte[] x : new byte[][] { alg, ebyt, nbyt }) {
      pub.putInt(x.length);
      pub.put(x);
    }

    ByteBuffer prv = ByteBuffer.allocate(nbyt.length * 4 + 50); // ditto
    prv.putInt(rand);
    prv.putInt(rand);
    for (byte[] x : new byte[][] {
      alg,
      nbyt,
      ebyt,
      key.getPrivateExponent().toByteArray(),
      key.getCrtCoefficient().toByteArray(),
      key.getPrimeP().toByteArray(),
      key.getPrimeQ().toByteArray(),
    }) {
      prv.putInt(x.length);
      prv.put(x);
    }
    prv.putInt(0); // no comment
    for (int i = 0; prv.position() % 8 != 0;) {
      prv.put((byte) ++i); // 8 apparently default? IDK
    }

    ByteBuffer all = ByteBuffer.allocate(100 + pub.position() + prv.position()); // ditto
    all.put("openssh-key-v1".getBytes());
    all.put((byte) 0);
    all.putInt(none.length);
    all.put(none); // cipher
    all.putInt(none.length);
    all.put(none); // pbkdf
    all.putInt(0);
    all.putInt(1); // parms, count
    all.putInt(pub.position());
    all.put(pub.array(), 0, pub.position());
    all.putInt(prv.position());
    all.put(prv.array(), 0, prv.position());
    byte[] result = Arrays.copyOf(all.array(), all.position());

    StringBuilder builder = new StringBuilder();

    builder.append("-----BEGIN OPENSSH PRIVATE KEY-----\n");
    builder.append(
      Base64
        .getMimeEncoder(BASE_64_LINE_LENGTH, "\n".getBytes())
        .encodeToString(result)
    );
    builder.append("\n-----END OPENSSH PRIVATE KEY-----\n");

    return builder.toString();
  }

  /* spell-checker: enable */

  @SuppressWarnings("java:S3242")
  public static String publicKeyToString(PublicKey key) {
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
