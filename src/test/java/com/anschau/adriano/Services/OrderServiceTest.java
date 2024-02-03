package com.anschau.adriano.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.anschau.adriano.Entities.OrderEntity;
import com.anschau.adriano.Repositories.OrderRepository;

@SpringBootTest
public class OrderServiceTest {

    @Autowired
    private OrderService service;
    
    @MockBean
    private OrderRepository repository;

    @Test
    void contextLoads() throws Exception {
        Assertions.assertThat(service).isNotNull();
    }

    @Test
    void shouldReturnAllOrdersList() throws Exception {
        OrderEntity mockedOrderEntity = new OrderEntity();
        UUID orderId = UUID.randomUUID();
        mockedOrderEntity.setId(orderId);

        List<OrderEntity> mockedOrdersList = new ArrayList<>();
        mockedOrdersList.add(mockedOrderEntity);

        Mockito.doReturn(mockedOrdersList).when(repository).findAll();

        Assertions.assertThat(service.findAll()).isEqualTo(mockedOrdersList);
    }
    
}
