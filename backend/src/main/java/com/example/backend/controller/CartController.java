package com.example.backend.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.AddToCartRequest;
import com.example.backend.dto.CartItemDTO;
import com.example.backend.entity.CartItem;
import com.example.backend.mapper.EntityMapper;
import com.example.backend.service.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:4200")
public class CartController {
    
    @Autowired
    private CartService cartService;
    
    @Autowired
    private EntityMapper mapper;
    
    // 獲取購物車項目
    @GetMapping("/{userSession}")
    public List<CartItemDTO> getCartItems(@PathVariable String userSession) {
        return cartService.getCartItems(userSession)
                .stream()
                .map(mapper::toCartItemDTO)
                .collect(Collectors.toList());
    }
    
    // 添加商品到購物車
    @PostMapping("/{userSession}/add")
    public ResponseEntity<CartItemDTO> addToCart(
            @PathVariable String userSession,
            @RequestBody AddToCartRequest request) {
        
        try {
            CartItem cartItem = cartService.addToCart(userSession, request.getProductId(), request.getQuantity());
            return ResponseEntity.ok(mapper.toCartItemDTO(cartItem));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // 更新購物車項目數量
    @PutMapping("/item/{cartItemId}")
    public ResponseEntity<CartItem> updateCartItemQuantity(
            @PathVariable Long cartItemId,
            @RequestBody Map<String, Integer> request) {
        
        Integer quantity = request.get("quantity");
        
        try {
            CartItem updatedItem = cartService.updateCartItemQuantity(cartItemId, quantity);
            if (updatedItem == null) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(updatedItem);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // 從購物車移除商品
    @DeleteMapping("/item/{cartItemId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long cartItemId) {
        cartService.removeFromCart(cartItemId);
        return ResponseEntity.ok().build();
    }
    
    // 清空購物車
    @DeleteMapping("/{userSession}")
    public ResponseEntity<?> clearCart(@PathVariable String userSession) {
        cartService.clearCart(userSession);
        return ResponseEntity.ok().build();
    }
    
    // 獲取購物車統計信息
    @GetMapping("/{userSession}/summary")
    public ResponseEntity<Map<String, Object>> getCartSummary(@PathVariable String userSession) {
        Double total = cartService.getCartTotal(userSession);
        Integer itemCount = cartService.getCartItemsCount(userSession);
        
        Map<String, Object> summary = Map.of(
            "total", total,
            "itemCount", itemCount
        );
        
        return ResponseEntity.ok(summary);
    }
}