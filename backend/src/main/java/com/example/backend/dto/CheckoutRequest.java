package com.example.backend.dto;

import java.util.List;

public class CheckoutRequest {
    private Long userId;
    private List<CheckoutItemRequest> items;

    public CheckoutRequest() {}

    public CheckoutRequest(Long userId, List<CheckoutItemRequest> items) {
        this.userId = userId;
        this.items = items;
    }

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<CheckoutItemRequest> getItems() {
        return items;
    }

    public void setItems(List<CheckoutItemRequest> items) {
        this.items = items;
    }

    // 內部類：結帳項目請求
    public static class CheckoutItemRequest {
        private Long productId;
        private Integer quantity;

        public CheckoutItemRequest() {}

        public CheckoutItemRequest(Long productId, Integer quantity) {
            this.productId = productId;
            this.quantity = quantity;
        }

        // Getters and Setters
        public Long getProductId() {
            return productId;
        }

        public void setProductId(Long productId) {
            this.productId = productId;
        }

        public Integer getQuantity() {
            return quantity;
        }

        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }
    }
}