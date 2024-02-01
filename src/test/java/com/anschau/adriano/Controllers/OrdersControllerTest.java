package com.anschau.adriano.Controllers;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class OrdersControllerTest {

    @Autowired
    private OrdersController controller;

    @Test
    void contextLoads() throws Exception {
        Assertions.assertThat(controller).isNotNull();
    }
    
}
