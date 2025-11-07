package com.example.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    
    // 根據用戶會話找到購物車項目
    List<CartItem> findByUserSession(String userSession);
    
    // 根據用戶會話和商品ID找到特定購物車項目
    Optional<CartItem> findByUserSessionAndProductId(String userSession, Long productId);
    
    // 刪除特定用戶會話的所有購物車項目
    void deleteByUserSession(String userSession);
}