package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.Order;
import com.example.backend.entity.User;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
    // 根據用戶查找訂單
    List<Order> findByUserOrderByOrderDateDesc(User user);
    
    // 根據用戶ID查找訂單
    List<Order> findByUserIdOrderByOrderDateDesc(Long userId);
    
    // 統計用戶的訂單數量
    long countByUser(User user);
    
    // 統計用戶的總消費金額
    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o WHERE o.user = :user AND o.status = 'DELIVERED'")
    Double sumTotalAmountByUserAndStatusDelivered(@Param("user") User user);
    
    // 統計所有已送達訂單的總收入
    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o WHERE o.status = 'DELIVERED'")
    Double sumTotalRevenue();
    
    // 統計總訂單數
    @Query("SELECT COUNT(o) FROM Order o")
    Long countTotalOrders();
}