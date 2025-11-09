package com.medicine.service;

import com.medicine.dto.payment.PaymentRequest;
import com.medicine.dto.payment.PaymentResponse;
import com.medicine.entity.OrderStatus;

public interface PaymentService {
    String getSerectKey();

    PaymentResponse processPayment(PaymentRequest request);

    void updatePayment(String txnRef, OrderStatus status);

    void updatePayment(Long id, OrderStatus status);
}