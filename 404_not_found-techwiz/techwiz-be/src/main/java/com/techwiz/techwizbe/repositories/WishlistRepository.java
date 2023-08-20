package com.techwiz.techwizbe.repositories;

import com.techwiz.techwizbe.entities.modals.WishListEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface WishlistRepository extends JpaRepository<WishListEntity, Long> {
    @Query("SELECT wl from wishlists wl where wl.userId like %?1%")
    Page<WishListEntity> findByUserId(long userId, Pageable pageable);
    Optional<WishListEntity> findByUserId(long userId);
    Optional<WishListEntity> getByUserId(long userId);
}
