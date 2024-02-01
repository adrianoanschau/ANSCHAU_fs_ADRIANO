package com.anschau.adriano;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ApiResponse<Type> {
    private String type;
    private Type data;
}
