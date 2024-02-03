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

import com.anschau.adriano.TestDataFactory;
import com.anschau.adriano.Entities.OrderEntity;
import com.anschau.adriano.Legacy.LegacyConsumerService;
import com.anschau.adriano.Legacy.LegacyProductEntity;

@SpringBootTest
public class CatalogServiceTest {

    @Autowired
    private CatalogService service;

    @MockBean
    private LegacyConsumerService legacyConsumerService;

    @Test
    void contextLoads() throws Exception {
        Assertions.assertThat(service).isNotNull();
    }

    @Test
    void shouldReturnListOfProductsWhenCallWithPageParam() throws Exception {
        List<LegacyProductEntity> mockedLegacyProductEntityList = TestDataFactory.mockLegacyProductEntityList(1);
        Mockito.doReturn(mockedLegacyProductEntityList).when(legacyConsumerService).listOfProducts("1");

        Assertions.assertThat(service.list()).isEqualTo(mockedLegacyProductEntityList);
    }

    @Test
    void shouldReturnListOfProductsWhenCallWithPageParamNull() throws Exception {
        List<LegacyProductEntity> mockedLegacyProductEntityList = TestDataFactory.mockLegacyProductEntityList(1);
        Mockito.doReturn(mockedLegacyProductEntityList).when(legacyConsumerService).listOfProducts("1");

        Assertions.assertThat(service.list(null)).isEqualTo(mockedLegacyProductEntityList);
    }
    
}
