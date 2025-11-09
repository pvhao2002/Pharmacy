package com.medicine.service;

import com.medicine.dto.admin.DashboardResponse;
import com.medicine.dto.common.PagedResponse;
import com.medicine.dto.order.CreateOrderRequest;
import com.medicine.dto.order.OrderDetailResponse;
import com.medicine.dto.order.OrderResponse;
import com.medicine.dto.order.UpdateOrderStatusRequest;
import com.medicine.entity.OrderStatus;

import java.time.LocalDateTime;


public interface OrderService {
    OrderResponse createOrder(CreateOrderRequest request, String userEmail);

    PagedResponse<OrderResponse> getUserOrders(String userEmail, int page, int size);

    OrderDetailResponse getOrderById(Long orderId, String userEmail);

    void cancelOrder(Long orderId, String userEmail);

    PagedResponse<OrderResponse> getAllOrders(int page, int size, OrderStatus status,
                                              LocalDateTime startDate, LocalDateTime endDate);

    OrderResponse updateOrderStatus(Long orderId, UpdateOrderStatusRequest request);

    DashboardResponse getDashboardMetrics();
}