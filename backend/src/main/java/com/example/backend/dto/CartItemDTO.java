package com.example.backend.dto;

public class CartItemDTO {
    private Long id;
    private ProductDTO product;
    private Integer quantity;
    private String userSession;
    private Double totalPrice;
    
    public CartItemDTO() {}
    
    public CartItemDTO(Long id, ProductDTO product, Integer quantity, String userSession) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;
        this.userSession = userSession;
        this.totalPrice = product != null ? product.getPrice() * quantity : 0.0;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public ProductDTO getProduct() {
        return product;
    }
    
    public void setProduct(ProductDTO product) {
        this.product = product;
        if (product != null && quantity != null) {
            this.totalPrice = product.getPrice() * quantity;
        }
    }
    
    public Integer getQuantity() {
        return quantity;
    }
    
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
        if (product != null && quantity != null) {
            this.totalPrice = product.getPrice() * quantity;
        }
    }
    
    public String getUserSession() {
        return userSession;
    }
    
    public void setUserSession(String userSession) {
        this.userSession = userSession;
    }
    
    public Double getTotalPrice() {
        return totalPrice;
    }
    
    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }
}