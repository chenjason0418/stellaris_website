package com.example.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.repository.OrderRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/status")
    public Map<String, Object> getStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("backend", "running");
        status.put("database", "connected");
        status.put("userCount", userRepository.count());
        status.put("productCount", productRepository.count());
        status.put("orderCount", orderRepository.count());
        status.put("timestamp", System.currentTimeMillis());
        return status;
    }
    
    @GetMapping("/h2-info")
    public Map<String, String> getH2Info() {
        Map<String, String> h2Info = new HashMap<>();
        h2Info.put("h2ConsoleUrl", "http://localhost:8080/h2-console");
        h2Info.put("jdbcUrl", "jdbc:h2:file:./data/stellaris");
        h2Info.put("username", "sa");
        h2Info.put("password", "password");
        h2Info.put("driver", "org.h2.Driver");
        return h2Info;
    }
}