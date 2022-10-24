package edu.ua.cs495.hpc_interface.domain.repository;

import edu.ua.cs495.hpc_interface.domain.entity.Batch;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BatchRepository extends RefreshableRepository<Batch, UUID> {
  @Query(
    "SELECT b FROM Batch b " +
    "WHERE (b.status != 'FAILED' AND b.status != 'CANCELLED') "
  )
  List<Batch> findBatchesToPoll();
}
