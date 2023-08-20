package com.techwiz.techwizbe.repositories;

import com.techwiz.techwizbe.entities.modals.OrderItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItemEntity, Long> {
}
