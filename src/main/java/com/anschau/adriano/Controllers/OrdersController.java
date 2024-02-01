package com.anschau.adriano.Controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anschau.adriano.ApiResponse;
import com.anschau.adriano.Entities.OrderEntity;
import com.anschau.adriano.Repositories.OrderRepository;

@RestController
public class OrdersController {
    private final OrderRepository orderRepository;

    public OrdersController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }
    
	@RequestMapping("/orders")
	public ResponseEntity<ApiResponse<List<OrderEntity>>> listOrders() {
        ApiResponse<List<OrderEntity>> response = new ApiResponse<>();

        response.setType("orders");
        response.setData(this.orderRepository.findAll());

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
    
}
