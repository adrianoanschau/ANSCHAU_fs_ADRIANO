package com.anschau.adriano.Controllers;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.anschau.adriano.ApiResponse;
import com.anschau.adriano.DTO.CreateOrderDTO;
import com.anschau.adriano.Entities.OrderEntity;
import com.anschau.adriano.Services.OrderService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
    
	@GetMapping("/orders")
	public ResponseEntity<ApiResponse<List<OrderEntity>>> listOrders() throws Exception {

        List<OrderEntity> orders = this.orderService.findAll();

		return ResponseEntity.status(HttpStatus.OK)
            .body(ApiResponse.create("orders", orders));
	}

    @PostMapping("/orders")
    public ResponseEntity<ApiResponse<OrderEntity>> createOrder(@RequestBody CreateOrderDTO body) throws Exception {

        OrderEntity order = this.orderService.createOrderWithProducts(body.getProducts());

		return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.create("orders", order));
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<ApiResponse<Optional<OrderEntity>>> getOrder(@PathVariable UUID id) throws Exception {

        Optional<OrderEntity> order = this.orderService.findOne(id);

		return ResponseEntity.status(HttpStatus.OK)
            .body(ApiResponse.create("orders", order));
    }

    @DeleteMapping("/orders/{id}")
    public ResponseEntity<ApiResponse<String>> deleteOrder(@PathVariable UUID id) throws Exception {

        this.orderService.delete(id);

		return ResponseEntity.status(HttpStatus.OK)
            .body(ApiResponse.create("orders", "Order Deleted"));
    }
    
}
