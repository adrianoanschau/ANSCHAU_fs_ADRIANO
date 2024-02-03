package com.anschau.adriano.Controllers;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;

import com.anschau.adriano.ApiResponse;
import com.anschau.adriano.TestDataFactory;
import com.anschau.adriano.DTO.CreateOrderDTO;
import com.anschau.adriano.Entities.OrderEntity;
import com.anschau.adriano.Services.OrderService;

@SpringBootTest
public class OrderControllerTest {

    @Autowired
    private OrderController controller;
    
    @MockBean
    private OrderService service;

    @Test
    void contextLoads() throws Exception {
        Assertions.assertThat(controller).isNotNull();
    }

    @Test
    void shouldReturnListWithAllOrdersWhenCallListOrders() throws Exception {
        List<OrderEntity> mockedOrdersList = TestDataFactory.mockOrderEntityList(10);
        Mockito.doReturn(mockedOrdersList).when(service).findAll();
        
        TestDataFactory.assertResponseEntity(
            HttpStatus.OK,
            controller.listOrders(),
            ApiResponse.build("orders", mockedOrdersList)
        );
    }

    @Test
    void shouldCreateAndReturnOneOrderWhenCallCreateOrder() throws Exception {
        CreateOrderDTO mockedOrderDTO = TestDataFactory.mockCreateOrderDTO(10);
        OrderEntity mockedOrderEntity = TestDataFactory.mockOrderEntity(mockedOrderDTO, false);
        Mockito.doReturn(mockedOrderEntity).when(service).create(mockedOrderDTO.getProducts());
        
        TestDataFactory.assertResponseEntity(
            HttpStatus.CREATED,
            controller.createOrder(mockedOrderDTO),
            ApiResponse.build("orders", mockedOrderEntity)
        );
    }

    @Test
    void shouldReturnOneOrderWhenCallGetOrder() throws Exception {
        OrderEntity mockedOrderEntity = TestDataFactory.mockOrderEntity();
        Mockito.doReturn(Optional.of(mockedOrderEntity)).when(service).findOne(mockedOrderEntity.getId());
        
        TestDataFactory.assertResponseEntity(
            HttpStatus.OK,
            controller.getOrder(mockedOrderEntity.getId()),
            ApiResponse.build("orders", mockedOrderEntity)
        );
    }

    @Test
    void shouldReturnErrorWhenCallGetOrderWithInexistentOrderId() throws Exception {
        UUID inexistentOrderId = UUID.randomUUID();
        Mockito.doReturn(Optional.ofNullable(null)).when(service).findOne(inexistentOrderId);
        
        TestDataFactory.assertResponseEntity(
            HttpStatus.NOT_FOUND,
            controller.getOrder(inexistentOrderId),
            ApiResponse.build("orders", "Order Not Found")
        );
    }

    @Test
    void shouldReturnOrderDeletedWhenCallDeleteOrder() throws Exception {
        OrderEntity mockedOrderEntity = TestDataFactory.mockOrderEntity();
        Mockito.doReturn(true).when(service).delete(mockedOrderEntity.getId());
        
        TestDataFactory.assertResponseEntity(
            HttpStatus.OK,
            controller.deleteOrder(mockedOrderEntity.getId()),
            ApiResponse.build("orders", "Order Deleted")
        );
    }

    @Test
    void shouldReturnErrorWhenCallDeleteOrderWithInexistentOrderId() throws Exception {
        UUID inexistentOrderId = UUID.randomUUID();
        Mockito.doReturn(false).when(service).delete(inexistentOrderId);
        
        TestDataFactory.assertResponseEntity(
            HttpStatus.BAD_REQUEST,
            controller.deleteOrder(inexistentOrderId),
            ApiResponse.build("orders", "An error occurred while removing the order")
        );
    }
    
}
