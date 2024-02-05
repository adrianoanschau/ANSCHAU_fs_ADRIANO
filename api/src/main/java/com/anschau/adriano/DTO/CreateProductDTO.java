package com.anschau.adriano.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateProductDTO {
    private Long id;
    private String name;
    private double price;
    private int quantity;
}
