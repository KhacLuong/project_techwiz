package com.techwiz.techwizbe.services.impls;

import com.techwiz.techwizbe.command.OrderItemRequest;
import com.techwiz.techwizbe.command.OrderRequest;
import com.techwiz.techwizbe.configs.ResponseConfig;
import com.techwiz.techwizbe.dto.ResponseDto;
import com.techwiz.techwizbe.entities.modals.OrderEntity;
import com.techwiz.techwizbe.entities.modals.OrderItemEntity;
import com.techwiz.techwizbe.repositories.OrderItemRepository;
import com.techwiz.techwizbe.repositories.OrderRepository;
import com.techwiz.techwizbe.repositories.UserRepository;
import com.techwiz.techwizbe.services.interfaces.IEmailService;
import com.techwiz.techwizbe.services.interfaces.IOrderService;
import com.techwiz.techwizbe.utils.Helper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderImplService implements IOrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final IEmailService eMailService;
    private final UserRepository userRepository;

    @Override
    public ResponseDto<?> getListOrder(int pageNumber, int perPage, String sortField, String sortDir) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var page = orderRepository.findAll(pageable);
        long totalItems = page.getTotalElements();
        int totalPages = page.getTotalPages();
        return ResponseConfig.ok(
                page.getContent(),
                "Get list orders successfully.",
                pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDto<?> getOrderById(long id) {
        var data = orderRepository.findById(id);
        if (data.isPresent()) {
            return ResponseConfig.ok(data.get(), "Get order by id successfully.");
        }
        return ResponseConfig.notFound("Not found order by id.");
    }

    @Override
    public ResponseDto<?> getOrderByUserId(long userId) {
        var data = orderRepository.findByUserId(userId);
        if (data.isPresent()) {
            return ResponseConfig.ok(data.get(), "Get list of orders by user successfully.");
        }
        return ResponseConfig.notFound("Not found any orders by user.");
    }

    @Override
    public ResponseDto<?> createNewOrder(OrderRequest orderRequest) {
        var order = OrderEntity.builder()
                .userId(orderRequest.getUserId())
                .totalAmount(orderRequest.getTotalAmount())
                .createdAt(new Date())
                .build();
        var savedOrder = orderRepository.save(order);
        for (OrderItemRequest orderItemRequest: orderRequest.getOrderItemRequests()) {
            var orderItem = OrderItemEntity.builder()
                    .orderId(savedOrder.getId())
                    .productId(orderItemRequest.getProductId())
                    .unitPrice(orderItemRequest.getUnitPrice())
                    .createdAt(new Date())
                    .build();
            orderItemRepository.save(orderItem);
        }
        var user = userRepository.findById(orderRequest.getUserId()).orElseThrow();
        eMailService.sendSimpleMessage(
                user.getEmail(),
                "Confirm Order",
                "Click this link:\n" +
                        "https://plantnest-404notfound.azurewebsites.net/api/v1/order/users/" + savedOrder.getUserId()
        );
        return ResponseConfig.created(null, "Create order successfully.");
    }

    @Override
    public ResponseDto<?> paidOrder(long orderId) {
        var data = orderRepository.findById(orderId);
        if (data.isEmpty()){
            return ResponseConfig.notFound("Not found order");
        }
        var order = data.get();
        order.setPaid(true);
        orderRepository.save(order);
        return ResponseConfig.ok(null, "Order has been paid successfully.");
    }


}
