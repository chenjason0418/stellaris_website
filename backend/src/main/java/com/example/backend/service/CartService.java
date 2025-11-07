package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.entity.CartItem;
import com.example.backend.entity.Product;
import com.example.backend.repository.CartItemRepository;
import com.example.backend.repository.ProductRepository;

@Service
public class CartService {
    
    @Autowired
    private CartItemRepository cartItemRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    // 獲取購物車
    public List<CartItem> getCartItems(String userSession) {
        return cartItemRepository.findByUserSession(userSession);
    }
    
    // 添加至購物車
    public CartItem addToCart(String userSession, Long productId, Integer quantity) {
        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isEmpty()) {
            throw new RuntimeException("商品不存在");
        }
        
        Product product = productOpt.get();
        
        // 檢查是否存在商品
        Optional<CartItem> existingItem = cartItemRepository.findByUserSessionAndProductId(userSession, productId);
        
        if (existingItem.isPresent()) {
            // 增加數量
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            return cartItemRepository.save(item);
        } else {
            // 創建新的項目
            CartItem newItem = new CartItem(product, quantity, userSession);
            return cartItemRepository.save(newItem);
        }
    }
    
    // 更新數量
    public CartItem updateCartItemQuantity(Long cartItemId, Integer quantity) {
        Optional<CartItem> itemOpt = cartItemRepository.findById(cartItemId);
        if (itemOpt.isEmpty()) {
            throw new RuntimeException("購物車項目不存在");
        }
        
        CartItem item = itemOpt.get();
        if (quantity <= 0) {
            cartItemRepository.delete(item);
            return null;
        } else {
            item.setQuantity(quantity);
            return cartItemRepository.save(item);
        }
    }
    
    // 移除商品
    public void removeFromCart(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }
    
    // 清空購物車
    @Transactional
    public void clearCart(String userSession) {
        cartItemRepository.deleteByUserSession(userSession);
    }
    
    // 計算總價
    public Double getCartTotal(String userSession) {
        List<CartItem> items = cartItemRepository.findByUserSession(userSession);
        return items.stream()
                .mapToDouble(CartItem::getTotalPrice)
                .sum();
    }
    
    // 獲取商品總數
    public Integer getCartItemsCount(String userSession) {
        List<CartItem> items = cartItemRepository.findByUserSession(userSession);
        return items.stream()
                .mapToInt(CartItem::getQuantity)
                .sum();
    }
}