package com.anschau.adriano.Services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.mockito.exceptions.base.MockitoException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.anschau.adriano.TestDataFactory;
import com.anschau.adriano.DTO.CreateOrderDTO;
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
    void shouldReturnListWithAllOrdersWhenCallFindAll() throws Exception {
        List<OrderEntity> mockedOrderEntityList = TestDataFactory.mockOrderEntityList(10);
        Mockito.doReturn(mockedOrderEntityList).when(repository).findAll();

        TestDataFactory.assertStringResponse(
            service.findAll(),
            mockedOrderEntityList
        );
    }

    @Test
    void shouldCreateAndReturnOneOrderWhenCallCreate() throws Exception {
        CreateOrderDTO mockedCreateOrderDTO = TestDataFactory.mockCreateOrderDTO(10);
        OrderEntity mockedOrderEntity = TestDataFactory.mockOrderEntity(TestDataFactory.mockCreateOrderDTO(10), true);
        
        Mockito.doReturn(mockedOrderEntity).when(repository).saveAndFlush(Mockito.any(OrderEntity.class));

        TestDataFactory.assertStringResponse(
            service.create(mockedCreateOrderDTO.getProducts()),
            mockedOrderEntity
        );
    }

    @Test
    void shouldReturnOneOrderWhenCallFindOne() throws Exception {
        OrderEntity mockedOrderEntity = TestDataFactory.mockOrderEntity();
        Optional<OrderEntity> mockedOptionalOrderEntity = Optional.of(mockedOrderEntity);
        Mockito.doReturn(mockedOptionalOrderEntity).when(repository).findById(mockedOrderEntity.getId());

        TestDataFactory.assertStringResponse(
            service.findOne(mockedOrderEntity.getId()),
            mockedOptionalOrderEntity
        );
    }

    @Test
    void shouldReturnNullableWhenCallGetOrderWithInexistentOrderId() throws Exception {
        UUID orderId = UUID.randomUUID();
        Mockito.doReturn(Optional.ofNullable(null)).when(repository).findById(orderId);

        TestDataFactory.assertStringResponse(
            service.findOne(orderId),
            Optional.ofNullable(null)
        );
    }

    @Test
    void shouldReturnOrderDeletedWhenCallDelete() throws Exception {
        UUID orderId = UUID.randomUUID();
        Mockito.doNothing().when(repository).deleteById(orderId);

        Assertions.assertThat(service.delete(orderId)).isTrue();
    }

    @Test
    void shouldReturnErrorWhenCallDeleteWithInexistentOrderId() throws Exception {
        UUID orderId = UUID.randomUUID();
        Mockito.doThrow(MockitoException.class).when(repository).deleteById(orderId);

        Assertions.assertThat(service.delete(orderId)).isFalse();
    }
    
}
