package com.anschau.adriano.Controllers;

import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;

import com.anschau.adriano.ApiResponse;
import com.anschau.adriano.TestDataFactory;
import com.anschau.adriano.Legacy.LegacyProductEntity;
import com.anschau.adriano.Services.CatalogService;

@SpringBootTest
public class CatalogControllerTest {

    @Autowired
    private CatalogController controller;
    
    @MockBean
    private CatalogService service;

    @Test
    void contextLoads() throws Exception {
        Assertions.assertThat(controller).isNotNull();
    }

    @Test
    void shouldReturnListWithFirstPageProductsWhenCallListProducts() throws Exception {
        String page = "1";
        List<LegacyProductEntity> mockedLegacyProductsList = TestDataFactory.mockLegacyProductEntityList(10);
        Mockito.doReturn(mockedLegacyProductsList).when(service).list(page);
        
        TestDataFactory.assertResponseEntity(
            HttpStatus.OK,
            controller.listProducts(page),
            ApiResponse.build("legacy-products", mockedLegacyProductsList)
        );
    }
    
}
