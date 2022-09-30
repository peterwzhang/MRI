package edu.ua.cs495.hpc_interface.domain.mapper;

import edu.ua.cs495.hpc_interface.domain.dto.ScriptDTO;
import edu.ua.cs495.hpc_interface.domain.dto.ScriptForCreationDTO;
import edu.ua.cs495.hpc_interface.domain.dto.ScriptMetadataDTO;
import edu.ua.cs495.hpc_interface.domain.dto.ScriptMetadataWithIdDTO;
import edu.ua.cs495.hpc_interface.domain.dto.ScriptWithIdDTO;
import edu.ua.cs495.hpc_interface.domain.entity.Script;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = { UserMapper.class })
public interface ScriptMapper {
  ScriptMapper INSTANCE = Mappers.getMapper(ScriptMapper.class);

  ScriptDTO toFullDtoWithoutId(Script source);
  ScriptMetadataDTO toMetadataDtoWithoutId(Script source);
  ScriptMetadataWithIdDTO toMetadataDtoWithId(Script source);
  ScriptWithIdDTO toFullDtoWithId(Script source);

  Script fromFullDtoWithoutId(ScriptDTO source);
  Script fromFullDtoWithId(ScriptWithIdDTO source);

  Script fromCreationDto(ScriptForCreationDTO source);

  @Mapping(target = "cleanupMode", ignore = true)
  @Mapping(target = "cleanupScript", ignore = true)
  @Mapping(target = "cleanupSlurmConfig", ignore = true)
  @Mapping(target = "header", ignore = true)
  @Mapping(target = "idVariable", ignore = true)
  @Mapping(target = "jobTemplate", ignore = true)
  @Mapping(target = "loopWrapperBottom", ignore = true)
  @Mapping(target = "loopWrapperTop", ignore = true)
  @Mapping(target = "setupScript", ignore = true)
  @Mapping(target = "setupScriptSlurmConfig", ignore = true)
  @Mapping(target = "slurmTemplate", ignore = true)
  Script fromMetadataDtoWithoutId(ScriptMetadataDTO source);

  @Mapping(target = "cleanupMode", ignore = true)
  @Mapping(target = "cleanupScript", ignore = true)
  @Mapping(target = "cleanupSlurmConfig", ignore = true)
  @Mapping(target = "header", ignore = true)
  @Mapping(target = "idVariable", ignore = true)
  @Mapping(target = "jobTemplate", ignore = true)
  @Mapping(target = "loopWrapperBottom", ignore = true)
  @Mapping(target = "loopWrapperTop", ignore = true)
  @Mapping(target = "setupScript", ignore = true)
  @Mapping(target = "setupScriptSlurmConfig", ignore = true)
  @Mapping(target = "slurmTemplate", ignore = true)
  Script fromMetadataDtoWithId(ScriptMetadataWithIdDTO source);
}
