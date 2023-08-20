package com.techwiz.techwizbe.repositories;

import com.techwiz.techwizbe.entities.modals.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    Optional<OrderEntity> findByUserId(long userId);
}
