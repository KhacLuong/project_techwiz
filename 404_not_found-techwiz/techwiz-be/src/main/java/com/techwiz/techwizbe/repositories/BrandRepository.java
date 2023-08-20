package com.techwiz.techwizbe.repositories;

import com.techwiz.techwizbe.entities.modals.BrandEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BrandRepository extends JpaRepository<BrandEntity, Long> {
    @Query("select b from brands b where concat(b.brandName, b.brandCode, b.createdAt, b.updatedAt, b.enable) like %?1% and b.enable = ?2")
    Page<BrandEntity> findByKeywordAndEnable(String keyword, boolean enable, Pageable pageable);

    // find keyword
    @Query("select b from brands b where concat(b.brandName, b.brandCode, b.createdAt, b.updatedAt, b.enable) like %?1%")
    Page<BrandEntity> findByKeyword(String keyword, Pageable pageable);

    List<BrandEntity> findAllByEnableIsTrue();
}
