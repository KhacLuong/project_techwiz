package com.techwiz.techwizbe.services.interfaces;

import com.techwiz.techwizbe.command.OrderRequest;
import com.techwiz.techwizbe.dto.ResponseDto;

public interface IOrderService {
    ResponseDto<?> getListOrder(int pageNumber, int perPage, String sortField, String sortDir);
    ResponseDto<?> getOrderById(long id);
    ResponseDto<?> getOrderByUserId(long userId);
    ResponseDto<?> createNewOrder(OrderRequest request);
    ResponseDto<?> paidOrder(long orderId);
}
