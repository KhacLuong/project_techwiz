package com.techwiz.techwizbe.repositories;

import com.techwiz.techwizbe.entities.modals.CategoryEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    @Query("SELECT c from categories c where concat(c.categoryCode, c.categoryName, c.createdAt, c.updatedAt, c.enable) LIKE %?1% and c.parentId = ?2")
    Page<CategoryEntity> findByKeywordAndParentId(String keyword, long parentId, Pageable pageable);

    @Query("SELECT c from categories c where concat(c.categoryCode, c.categoryName, c.createdAt, c.updatedAt, c.enable) LIKE %?1% and c.enable = ?2")
    Page<CategoryEntity> findByKeywordAndEnable(String keyword, boolean enable, Pageable pageable);

    @Query("SELECT c from categories c where concat(c.categoryCode, c.categoryName, c.createdAt, c.updatedAt, c.enable) LIKE %?1% and c.parentId = ?2 and c.enable = ?3")
    Page<CategoryEntity> findByKeywordAndParentIdAndEnable(String keyword, long parentId, boolean enable, Pageable pageable);

    @Query("SELECT c from categories c where concat(c.categoryCode, c.categoryName, c.createdAt, c.updatedAt, c.enable) LIKE %?1%")
    Page<CategoryEntity> findByKeyword(String keyword, Pageable pageable);

    @Query("SELECT c FROM categories c WHERE c.categoryName = :categoryName AND c.id <> :id")
    List<CategoryEntity> findAllByNameAndIdNot(@Param("categoryName") String categoryName, @Param("id") long id);

    @Query("SELECT c from categories c where c.parentId = 0 and c.enable = true")
    List<CategoryEntity> findCategoryEntitiesByParentIdIsNullAndEnableIsTrue();

    List<CategoryEntity> findCategoryEntitiesByParentId(long parentId);
}
