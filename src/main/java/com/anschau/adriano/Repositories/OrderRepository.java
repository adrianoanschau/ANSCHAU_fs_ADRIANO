package com.anschau.adriano.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.anschau.adriano.Entities.OrderEntity;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
}