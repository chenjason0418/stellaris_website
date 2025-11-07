package com.example.backend.mapper;

import org.springframework.stereotype.Component;

import com.example.backend.dto.CartItemDTO;
import com.example.backend.dto.ProductDTO;
import com.example.backend.entity.CartItem;
import com.example.backend.entity.Product;

@Component
public class EntityMapper {
    
    // Product Entity 轉 DTO
    public ProductDTO toProductDTO(Product product) {
        if (product == null) {
            return null;
        }
        return new ProductDTO(
            product.getId(),
            product.getName(),
            product.getDescription(),
            product.getPrice(),
            product.getImage()
        );
    }
    
    // Product DTO 轉 Entity
    public Product toProductEntity(ProductDTO productDTO) {
        if (productDTO == null) {
            return null;
        }
        Product product = new Product(
            productDTO.getName(),
            productDTO.getDescription(),
            productDTO.getPrice(),
            productDTO.getImage()
        );
        product.setId(productDTO.getId());
        return product;
    }
    
    // CartItem Entity 轉 DTO
    public CartItemDTO toCartItemDTO(CartItem cartItem) {
        if (cartItem == null) {
            return null;
        }
        ProductDTO productDTO = toProductDTO(cartItem.getProduct());
        return new CartItemDTO(
            cartItem.getId(),
            productDTO,
            cartItem.getQuantity(),
            cartItem.getUserSession()
        );
    }
    
    // CartItem DTO 轉 Entity
    public CartItem toCartItemEntity(CartItemDTO cartItemDTO, Product product) {
        if (cartItemDTO == null) {
            return null;
        }
        CartItem cartItem = new CartItem(
            product,
            cartItemDTO.getQuantity(),
            cartItemDTO.getUserSession()
        );
        cartItem.setId(cartItemDTO.getId());
        return cartItem;
    }
}