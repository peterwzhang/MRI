package edu.ua.cs495.hpc_interface.domain.mapper;

import edu.ua.cs495.hpc_interface.domain.dto.UserDTO;
import edu.ua.cs495.hpc_interface.domain.dto.UserWithKeyDTO;
import edu.ua.cs495.hpc_interface.domain.entity.User;
import java.util.Base64;
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
  static String convertPublicKeyToString(byte[] publicKey) {
    StringBuilder builder = new StringBuilder();

    builder.append("-----BEGIN RSA PUBLIC KEY-----\n");
    builder.append(Base64.getEncoder().encodeToString(publicKey));
    builder.append("\n-----END RSA PUBLIC KEY-----\n");

    return builder.toString();
  }
}
