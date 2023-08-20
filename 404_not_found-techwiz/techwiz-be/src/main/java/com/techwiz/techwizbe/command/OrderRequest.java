package com.techwiz.techwizbe.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
    private Double totalAmount;
    private long userId;
    private List<OrderItemRequest> orderItemRequests;
}
