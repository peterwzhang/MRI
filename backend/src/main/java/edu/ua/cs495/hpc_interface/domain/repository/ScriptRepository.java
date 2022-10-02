package edu.ua.cs495.hpc_interface.domain.repository;

import edu.ua.cs495.hpc_interface.domain.entity.Script;
import edu.ua.cs495.hpc_interface.domain.entity.User;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ScriptRepository extends JpaRepository<Script, UUID> {
  @Query(
    "SELECT s FROM Script s " +
    "WHERE (s.user = :user AND (:includeArchived = TRUE OR s.archived = FALSE)) OR " +
    "(s.globalTemplate = TRUE AND s.archived = FALSE)"
  )
  List<Script> findGlobalAndUserOwnedScripts(
    @Param("user") User user,
    @Param("includeArchived") Boolean includeArchived
  );
}
