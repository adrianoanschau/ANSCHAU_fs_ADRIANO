package com.anschau.adriano.Controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.anschau.adriano.ApiResponse;
import com.anschau.adriano.DTO.CreateOrderDTO;
import com.anschau.adriano.DTO.CreateProductDTO;
import com.anschau.adriano.Entities.OrderEntity;
import com.anschau.adriano.Entities.ProductEntity;
import com.anschau.adriano.Services.OrderService;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
public class OrderControllerTest {

    @Autowired
    private OrderController controller;
    
    @MockBean
    private OrderService service;

    @Autowired
    private ObjectMapper mapper;

    @Test
    void contextLoads() throws Exception {
        Assertions.assertThat(controller).isNotNull();
    }

    @Test
    void shouldReturnListWithAllOrders() throws Exception {

        OrderEntity mockedOrderEntity1 = new OrderEntity();
        mockedOrderEntity1.setId(UUID.randomUUID());

        OrderEntity mockedOrderEntity2 = new OrderEntity();
        mockedOrderEntity2.setId(UUID.randomUUID());

        List<OrderEntity> mockedOrdersList = new ArrayList<>();
        mockedOrdersList.add(mockedOrderEntity1);
        mockedOrdersList.add(mockedOrderEntity2);

        Mockito.doReturn(mockedOrdersList).when(service).findAll();
        
        ApiResponse<List<OrderEntity>> mockedApiResponse = ApiResponse.build("orders", mockedOrdersList);

        ResponseEntity<ApiResponse<List<OrderEntity>>> response = controller.listOrders();
        String responseContent = mapper.writeValueAsString(response.getBody());
        
        String expectedResponseContent = mapper.writeValueAsString(mockedApiResponse);

        Assertions.assertThat(response).isNotNull();
        Assertions.assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        Assertions.assertThat(responseContent).isEqualTo(expectedResponseContent);
    }

    @Test
    void shouldCreateAndReturnOneOrderWithProducts() throws Exception {
        CreateProductDTO product1 = new CreateProductDTO((long) 1, "Product 1");
        CreateProductDTO product2 = new CreateProductDTO((long) 2, "Product 2");
        
        List<CreateProductDTO> products = new ArrayList();
        products.add(product1);
        products.add(product2);

        CreateOrderDTO body = new CreateOrderDTO();
        body.setProducts(products);
        
        OrderEntity mockedOrderEntity = new OrderEntity();
        mockedOrderEntity.setId(UUID.randomUUID());

        List<ProductEntity> mockedListProductEntity = new ArrayList();
        mockedListProductEntity.add(new ProductEntity(UUID.randomUUID(), product1.getName(), mockedOrderEntity, product1.getId()));
        mockedListProductEntity.add(new ProductEntity(UUID.randomUUID(), product2.getName(), mockedOrderEntity, product2.getId()));

        mockedOrderEntity.setProducts(mockedListProductEntity);

        Mockito.doReturn(mockedOrderEntity).when(service).createOrderWithProducts(products);
        
        ApiResponse<OrderEntity> mockedApiResponse = ApiResponse.build("orders", mockedOrderEntity);

        ResponseEntity<ApiResponse<OrderEntity>> response = controller.createOrder(body);
        String responseContent = mapper.writeValueAsString(response.getBody());
        
        String expectedResponseContent = mapper.writeValueAsString(mockedApiResponse);

        Assertions.assertThat(response).isNotNull();
        Assertions.assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        Assertions.assertThat(responseContent).isEqualTo(expectedResponseContent);
    }
    
}
