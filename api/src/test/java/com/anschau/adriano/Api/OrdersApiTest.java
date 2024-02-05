package com.anschau.adriano.Api;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import com.anschau.adriano.ApiResponse;
import com.anschau.adriano.TestDataFactory;
import com.anschau.adriano.DTO.CreateOrderDTO;
import com.anschau.adriano.DTO.CreateProductDTO;
import com.anschau.adriano.Entities.OrderEntity;
import com.anschau.adriano.Entities.ProductEntity;
import com.anschau.adriano.Repositories.OrderRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.zonky.test.db.AutoConfigureEmbeddedDatabase;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureEmbeddedDatabase
public class OrdersApiTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ObjectMapper mapper;

    List<OrderEntity> mockedOrderEntityList;

    private <T> ApiResponse<T> fromJsonResult(MvcResult result, Class<T> tClass) throws Exception {
        JsonNode jsonNode = this.mapper.readTree(result.getResponse().getContentAsString());
        T data = this.mapper.readValue(this.mapper.writeValueAsString(jsonNode.get("data")), tClass);

        return ApiResponse.build(jsonNode.get("type").textValue(), data);
    }

    @SuppressWarnings("null")
    private ResultActions invokeCreateOrder(CreateOrderDTO data) throws Exception {
        return this.mockMvc.perform(
            post("/orders")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(data)));
    }

    private ResultActions invokeListOrders() throws Exception {
        return this.mockMvc.perform(
            get("/orders")
                .accept(MediaType.APPLICATION_JSON));
    }

    private ResultActions invokeGetOrder(UUID id) throws Exception {
        return this.mockMvc.perform(
            get("/orders/" + id)
                .accept(MediaType.APPLICATION_JSON));
    }

    private ResultActions invokeDeleteOrder(UUID id) throws Exception {
        return this.mockMvc.perform(
            delete("/orders/" + id)
                .accept(MediaType.APPLICATION_JSON));
    }

    @BeforeEach
    void beforeEach() {
        List<CreateOrderDTO> mockedCreateOrderDTOList = TestDataFactory.mockCreateOrderDTOList(10, 5);

        List<OrderEntity> orderEntityList = new ArrayList<>();
        for (CreateOrderDTO mockedCreateOrderDTO : mockedCreateOrderDTOList) {
            orderEntityList.add(TestDataFactory.mockOrderEntity(mockedCreateOrderDTO, true));
        }

        this.mockedOrderEntityList = this.orderRepository.saveAllAndFlush(orderEntityList);
    }

    @AfterEach
    void afterEach() {
        this.orderRepository.deleteAll();
    }

    @SuppressWarnings("null")
    @Test
    void shouldReturnApiResponseWithOrdersList() throws Exception {
        ApiResponse<List<OrderEntity>> mockedResponse = ApiResponse.build("orders", this.mockedOrderEntityList);

        String expectedResponseContent = mapper.writeValueAsString(mockedResponse);

        invokeListOrders()
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().json(expectedResponseContent));
    }

    @SuppressWarnings("null")
    @Test
    void shouldCreateAndReturnApiResponseWithOneOrder() throws Exception {
        CreateOrderDTO mockedCreateOrderDTO = TestDataFactory.mockCreateOrderDTO(1);
        List<CreateProductDTO> products = mockedCreateOrderDTO.getProducts();

        MvcResult results = this.invokeCreateOrder(mockedCreateOrderDTO)
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.type", is("orders")))
            .andReturn();

        ApiResponse<OrderEntity> response = fromJsonResult(results, OrderEntity.class);

        invokeGetOrder(response.getData().getId())
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.type", is("orders")))
            .andExpect(jsonPath("$.data.products[0].name", is(products.get(0).getName())));
    }

    @SuppressWarnings("null")
    @Test
    void shouldReturnApiResponseWithOneOrder() throws Exception {
        OrderEntity mockedOrderEntity = this.mockedOrderEntityList.get(0);
        List<ProductEntity> products = mockedOrderEntity.getProducts();
        
        invokeGetOrder(mockedOrderEntity.getId())
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.type", is("orders")))
            .andExpect(jsonPath("$.data.products[0].name", is(products.get(0).getName())));
    }

    @SuppressWarnings("null")
    @Test
    void shouldReturnApiResponseWithDeletedOrderMessage() throws Exception {
        OrderEntity mockedOrderEntity = this.mockedOrderEntityList.get(0);

        invokeDeleteOrder(mockedOrderEntity.getId())
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.type", is("orders")))
            .andExpect(jsonPath("$.message", is("Order Deleted")));
    }
    
}
