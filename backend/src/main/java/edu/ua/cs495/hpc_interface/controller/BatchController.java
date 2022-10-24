package edu.ua.cs495.hpc_interface.controller;

import edu.ua.cs495.hpc_interface.domain.dto.BatchForSubmissionDTO;
import edu.ua.cs495.hpc_interface.domain.dto.BatchMetadataWithIdDTO;
import edu.ua.cs495.hpc_interface.domain.dto.BatchWithJobsDTO;
import edu.ua.cs495.hpc_interface.domain.mapper.BatchMapper;
import edu.ua.cs495.hpc_interface.rest.resource.BatchApi;
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
public class BatchController implements BatchApi {

  @Autowired
  private AuthenticationService authenticationService;

  @Autowired
  private BatchService batchService;

  @Autowired
  private JobService jobService;

  @Autowired
  private BatchMapper batchMapper;

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<List<BatchMetadataWithIdDTO>> getAllBatches() {
    return ResponseEntity.ok(
      batchService
        .getAllForUser(authenticationService.getAuthenticatedUser())
        .stream()
        .map(batchMapper::toMetadataDtoWithId)
        .toList()
    );
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<BatchWithJobsDTO> getBatch(UUID batchId) {
    return ResponseEntity.ok(
      batchMapper.toFullDtoWithJobs(
        batchService.getForUserById(
          batchId,
          authenticationService.getAuthenticatedUser()
        )
      )
    );
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<BatchMetadataWithIdDTO> createBatch(
    BatchForSubmissionDTO batch
  ) {
    return new ResponseEntity<>(
      batchMapper.toMetadataDtoWithId(
        batchService.createFromDTO(
          batch,
          authenticationService.getAuthenticatedUser()
        )
      ),
      HttpStatus.CREATED
    );
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<Void> approve(UUID batchId, List<UUID> uuidsToApprove) {
    batchService.approveJobListForUser(
      batchId,
      uuidsToApprove
        .stream()
        .map(
          jobId ->
            this.jobService.getForUserByBatchAndJobId(
                batchId,
                jobId,
                authenticationService.getAuthenticatedUser()
              )
        )
        .toList(),
      authenticationService.getAuthenticatedUser()
    );
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  /** {@inheritDoc} */
  @Override
  public ResponseEntity<Void> cancel(UUID batchId) {
    batchService.cancelForUserById(
      batchId,
      authenticationService.getAuthenticatedUser()
    );
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
