package com.anschau.adriano.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anschau.adriano.Entities.OrderEntity;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
}