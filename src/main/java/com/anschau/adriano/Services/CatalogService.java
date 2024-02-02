package com.anschau.adriano.Services;

import org.springframework.stereotype.Service;

import com.anschau.adriano.Legacy.LegacyConsumerService;
import com.anschau.adriano.Legacy.LegacyProductEntity;

@Service
public class CatalogService {

    private final LegacyConsumerService legacyConsumerService;

    public CatalogService(LegacyConsumerService legacyConsumerService) {
        this.legacyConsumerService = legacyConsumerService;
    }

    public LegacyProductEntity[] list() throws Exception {
        LegacyProductEntity[] products = this.legacyConsumerService.listOfProducts();

        return products;
    }
}
