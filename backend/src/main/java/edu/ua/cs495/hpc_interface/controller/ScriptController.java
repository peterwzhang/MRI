package edu.ua.cs495.hpc_interface.controller;

import edu.ua.cs495.hpc_interface.domain.dto.ScriptForCreationDTO;
import edu.ua.cs495.hpc_interface.domain.dto.ScriptMetadataWithIdDTO;
import edu.ua.cs495.hpc_interface.domain.dto.ScriptWithIdDTO;
import edu.ua.cs495.hpc_interface.domain.entity.Script;
import edu.ua.cs495.hpc_interface.domain.mapper.ScriptMapper;
import edu.ua.cs495.hpc_interface.exception.NotFoundException;
import edu.ua.cs495.hpc_interface.rest.resource.ScriptApi;
import edu.ua.cs495.hpc_interface.service.AuthenticationService;
import edu.ua.cs495.hpc_interface.service.ScriptService;
import java.util.List;
import java.util.UUID;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequestMapping(value = "/")
public class ScriptController implements ScriptApi {

  @Autowired
  private AuthenticationService authenticationService;

  @Autowired
  private ScriptService scriptService;

  @Autowired
  private ScriptMapper scriptMapper;

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<List<ScriptMetadataWithIdDTO>> getAllScripts(
    Boolean includeArchived
  ) {
    return ResponseEntity.ok(
      scriptService
        .getAllForUser(
          authenticationService.getAuthenticatedUser(),
          Boolean.TRUE.equals(includeArchived)
        )
        .stream()
        .map(scriptMapper::toMetadataDtoWithId)
        .toList()
    );
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<ScriptWithIdDTO> getScript(UUID scriptId) {
    return ResponseEntity.ok(
      scriptMapper.toFullDtoWithId(
        scriptService.getForUserById(
          scriptId,
          authenticationService.getAuthenticatedUser()
        )
      )
    );
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<ScriptWithIdDTO> createScript(
    ScriptForCreationDTO script
  ) {
    return new ResponseEntity<>(
      scriptMapper.toFullDtoWithId(
        scriptService.createFromDTO(
          script,
          authenticationService.getAuthenticatedUser()
        )
      ),
      HttpStatus.CREATED
    );
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<ScriptWithIdDTO> updateScript(
    UUID scriptId,
    ScriptForCreationDTO newScript
  ) {
    try {
      Script currentScript = scriptService.getForUserById(
        scriptId,
        authenticationService.getAuthenticatedUser()
      );
      return ResponseEntity.ok(
        scriptMapper.toFullDtoWithId(
          scriptService.updateFromDTO(
            currentScript,
            newScript,
            authenticationService.getAuthenticatedUser()
          )
        )
      );
    } catch (NotFoundException e) {
      log.debug(
        String.format("Script %s did not exist for update - creating", scriptId)
      );
      log.debug(e);
      return new ResponseEntity<>(
        scriptMapper.toFullDtoWithId(
          scriptService.createFromDTO(
            newScript,
            authenticationService.getAuthenticatedUser()
          )
        ),
        HttpStatus.CREATED
      );
    }
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<Void> archiveScript(UUID scriptId) {
    scriptService.archiveScript(
      scriptId,
      authenticationService.getAuthenticatedUser()
    );
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
