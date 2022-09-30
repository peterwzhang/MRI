package edu.ua.cs495.hpc_interface.service;

import edu.ua.cs495.hpc_interface.domain.dto.ScriptForCreationDTO;
import edu.ua.cs495.hpc_interface.domain.entity.Script;
import edu.ua.cs495.hpc_interface.domain.entity.User;
import edu.ua.cs495.hpc_interface.domain.mapper.ScriptMapper;
import edu.ua.cs495.hpc_interface.domain.repository.ScriptRepository;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@AllArgsConstructor(onConstructor_ = { @Autowired })
public class ScriptService {

  private ScriptRepository repository;
  private ScriptMapper scriptMapper;

  public Script createFromDTO(ScriptForCreationDTO source, User creator) {
    return repository.save(
      scriptMapper
        .fromCreationDto(source)
        .toBuilder()
        .user(creator)
        .createdAt(Instant.now())
        .updatedAt(Instant.now())
        .globalTemplate(false)
        .archived(false)
        .build()
    );
  }
}
