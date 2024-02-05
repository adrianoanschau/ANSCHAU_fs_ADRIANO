package com.anschau.adriano;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.assertj.core.api.Assertions;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.anschau.adriano.DTO.CreateOrderDTO;
import com.anschau.adriano.DTO.CreateProductDTO;
import com.anschau.adriano.Entities.OrderEntity;
import com.anschau.adriano.Entities.ProductEntity;
import com.anschau.adriano.Legacy.LegacyProductEntity;
import com.fasterxml.jackson.databind.ObjectMapper;

public class TestDataFactory {

    public static <R, M> void assertStringResponse(R response, M mockedResponse) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        
        String responseContent = mapper.writeValueAsString(response);
        String expectedResponseContent = mapper.writeValueAsString(mockedResponse);
        
        Assertions.assertThat(responseContent).isEqualTo(expectedResponseContent);
    }

    public static <T> void assertResponseEntity(
            HttpStatus httpStatus,
            ResponseEntity<T> response,
            T mockedResponse
        ) throws Exception {
        Assertions.assertThat(response).isNotNull();
        Assertions.assertThat(response.getStatusCode()).isEqualTo(httpStatus);
        
        TestDataFactory.assertStringResponse(response.getBody(), mockedResponse);
    }

    public static CreateOrderDTO mockCreateOrderDTO(int size) {
        CreateOrderDTO data = new CreateOrderDTO();
        List<CreateProductDTO> products = TestDataFactory.mockCreateProductDTOList(size);
        data.setProducts(products);

        return data;
    }

    public static List<CreateOrderDTO> mockCreateOrderDTOList(int ordersSize, int productsSize) {
        List<CreateOrderDTO> list = new ArrayList<>();

        for (int i = 0; i < ordersSize; i++) {
            list.add(TestDataFactory.mockCreateOrderDTO(productsSize));
        }

        return list;
    }

    private static List<CreateProductDTO> mockCreateProductDTOList(int size) {
        List<CreateProductDTO> list = new ArrayList<>();

        for (int i = 0; i < size; i++) {
            list.add(TestDataFactory.mockCreateProductDTO(i));
        }

        return list;
    }

    private static CreateProductDTO mockCreateProductDTO(long id) {
        return new CreateProductDTO(id, "Product " + id, 9.90, 1);
    }

    public static List<OrderEntity> mockOrderEntityList(int size) {
        List<OrderEntity> list = new ArrayList<>();

        for (int i = 0; i < size; i++) {
            list.add(TestDataFactory.mockOrderEntity());
        }

        return list;
    }

    public static OrderEntity mockOrderEntity() {
        OrderEntity entity = new OrderEntity();
        entity.setId(UUID.randomUUID());

        return entity;
    }

    public static OrderEntity mockOrderEntity(CreateOrderDTO orderDTO, boolean withoutIds) {
        OrderEntity entity = new OrderEntity();
        if (!withoutIds) {
            entity.setId(UUID.randomUUID());
        }

        List<ProductEntity> productEntityList = TestDataFactory.mockProductsEntityList(orderDTO.getProducts(), entity, withoutIds);
        entity.setProducts(productEntityList);

        return entity;
    }

    public static List<ProductEntity> mockProductsEntityList(List<CreateProductDTO> products, OrderEntity order, boolean withoutIds) {
        List<ProductEntity> list = new ArrayList<>();

        for (CreateProductDTO product : products) {
            list.add(TestDataFactory.mockProductEntity(product, order, withoutIds));
        }

        return list;
    }

    public static ProductEntity mockProductEntity(CreateProductDTO product, OrderEntity order, boolean withoutIds) {
        ProductEntity entity = new ProductEntity();
        if (!withoutIds) {
            entity.setId(UUID.randomUUID());
        }
        entity.setOrder(order);
        entity.setName(product.getName());
        entity.setExternalId(product.getId());
        entity.setPrice(product.getPrice());
        entity.setQuantity(product.getQuantity());

        return entity;
    }

    public static List<LegacyProductEntity> mockLegacyProductEntityList(int size) {
        List<LegacyProductEntity> list = new ArrayList<>();

        for (int i = 0; i < size; i++) {
            list.add(TestDataFactory.mockLegacyProductEntity(String.valueOf(i)));
        }

        return list;
    }

    private static LegacyProductEntity mockLegacyProductEntity(String id) {
        LegacyProductEntity entity = new LegacyProductEntity();
        entity.setId(id);
        entity.setName("Product " + id);
        entity.setSuppliers(new int[]{1, 2, 3, 4});

        return entity;
    }
    
}
