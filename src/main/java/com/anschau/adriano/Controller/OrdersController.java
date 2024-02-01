package com.anschau.adriano.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anschau.adriano.Repositories.OrderRepository;
import com.anschau.adriano.Resources.Order;

@RestController
public class OrdersController {
    private final OrderRepository orderRepository;

    public OrdersController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }
    
	@RequestMapping("/orders")
	public ResponseEntity<List<Order>> listOrders() {
        List<Order> orders = this.orderRepository.findAll();

		return ResponseEntity.status(HttpStatus.OK).body(orders);
	}
    
}
