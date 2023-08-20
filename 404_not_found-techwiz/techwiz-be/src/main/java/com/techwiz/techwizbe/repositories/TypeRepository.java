package com.techwiz.techwizbe.repositories;

import com.techwiz.techwizbe.entities.modals.BrandEntity;
import com.techwiz.techwizbe.entities.modals.TypeEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TypeRepository extends JpaRepository<TypeEntity, Long> {
    @Query("select t from types t where concat(t.typeName, t.createdAt, t.updatedAt, t.enable) like %?1% and t.enable = ?2")
    Page<TypeEntity> findByKeywordAndEnable(String keyword, boolean enable, Pageable pageable);

    // find keyword
    @Query("select t from types t where concat(t.typeName, t.createdAt, t.updatedAt, t.enable) like %?1%")
    Page<TypeEntity> findByKeyword(String keyword, Pageable pageable);

    List<TypeEntity> findAllByEnableIsTrue();

}
