package com.techwiz.techwizbe.repositories;

import com.techwiz.techwizbe.entities.modals.BrandEntity;
import com.techwiz.techwizbe.entities.modals.CategoryEntity;
import com.techwiz.techwizbe.entities.modals.TagEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<TagEntity, Long> {
    @Query("SELECT t from tags t where concat(t.tagName, t.content, t.slug, t.createdAt, t.updatedAt, t.enable) LIKE %?1% and t.enable = ?2")
    Page<TagEntity> findByKeywordAndEnable(String keyword, boolean enable, Pageable pageable);

    @Query("select t from tags t where concat(t.tagName, t.content, t.slug, t.createdAt, t.updatedAt, t.enable) like %?1%")
    Page<TagEntity> findByKeyword(String keyword, Pageable pageable);
}
