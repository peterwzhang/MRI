package edu.ua.cs495.hpc_interface.controller;

import edu.ua.cs495.hpc_interface.domain.dto.ScriptDTO;
import edu.ua.cs495.hpc_interface.domain.dto.ScriptMetadataWithIdDTO;
import edu.ua.cs495.hpc_interface.domain.dto.ScriptWithIdDTO;
import edu.ua.cs495.hpc_interface.exception.NotImplementedException;
import edu.ua.cs495.hpc_interface.rest.resource.ScriptApi;
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
  public ResponseEntity<ScriptWithIdDTO> createScript(ScriptDTO script) {
    throw new NotImplementedException(httpServletRequest);
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<ScriptDTO> updateScript(
    UUID scriptId,
    ScriptDTO newScript
  ) {
    throw new NotImplementedException(httpServletRequest);
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<Void> archiveScript(UUID scriptId) {
    throw new NotImplementedException(httpServletRequest);
  }
}
