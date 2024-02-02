package com.anschau.adriano.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
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
    
	@RequestMapping("/catalog")
	public ResponseEntity<ApiResponse<LegacyProductEntity[]>> listOrders() throws Exception {
        ApiResponse<LegacyProductEntity[]> response = new ApiResponse<>();

        response.setType("legacy-products");
        response.setData(this.catalogService.list());

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
    
}
