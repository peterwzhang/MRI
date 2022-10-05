package edu.ua.cs495.hpc_interface.domain.repository;

import edu.ua.cs495.hpc_interface.domain.entity.Batch;
import java.util.UUID;
import org.springframework.stereotype.Repository;

@Repository
public interface BatchRepository extends RefreshableRepository<Batch, UUID> {}
