package edu.ua.cs495.hpc_interface.service;

import edu.ua.cs495.hpc_interface.domain.dto.ScriptForCreationDTO;
import edu.ua.cs495.hpc_interface.domain.entity.Script;
import edu.ua.cs495.hpc_interface.domain.entity.User;
import edu.ua.cs495.hpc_interface.domain.mapper.ScriptMapper;
import edu.ua.cs495.hpc_interface.domain.repository.ScriptRepository;
import edu.ua.cs495.hpc_interface.exception.NotFoundException;
import edu.ua.cs495.hpc_interface.exception.UnauthorizedException;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor(onConstructor_ = { @Autowired })
public class ScriptService {

  private ScriptRepository scriptRepository;
  private ScriptMapper scriptMapper;

  public Script createFromDTO(
    ScriptForCreationDTO source,
    @NotNull User creator
  ) {
    return scriptRepository.save(
      scriptMapper
        .fromCreationDto(source)
        .toBuilder()
        .user(creator)
        .createdAt(Instant.now())
        .updatedAt(Instant.now())
        .archived(false)
        .build()
    );
  }

  public Script updateFromDTO(
    Script originalScript,
    ScriptForCreationDTO source,
    @NotNull User user
  ) {
    if (
      (
        !originalScript.getUser().equals(user) &&
        Boolean.FALSE.equals(user.getAdmin())
      ) ||
      Boolean.TRUE.equals(originalScript.getArchived())
    ) {
      throw new UnauthorizedException();
    }

    return scriptRepository.save(
      scriptMapper
        .fromCreationDto(source)
        .toBuilder()
        .id(originalScript.getId())
        .user(user)
        .createdAt(originalScript.getCreatedAt())
        .updatedAt(Instant.now())
        .archived(false)
        .build()
    );
  }

  public Script getForUserById(UUID scriptId, @NotNull User authenticatedUser) {
    Optional<Script> dbResult = scriptRepository.findById(scriptId);

    if (dbResult.isEmpty()) {
      throw new NotFoundException();
    }

    Script script = dbResult.get();

    if (
      Boolean.FALSE.equals(script.getGlobalTemplate()) &&
      !script.getUser().equals(authenticatedUser) &&
      Boolean.FALSE.equals(authenticatedUser.getAdmin())
    ) {
      throw new UnauthorizedException();
    }

    return script;
  }

  public void archiveScript(UUID scriptId, User authenticatedUser) {
    Script script = getForUserById(scriptId, authenticatedUser);

    // only the owner may delete the script
    if (!script.getUser().equals(authenticatedUser)) {
      throw new UnauthorizedException();
    }

    scriptRepository.save(
      script.withArchived(true).withUpdatedAt(Instant.now())
    );
  }

  public List<Script> getAllForUser(User user, boolean includeArchived) {
    return scriptRepository.findGlobalAndUserOwnedScripts(
      user,
      includeArchived
    );
  }
}
