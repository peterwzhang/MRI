package edu.ua.cs495.hpc_interface.service;

import edu.ua.cs495.hpc_interface.domain.repository.BatchRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Getter
@Service
@AllArgsConstructor(onConstructor_ = { @Autowired })
public class SSHService {

  // for consumption by jobs
  private BatchRepository batchRepository;
}
