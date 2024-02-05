package com.anschau.adriano.Legacy;

import java.io.IOException;
import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import com.anschau.adriano.TestDataFactory;
import com.fasterxml.jackson.databind.ObjectMapper;

import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class LegacyConsumerServiceTest {

    public static MockWebServer mockWebServer;

    private LegacyConsumerService service;

    @BeforeAll
    static void setUp() throws IOException {
        mockWebServer = new MockWebServer();
        mockWebServer.start();
    }

    @AfterAll
    static void tearDown() throws IOException {
        mockWebServer.shutdown();
    }
    
    @BeforeEach
    void initialize() {
        String baseUrl = String.format("http://localhost:%s", mockWebServer.getPort());
        this.service = new LegacyConsumerService(baseUrl);
    }

    @Test
    void shouldReturnListWithFirstPageProductsWhenCallListOfProducts() throws Exception {
        List<LegacyProductEntity> mockedProductsList = TestDataFactory.mockLegacyProductEntityList(10);
        ObjectMapper mapper = new ObjectMapper();

        mockWebServer.enqueue(
            new MockResponse()
                .addHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .setBody(mapper.writeValueAsString(mockedProductsList))
            );

        List<LegacyProductEntity> response = service.listOfProducts("1", "10");

        Assertions.assertThat(mapper.writeValueAsString(response)).isEqualTo(mapper.writeValueAsString(mockedProductsList));
    }
}
