package com.anschau.adriano;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ApiResponse<T> {
    private String type;
    private T data;

    private ApiResponse(String type, T data) {
        this.type = type;
        this.data = data;
    }

    public static <T> ApiResponse<T> create(String type, T data) {
        return new ApiResponse<T>(type, data);
    }
}
