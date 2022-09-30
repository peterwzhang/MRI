package edu.ua.cs495.hpc_interface.controller;

import edu.ua.cs495.hpc_interface.domain.dto.BatchForSubmissionDTO;
import edu.ua.cs495.hpc_interface.domain.dto.BatchMetadataWithIdDTO;
import edu.ua.cs495.hpc_interface.domain.dto.BatchWithJobsDTO;
import edu.ua.cs495.hpc_interface.domain.dto.JobMetadataDTO;
import edu.ua.cs495.hpc_interface.exception.NotImplementedException;
import edu.ua.cs495.hpc_interface.rest.resource.BatchApi;
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
public class BatchController implements BatchApi {

  @Autowired
  private HttpServletRequest httpServletRequest;

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<List<BatchMetadataWithIdDTO>> getAllBatches() {
    throw new NotImplementedException(httpServletRequest);
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<BatchWithJobsDTO> getBatch(UUID batchId) {
    throw new NotImplementedException(httpServletRequest);
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<List<JobMetadataDTO>> getAllJobs(UUID batchId) {
    throw new NotImplementedException(httpServletRequest);
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<BatchMetadataWithIdDTO> createBatch(
    BatchForSubmissionDTO batch
  ) {
    throw new NotImplementedException(httpServletRequest);
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<Void> approve(UUID batchId, List<UUID> uuidsToApprove) {
    throw new NotImplementedException(httpServletRequest);
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<Void> cancel(UUID batchId) {
    throw new NotImplementedException(httpServletRequest);
  }
}
