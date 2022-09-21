package edu.ua.cs495.hpc_interface.controller;

import edu.ua.cs495.hpc_interface.domain.dto.JobDTO;
import edu.ua.cs495.hpc_interface.exception.NotImplementedException;
import edu.ua.cs495.hpc_interface.rest.resource.JobApi;
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
public class JobController implements JobApi {

  @Autowired
  private HttpServletRequest httpServletRequest;

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<JobDTO> getJob(UUID batchId, UUID jobId) {
    throw new NotImplementedException(httpServletRequest);
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<Void> cancelJob(UUID batchId, UUID jobId) {
    throw new NotImplementedException(httpServletRequest);
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<Void> refreshJob(UUID batchId, UUID jobId) {
    throw new NotImplementedException(httpServletRequest);
  }
}
