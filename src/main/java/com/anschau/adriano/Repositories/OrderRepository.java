package com.anschau.adriano.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anschau.adriano.Resources.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}