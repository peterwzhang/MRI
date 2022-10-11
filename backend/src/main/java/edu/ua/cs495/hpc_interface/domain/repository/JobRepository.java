package edu.ua.cs495.hpc_interface.domain.repository;

import edu.ua.cs495.hpc_interface.domain.entity.Job;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job, UUID> {
  @Query(
    "SELECT j FROM Job j " +
    "WHERE (j.slurmId != NULL AND (j.state = 'PENDING' OR j.state = 'RUNNING')) "
  )
  List<Job> findJobsToPoll();
}
