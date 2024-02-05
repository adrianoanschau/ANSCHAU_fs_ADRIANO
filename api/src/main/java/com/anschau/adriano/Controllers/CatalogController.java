package com.anschau.adriano.Controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.anschau.adriano.ApiResponse;
import com.anschau.adriano.Legacy.LegacyProductEntity;
import com.anschau.adriano.Services.CatalogService;

@RestController
public class CatalogController {
    private final CatalogService catalogService;

    public CatalogController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }
    
	@GetMapping("/catalog")
	public ResponseEntity<ApiResponse<List<LegacyProductEntity>>> listProducts(@RequestParam(required = false) String page, @RequestParam(required = false) String limit) throws Exception {
        List<LegacyProductEntity> response = this.catalogService.list(page, limit);
        
		return ResponseEntity.status(HttpStatus.OK)
            .body(ApiResponse.build("legacy-products", response));
	}
    
}
