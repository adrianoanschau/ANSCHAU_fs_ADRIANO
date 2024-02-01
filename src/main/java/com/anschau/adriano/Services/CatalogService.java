package com.anschau.adriano.Services;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class CatalogService {
    
    @Cacheable(value = "catalog")
    public String list() {
        return "Catalog";
    }
}
