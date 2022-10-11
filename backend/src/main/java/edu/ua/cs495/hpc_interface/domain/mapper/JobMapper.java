package edu.ua.cs495.hpc_interface.domain.mapper;

import edu.ua.cs495.hpc_interface.domain.dto.JobDTO;
import edu.ua.cs495.hpc_interface.domain.dto.JobMetadataDTO;
import edu.ua.cs495.hpc_interface.domain.entity.Job;
import java.time.Instant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import org.openapitools.jackson.nullable.JsonNullable;

@Mapper(componentModel = "spring")
public interface JobMapper {
  JobMapper INSTANCE = Mappers.getMapper(JobMapper.class);

  @Mapping(
    target = "specialJobType",
    source = ".",
    qualifiedByName = "getMetadataSpecialJobType"
  )
  JobMetadataDTO toMetadataDto(Job source);

  @Mapping(
    target = "specialJobType",
    source = ".",
    qualifiedByName = "getFullSpecialJobType"
  )
  @Mapping(target = "scriptPathSlurmQueuer", source = "slurmQueueScriptPath")
  JobDTO toFullDto(Job source);

  @Named("getMetadataSpecialJobType")
  static JobMetadataDTO.SpecialJobTypeEnum getSpecialJobType(Job source) {
    if (Boolean.TRUE.equals(source.getSetupJob())) {
      return JobMetadataDTO.SpecialJobTypeEnum.SETUP;
    }
    if (Boolean.TRUE.equals(source.getCleanupJob())) {
      return JobMetadataDTO.SpecialJobTypeEnum.CLEANUP;
    }
    if (Boolean.TRUE.equals(source.getGeneratorJob())) {
      return JobMetadataDTO.SpecialJobTypeEnum.GENERATOR;
    }
    return JobMetadataDTO.SpecialJobTypeEnum.NONE;
  }

  @Named("getFullSpecialJobType")
  static JobDTO.SpecialJobTypeEnum getFullSpecialJobType(Job source) {
    if (Boolean.TRUE.equals(source.getSetupJob())) {
      return JobDTO.SpecialJobTypeEnum.SETUP;
    }
    if (Boolean.TRUE.equals(source.getCleanupJob())) {
      return JobDTO.SpecialJobTypeEnum.CLEANUP;
    }
    if (Boolean.TRUE.equals(source.getGeneratorJob())) {
      return JobDTO.SpecialJobTypeEnum.GENERATOR;
    }
    return JobDTO.SpecialJobTypeEnum.NONE;
  }

  static JsonNullable<Instant> toJsonNullableInstant(Instant source) {
    return JsonNullable.of(source);
  }

  static JsonNullable<Integer> toJsonNullableInteger(Integer source) {
    return JsonNullable.of(source);
  }
}
