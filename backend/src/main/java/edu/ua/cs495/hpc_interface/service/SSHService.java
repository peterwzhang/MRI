package edu.ua.cs495.hpc_interface.service;

import com.sshtools.client.SshClient;
import com.sshtools.common.publickey.InvalidPassphraseException;
import com.sshtools.common.publickey.SshKeyUtils;
import com.sshtools.common.publickey.SshPrivateKeyFileFactory;
import com.sshtools.common.ssh.SshException;
import com.sshtools.common.ssh.components.SshKeyPair;
import edu.ua.cs495.hpc_interface.async.executor.OneTimeExecutor;
import edu.ua.cs495.hpc_interface.domain.entity.Job;
import edu.ua.cs495.hpc_interface.domain.entity.User;
import edu.ua.cs495.hpc_interface.domain.repository.BatchRepository;
import edu.ua.cs495.hpc_interface.domain.repository.JobRepository;
import edu.ua.cs495.hpc_interface.domain.repository.UserRepository;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import javax.annotation.CheckForNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.log4j.Log4j2;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Log4j2
@Getter
@Service
@AllArgsConstructor(onConstructor_ = { @Autowired })
public class SSHService {

  public static final String HOSTNAME = "uahpc.ua.edu";
  public static final int PORT = 22;
  // timeout for commands, in millis
  public static final int TIMEOUT = 30000;

  public static final String SCRATCH_SCRIPT_LOCATION =
    "/scratch/cs495/hpc-interface/";

  public static final String HASH_BANG = "#!/bin/bash\n";

  public static final String QUERY_AS_USER = "ncovercash@crimson.ua.edu";

  // for consumption by jobs
  private BatchRepository batchRepository;
  private JobRepository jobRepository;
  private UserRepository userRepository;
  private OneTimeExecutor oneTimeExecutor;
  private SessionFactory sessionFactory;

  // to get worker/query user info
  private UserService userService;

  public SshClient getQueryUserClient()
    throws IOException, SshException, InvalidPassphraseException {
    return this.getClient(userService.createUserIfNotExists(QUERY_AS_USER));
  }

  public User checkSsh(User user) {
    user.setSshWorking(false);

    try {
      SshClient client = this.getClient(user);
      if (
        "test".equals(
            this.guaranteeCommand(
                client,
                "echo test",
                "Unable to run `echo` as user " + user.getUsername()
              )
              .trim()
          )
      ) {
        user.setSshWorking(true);
      }
    } catch (IOException | SshException | InvalidPassphraseException e) {
      log.info(e);
    }

    this.userRepository.save(user);
    return user;
  }

  public SshClient getClient(User user)
    throws IOException, SshException, InvalidPassphraseException {
    SshPrivateKeyFileFactory.parse(user.getPrivateKey().getBytes());
    SshKeyPair keyPair = SshKeyUtils.getPrivateKey(user.getPrivateKey(), null);

    try (
      SshClient client = new SshClient(
        HOSTNAME,
        PORT,
        user.getUsername(),
        keyPair
      )
    ) {
      if (Boolean.FALSE.equals(user.getSshWorking())) {
        this.userRepository.save(user.withSshWorking(true));
      }
      return client;
    } catch (IOException | SshException | InvalidPassphraseException e) {
      this.userRepository.save(user.withSshWorking(false));
      throw e;
    }
  }

  public void copyScript(SshClient ssh, File file)
    throws IOException, SshException {
    String fullPath = SSHService.SCRATCH_SCRIPT_LOCATION + file.getName();

    log.info("Copying {} to server", file.getName());
    ssh.putFile(file, fullPath, TIMEOUT);

    log.info("Marking {} as executable", file.getName());

    guaranteeCommand(
      ssh,
      String.format("chmod +x %s", fullPath),
      "Unable to set permissions"
    );
  }

  public int submitJobToSlurm(SshClient ssh, Job job) throws IOException {
    String command = String.format(
      "sbatch --parsable --output=%s --error=%s --comment='Batch %s job %s' --job-name=%s < %s",
      SSHService.SCRATCH_SCRIPT_LOCATION + job.getLogPath(),
      SSHService.SCRATCH_SCRIPT_LOCATION + job.getLogPath(),
      job.getBatch().getName(),
      job.getIdentifier(),
      job.getIdentifier(),
      SSHService.SCRATCH_SCRIPT_LOCATION + job.getSlurmQueueScriptPath()
    );

    int slurmId = Integer.parseInt(
      this.guaranteeCommand(ssh, command, "Unable to queue job")
    );
    log.info(
      String.format("Started job %s with Slurm ID %d", job.getId(), slurmId)
    );
    return slurmId;
  }

  @SuppressWarnings("java:S1149")
  public String guaranteeCommand(SshClient ssh, String command, String error)
    throws IOException {
    StringBuffer buffer = new StringBuffer();
    log.info("$ {}", command);
    if (ssh.executeCommandWithResult(command, buffer, TIMEOUT) != 0) {
      throw new IOException(error);
    }
    return buffer.toString();
  }

  @SuppressWarnings("java:S4042")
  public void cleanupFile(@CheckForNull File file) {
    if (file != null && file.exists() && !file.delete()) {
      log.error(
        String.format("Could not delete temporary file %s", file.getName())
      );
    }
  }

  public File createTempFileWithContents(
    String prefix,
    String suffix,
    String contents
  )
    throws IOException {
    File file = File.createTempFile(prefix, suffix);

    try (FileWriter writer = new FileWriter(file)) {
      writer.write(contents);
    }

    return file;
  }
}
