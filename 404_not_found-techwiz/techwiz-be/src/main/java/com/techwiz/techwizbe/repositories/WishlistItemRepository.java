package com.techwiz.techwizbe.repositories;

import com.techwiz.techwizbe.entities.modals.WishlistItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WishlistItemRepository extends JpaRepository<WishlistItemEntity, Long> {
    Optional<WishlistItemEntity> findByWishlistIdAndProductId(long wishlistId, long productId);
}
