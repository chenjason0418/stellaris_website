package com.example.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cart_items")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @Column(nullable = false)
    private Integer quantity;
    
    // 用戶ID（簡化版本，實際應該關聯到 User 實體）
    @Column(name = "user_session")
    private String userSession;
    
    // 預設建構子
    public CartItem() {}
    
    // 帶參數建構子
    public CartItem(Product product, Integer quantity, String userSession) {
        this.product = product;
        this.quantity = quantity;
        this.userSession = userSession;
    }
    
    // Getters 和 Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Product getProduct() {
        return product;
    }
    
    public void setProduct(Product product) {
        this.product = product;
    }
    
    public Integer getQuantity() {
        return quantity;
    }
    
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    
    public String getUserSession() {
        return userSession;
    }
    
    public void setUserSession(String userSession) {
        this.userSession = userSession;
    }
    
    // 計算總價的便利方法
    public Double getTotalPrice() {
        return product != null ? product.getPrice() * quantity : 0.0;
    }
}