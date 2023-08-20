package com.techwiz.techwizbe.repositories;

import com.techwiz.techwizbe.dto.ProductDetailDto;
import com.techwiz.techwizbe.dto.ProductDto;
import com.techwiz.techwizbe.entities.enums.Color;
import com.techwiz.techwizbe.entities.enums.Size;
import com.techwiz.techwizbe.entities.modals.ProductEntity;
import com.techwiz.techwizbe.entities.modals.ProductInfoEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.techwiz.techwizbe.entities.modals.TagEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    void deleteAllByCategoryId(long categoryId);

    void deleteAllByBrandId(long brandId);
    void deleteAllByProductTypeId(long brandId);

    @Query("SELECT p FROM products p JOIN p.tags t WHERE t = :tag")
    List<ProductEntity> findProductEntitiesByTags(@Param("tag") TagEntity tag);


    @Query("SELECT COUNT(p) FROM products p WHERE p.categoryId IN :categoryIds")
    int countProductsByCategoryIds(@Param("categoryIds") List<Long> categoryIds);

    int countProductsByCategoryId(long categoryId);

    int countProductEntitiesByBrandId(long brandId);



    @Query("SELECT p " +
            "FROM products p " +
            "JOIN product_infos pi on pi.product.id = p.id " +
            "where (concat(p.productName, p.productCode, p.sku, p.summary) LIKE %:keyword% " +
            "and (pi.price <= :priceMax and pi.price>= :priceMin) " +
            "and (:colorSize = 0 or pi.color in :colors) and (:sizeSize = 0 or pi.size in :sizes) and (:enable is null or p.enable = :enable) and (:hot is null or p.hot = :hot) and (:categorySize = 0 or p.categoryId in  :categoryIds) and (:branchSize = 0 or p.brandId in  :branchIds) and (:typeSize = 0 or p.productTypeId in  :typeId))")
    Page<ProductEntity> searchAndFilter(@Param("keyword") String keyword,
                                        @Param("colors") List<Color> colors,
                                        @Param("colorSize") int colorSize,
                                        @Param("sizes") List<Size> sizes,
                                        @Param("sizeSize") int sizeSize,
                                        @Param("categoryIds") Long[] categoryIds,
                                        @Param("categorySize") int categorySize,
                                        @Param("branchIds") Long[] branchIds,
                                        @Param("branchSize") int branchSize,
                                        @Param("typeId") Long[] typeId,
                                        @Param("typeSize") int typeSize,
                                        @Param("enable") Boolean enable,
                                        @Param("hot") Boolean hot,
                                        @Param("priceMax") double priceMax,
                                        @Param("priceMin") double priceMin,
                                        Pageable pageable);
    int countProductEntitiesByProductTypeId(long typeId);

}


