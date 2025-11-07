package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.Product;
import com.example.backend.repository.ProductRepository;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    // 獲取所有商品
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    // 根據ID獲取商品
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }
    
    // 保存商品
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }
    
    // 刪除商品
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
    

}