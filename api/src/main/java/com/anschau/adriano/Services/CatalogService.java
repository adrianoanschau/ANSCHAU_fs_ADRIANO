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

    public List<LegacyProductEntity> list() throws Exception {
        return list("1", "10");
    }
    public List<LegacyProductEntity> list(String page) throws Exception {
        return list(page, "10");
    }
    public List<LegacyProductEntity> list(String page, String limit) throws Exception {
        return this.legacyConsumerService.listOfProducts(page == null ? "1" : page, limit == null ? "10" : limit);
    }
}
