package edu.ua.cs495.hpc_interface.controller;

import edu.ua.cs495.hpc_interface.domain.dto.JobDTO;
import edu.ua.cs495.hpc_interface.domain.dto.JobMetadataDTO;
import edu.ua.cs495.hpc_interface.domain.mapper.JobMapper;
import edu.ua.cs495.hpc_interface.exception.NotImplementedException;
import edu.ua.cs495.hpc_interface.rest.resource.JobApi;
import edu.ua.cs495.hpc_interface.service.AuthenticationService;
import edu.ua.cs495.hpc_interface.service.BatchService;
import edu.ua.cs495.hpc_interface.service.JobService;
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
public class JobController implements JobApi {

  @Autowired
  private AuthenticationService authenticationService;

  @Autowired
  private BatchService batchService;

  @Autowired
  private JobService jobService;

  @Autowired
  private JobMapper jobMapper;

  @Autowired
  private HttpServletRequest httpServletRequest;

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
    throw new NotImplementedException(httpServletRequest);
  }
}
