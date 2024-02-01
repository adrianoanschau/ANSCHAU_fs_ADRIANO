package com.anschau.adriano.Services;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class OrdersServiceTest {

    @Autowired
    private OrdersService service;

    @Test
    void contextLoads() throws Exception {
        Assertions.assertThat(service).isNotNull();
    }
    
}
