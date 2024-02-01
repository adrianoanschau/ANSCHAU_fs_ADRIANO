package com.anschau.adriano.Api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.anschau.adriano.ApiResponse;
import com.anschau.adriano.Entities.OrderEntity;
import com.anschau.adriano.Services.OrderService;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
public class OrdersApiTest {

    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private OrderService service;

    @Autowired
    private ObjectMapper mapper;

    @Test
    void shouldReturnApiResponseWithAllOrdersList() throws Exception {

        OrderEntity mockedOrderEntity = new OrderEntity();
        mockedOrderEntity.setId((long) 1);
        mockedOrderEntity.setName("Order 1");

        List<OrderEntity> mockedOrdersList = new ArrayList<>();
        mockedOrdersList.add(mockedOrderEntity);

        Mockito.doReturn(mockedOrdersList).when(service).findAll();
        
        ApiResponse<List<OrderEntity>> mockedResponse = new ApiResponse<>();
        mockedResponse.setType("orders");
        mockedResponse.setData(mockedOrdersList);

        String expectedResponseContent = mapper.writeValueAsString(mockedResponse);

        this.mockMvc.perform(get("/orders"))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().json(expectedResponseContent));
    }
    
}
