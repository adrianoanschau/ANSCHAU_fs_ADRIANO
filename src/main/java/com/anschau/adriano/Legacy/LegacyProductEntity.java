package com.anschau.adriano.Legacy;

import java.io.Serializable;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LegacyProductEntity implements Serializable {
    @Id
    private String id;
    private String name;
    private int[] suppliers;
}
