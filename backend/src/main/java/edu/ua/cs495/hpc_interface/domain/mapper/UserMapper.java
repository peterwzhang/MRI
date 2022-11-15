package edu.ua.cs495.hpc_interface.domain.mapper;

import edu.ua.cs495.hpc_interface.domain.dto.UserDTO;
import edu.ua.cs495.hpc_interface.domain.dto.UserWithKeyDTO;
import edu.ua.cs495.hpc_interface.domain.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {
  UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

  UserDTO toDto(User source);

  @Mapping(target = "privateKey", ignore = true)
  @Mapping(target = "publicKey", ignore = true)
  @Mapping(target = "sshWorking", ignore = true)
  User fromDto(UserDTO source);

  UserWithKeyDTO toDtoWithKey(User source);
}
