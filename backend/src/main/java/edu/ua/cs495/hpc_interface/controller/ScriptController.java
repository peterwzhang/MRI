package edu.ua.cs495.hpc_interface.controller;

import edu.ua.cs495.hpc_interface.domain.dto.ScriptDTO;
import edu.ua.cs495.hpc_interface.domain.dto.ScriptForCreationDTO;
import edu.ua.cs495.hpc_interface.domain.dto.ScriptMetadataWithIdDTO;
import edu.ua.cs495.hpc_interface.domain.dto.ScriptWithIdDTO;
import edu.ua.cs495.hpc_interface.domain.mapper.ScriptMapper;
import edu.ua.cs495.hpc_interface.exception.NotImplementedException;
import edu.ua.cs495.hpc_interface.rest.resource.ScriptApi;
import edu.ua.cs495.hpc_interface.service.AuthenticationService;
import edu.ua.cs495.hpc_interface.service.ScriptService;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
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

  @Autowired
  private HttpServletRequest httpServletRequest;

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<List<ScriptMetadataWithIdDTO>> getAllScripts() {
    throw new NotImplementedException(httpServletRequest);
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<ScriptDTO> getScript(UUID scriptId) {
    throw new NotImplementedException(httpServletRequest);
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<ScriptWithIdDTO> createScript(
    ScriptForCreationDTO script
  ) {
    return ResponseEntity.ok(
      scriptMapper.toFullDtoWithId(
        scriptService.createFromDTO(
          script,
          authenticationService.getAuthenticatedUser()
        )
      )
    );
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<ScriptWithIdDTO> updateScript(
    UUID scriptId,
    ScriptForCreationDTO newScript
  ) {
    throw new NotImplementedException(httpServletRequest);
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<Void> archiveScript(UUID scriptId) {
    throw new NotImplementedException(httpServletRequest);
  }
}
