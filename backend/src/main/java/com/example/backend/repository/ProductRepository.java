package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // 根據名稱查找商品
    java.util.Optional<Product> findByName(String name);
}