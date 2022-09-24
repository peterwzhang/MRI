package edu.ua.cs495.hpc_interface.domain.mapper;

import edu.ua.cs495.hpc_interface.domain.dto.ScriptDTO;
import edu.ua.cs495.hpc_interface.domain.dto.ScriptMetadataDTO;
import edu.ua.cs495.hpc_interface.domain.dto.ScriptMetadataWithIdDTO;
import edu.ua.cs495.hpc_interface.domain.dto.ScriptWithIdDTO;
import edu.ua.cs495.hpc_interface.domain.entity.Script;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ScriptMapper {
  ScriptMapper INSTANCE = Mappers.getMapper(ScriptMapper.class);

  ScriptDTO toFullDtoWithoutId(Script source);
  ScriptMetadataDTO toMetadataDtoWithoutId(Script source);
  ScriptMetadataWithIdDTO toMetadataDtoWithId(Script source);
  ScriptWithIdDTO toFullDtoWithId(Script source);

  @Mapping(target = "user.privateKey", ignore = true)
  @Mapping(target = "user.publicKey", ignore = true)
  Script fromDtoWithoutId(ScriptDTO source);

  @Mapping(target = "user.privateKey", ignore = true)
  @Mapping(target = "user.publicKey", ignore = true)
  Script fromDtoWithId(ScriptWithIdDTO source);
}
