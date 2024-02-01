package com.anschau.adriano.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.anschau.adriano.Entities.OrderEntity;
import com.anschau.adriano.Repositories.OrderRepository;

@Service
public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }
    
	public List<OrderEntity> findAll() {
        return this.orderRepository.findAll();
	}
    
}
