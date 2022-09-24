package edu.ua.cs495.hpc_interface.domain.mapper;

import edu.ua.cs495.hpc_interface.domain.dto.UserDTO;
import edu.ua.cs495.hpc_interface.domain.dto.UserWithKeyDTO;
import edu.ua.cs495.hpc_interface.domain.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {
  UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

  UserDTO toDto(User source);

  @Mapping(target = "privateKey", ignore = true)
  @Mapping(target = "publicKey", ignore = true)
  User fromDto(UserDTO source);

  @Mapping(
    source = "publicKey",
    target = "publicKey",
    qualifiedByName = "convertPublicKeyToString"
  )
  UserWithKeyDTO toDtoWithKey(User source);

  @Named("convertPublicKeyToString")
  default String convertPublicKeyToString(byte[] publicKey) {
    // TODO: implement this
    return "TODO";
  }
}
