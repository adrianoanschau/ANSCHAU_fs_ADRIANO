package com.anschau.adriano.Legacy;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import jakarta.annotation.Resource;
import reactor.core.publisher.Mono;

@Service
public class LegacyConsumerService {

	private final WebClient webClient;

    @Resource(name = "redisTemplate")
    private ValueOperations<String, Object> valueOps;

    public LegacyConsumerService(WebClient.Builder webClientBuilder) {
		this.webClient = webClientBuilder.baseUrl("https://65bce235b51f9b29e9327d3d.mockapi.io")
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();
    }
    
    @Cacheable(value = "legacy-products")
    public LegacyProductEntity[] listOfProducts() throws Exception {
        Mono<LegacyProductEntity[]> responseEntity = this.webClient.get().uri("/products").retrieve().bodyToMono(LegacyProductEntity[].class);
        LegacyProductEntity[] response = responseEntity.block();

        return response;
    }
}
