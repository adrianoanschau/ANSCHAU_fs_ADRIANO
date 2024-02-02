package com.anschau.adriano.Entities;

import java.io.Serializable;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "products")
public class ProductEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id", nullable = false)
    private OrderEntity order;

    @Column(nullable = false)
    private Long externalId;

    public UUID getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public Long getExternalId() {
        return this.externalId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setExternalId(Long externalId) {
        this.externalId = externalId;
    }

    public void setOrder(OrderEntity order) {
        this.order = order;
    }

}