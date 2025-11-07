package com.example.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class UpdateQuantityRequest {
    @NotNull(message = "數量不能為空")
    @Min(value = 1, message = "數量必須大於0")
    private Integer quantity;
    
    // 預設建構子
    public UpdateQuantityRequest() {}
    
    // 帶參數建構子
    public UpdateQuantityRequest(Integer quantity) {
        this.quantity = quantity;
    }
    
    // Getters 和 Setters
    public Integer getQuantity() {
        return quantity;
    }
    
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}