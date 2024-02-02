package com.anschau.adriano.DTO;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateOrderDTO {
    private List<CreateProductDTO> products;
}
