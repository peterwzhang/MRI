package edu.ua.cs495.hpc_interface.domain.mapper;

import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.KeyPair;
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

  UserWithKeyDTO toDtoWithKey(User source);
}
