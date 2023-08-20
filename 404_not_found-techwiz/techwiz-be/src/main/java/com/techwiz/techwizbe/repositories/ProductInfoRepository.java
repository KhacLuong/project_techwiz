package com.techwiz.techwizbe.repositories;

import com.techwiz.techwizbe.entities.enums.Color;
import com.techwiz.techwizbe.entities.enums.Size;
import com.techwiz.techwizbe.entities.modals.ProductEntity;
import com.techwiz.techwizbe.entities.modals.ProductInfoEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductInfoRepository extends JpaRepository<ProductInfoEntity, Long> {
    ProductInfoEntity findByIdAndProductId(long id, long productId);

    @Query("SELECT pi " +
            "FROM product_infos pi " +
            "WHERE (pi.color IN :colors)")
    Optional<ProductInfoEntity> findAllByColor(@Param("colors")List<Color> colors);


    @Query("SELECT pi " +
            "FROM product_infos pi " +
            "JOIN pi.product p " +
            "WHERE pi.color IN :colors AND pi.size in :sizes " +
            "AND (CONCAT(p.productName, p.productCode, p.content) LIKE %:keyword%)")
     Page<ProductInfoEntity> searchAndFilter(@Param("keyword") String keyword, @Param("colors") List<Color> colors, @Param("sizes") List<Size> sizes, Pageable pageable);


}
