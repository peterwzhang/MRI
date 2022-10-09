package edu.ua.cs495.hpc_interface.domain.repository;

import java.io.Serializable;
import javax.persistence.EntityManager;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.transaction.annotation.Transactional;

public class RefreshableRepositoryImpl<T, I extends Serializable>
  extends SimpleJpaRepository<T, I>
  implements RefreshableRepository<T, I> {

  private final EntityManager entityManager;

  public RefreshableRepositoryImpl(
    JpaEntityInformation<T, I> entityInformation,
    EntityManager entityManager
  ) {
    super(entityInformation, entityManager);
    this.entityManager = entityManager;
  }

  @Override
  @Transactional
  public void refresh(T t) {
    entityManager.refresh(t);
  }
}
