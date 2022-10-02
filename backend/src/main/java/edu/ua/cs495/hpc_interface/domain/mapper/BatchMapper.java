package edu.ua.cs495.hpc_interface.domain.mapper;

import edu.ua.cs495.hpc_interface.domain.dto.BatchForSubmissionDTO;
import edu.ua.cs495.hpc_interface.domain.dto.BatchMetadataStatusSummaryDTO;
import edu.ua.cs495.hpc_interface.domain.dto.BatchMetadataWithIdDTO;
import edu.ua.cs495.hpc_interface.domain.dto.BatchWithJobsDTO;
import edu.ua.cs495.hpc_interface.domain.entity.Batch;
import edu.ua.cs495.hpc_interface.domain.entity.Job;
import edu.ua.cs495.hpc_interface.domain.types.JobState;
import java.time.Instant;
import java.util.Collection;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper(
  componentModel = "spring",
  uses = { JobMapper.class, UserMapper.class, ScriptMapper.class }
)
public interface BatchMapper {
  BatchMapper INSTANCE = Mappers.getMapper(BatchMapper.class);

  @Mapping(target = "requiresApprovalStep", source = "needsApproval")
  @Mapping(
    target = "statusSummary",
    source = "jobs",
    qualifiedByName = "getStatusSummaryFromJobs"
  )
  @Mapping(
    target = "lastSynced",
    source = "jobs",
    qualifiedByName = "getLastSyncFromJobs"
  )
  BatchMetadataWithIdDTO toMetadataDtoWithId(Batch source);

  @Mapping(target = "requiresApprovalStep", source = "needsApproval")
  @Mapping(
    target = "statusSummary",
    source = "jobs",
    qualifiedByName = "getStatusSummaryFromJobs"
  )
  @Mapping(
    target = "lastSynced",
    source = "jobs",
    qualifiedByName = "getLastSyncFromJobs"
  )
  // not sure why it thinks this property exists...
  @Mapping(target = "job", ignore = true)
  BatchWithJobsDTO toFullDtoWithJobs(Batch source);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "status", ignore = true)
  @Mapping(target = "user", ignore = true)
  @Mapping(target = "startedAt", ignore = true)
  @Mapping(target = "scriptUsed", source = "script")
  @Mapping(target = "needsApproval", source = "requiresApprovalStep")
  @Mapping(target = "jobs", ignore = true)
  // not sure why it thinks this property exists...
  @Mapping(target = "job", ignore = true)
  Batch fromSubmissionDto(BatchForSubmissionDTO source);

  @Named("getStatusSummaryFromJobs")
  static BatchMetadataStatusSummaryDTO getStatusSummaryFromJobs(
    Collection<Job> jobs
  ) {
    return BatchMetadataStatusSummaryDTO
      .builder()
      .waiting(
        (int) jobs
          .stream()
          .map(Job::getState)
          .filter(JobState::isWaiting)
          .count()
      )
      .running(
        (int) jobs
          .stream()
          .map(Job::getState)
          .filter(JobState::isRunning)
          .count()
      )
      .success(
        (int) jobs
          .stream()
          .map(Job::getState)
          .filter(JobState::isCompleted)
          .count()
      )
      .failed(
        (int) jobs
          .stream()
          .map(Job::getState)
          .filter(JobState::isFailed)
          .count()
      )
      .build();
  }

  @Named("getLastSyncFromJobs")
  static Instant getLastSyncFromJobs(Collection<Job> jobs) {
    return jobs
      .stream()
      .map(Job::getLastSync)
      .min(Instant::compareTo)
      .orElse(Instant.now());
  }
}
