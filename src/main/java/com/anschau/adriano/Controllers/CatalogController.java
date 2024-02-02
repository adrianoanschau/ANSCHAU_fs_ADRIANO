package com.anschau.adriano.Controllers;

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
	public ResponseEntity<ApiResponse<LegacyProductEntity[]>> listOrders(@RequestParam(required = false) String page) throws Exception {
        ApiResponse<LegacyProductEntity[]> response = new ApiResponse<>();

        response.setType("legacy-products");
        response.setData(this.catalogService.list(page));

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
    
}
