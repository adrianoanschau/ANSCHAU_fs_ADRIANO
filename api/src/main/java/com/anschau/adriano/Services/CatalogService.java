package com.anschau.adriano.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.anschau.adriano.Legacy.LegacyConsumerService;
import com.anschau.adriano.Legacy.LegacyProductEntity;

@Service
public class CatalogService {

    private final LegacyConsumerService legacyConsumerService;

    public CatalogService(LegacyConsumerService legacyConsumerService) {
        this.legacyConsumerService = legacyConsumerService;
    }

    public List<LegacyProductEntity> list(String page, String limit) throws Exception {
        if (page == null) {
            page = "1";
        }
        if (limit == null) {
            limit = "10";
        }
        return this.legacyConsumerService.listOfProducts(page, limit);
    }
}
