package edu.ua.cs495.hpc_interface.domain.repository;

import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface RefreshableRepository<T, I extends Serializable>
  extends JpaRepository<T, I> {
  void refresh(T t);
}
