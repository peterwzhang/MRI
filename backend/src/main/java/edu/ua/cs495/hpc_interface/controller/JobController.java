package edu.ua.cs495.hpc_interface.controller;

import edu.ua.cs495.hpc_interface.domain.dto.JobDTO;
import edu.ua.cs495.hpc_interface.domain.dto.JobMetadataDTO;
import edu.ua.cs495.hpc_interface.domain.mapper.JobMapper;
import edu.ua.cs495.hpc_interface.rest.resource.JobApi;
import edu.ua.cs495.hpc_interface.service.AuthenticationService;
import edu.ua.cs495.hpc_interface.service.BatchService;
import edu.ua.cs495.hpc_interface.service.JobService;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/")
public class JobController implements JobApi {

  @Autowired
  private AuthenticationService authenticationService;

  @Autowired
  private BatchService batchService;

  @Autowired
  private JobService jobService;

  @Autowired
  private JobMapper jobMapper;

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<List<JobMetadataDTO>> getAllJobs(UUID batchId) {
    return ResponseEntity.ok(
      batchService
        .getForUserById(batchId, authenticationService.getAuthenticatedUser())
        .getJobs()
        .stream()
        .map(jobMapper::toMetadataDto)
        .toList()
    );
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<JobDTO> getJob(UUID batchId, UUID jobId) {
    return ResponseEntity.ok(
      jobMapper.toFullDto(
        jobService.getForUserByBatchAndJobId(
          batchId,
          jobId,
          authenticationService.getAuthenticatedUser()
        )
      )
    );
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<Void> cancelJob(UUID batchId, UUID jobId) {
    jobService.cancelForUserByBatchAndJobId(
      batchId,
      jobId,
      authenticationService.getAuthenticatedUser()
    );
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
