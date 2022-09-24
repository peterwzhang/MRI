package edu.ua.cs495.hpc_interface.domain.repository;

import edu.ua.cs495.hpc_interface.domain.entity.Script;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScriptRepository extends JpaRepository<Script, UUID> {}
