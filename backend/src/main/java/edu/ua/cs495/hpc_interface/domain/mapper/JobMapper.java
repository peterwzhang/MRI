package edu.ua.cs495.hpc_interface.domain.mapper;

import edu.ua.cs495.hpc_interface.domain.dto.JobDTO;
import edu.ua.cs495.hpc_interface.domain.dto.JobMetadataDTO;
import edu.ua.cs495.hpc_interface.domain.entity.Job;
import edu.ua.cs495.hpc_interface.service.SSHService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

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
  @Mapping(
    target = "logPath",
    source = "logPath",
    qualifiedByName = "prefixPath"
  )
  @Mapping(
    target = "scriptPath",
    source = "scriptPath",
    qualifiedByName = "prefixPath"
  )
  @Mapping(
    target = "scriptPathSlurmQueuer",
    source = "slurmQueueScriptPath",
    qualifiedByName = "prefixPath"
  )
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

  @Named("prefixPath")
  static String prefixPath(String src) {
    return SSHService.SCRATCH_SCRIPT_LOCATION + src;
  }
}
