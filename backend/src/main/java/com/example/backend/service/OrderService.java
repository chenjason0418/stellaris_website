package com.example.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.dto.CheckoutRequest;
import com.example.backend.dto.OrderDTO;
import com.example.backend.dto.OrderItemDTO;
import com.example.backend.entity.Order;
import com.example.backend.entity.OrderItem;
import com.example.backend.entity.Product;
import com.example.backend.entity.User;
import com.example.backend.repository.OrderItemRepository;
import com.example.backend.repository.OrderRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.UserRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartService cartService;

    /*處理結帳*/
    @Transactional
    public OrderDTO checkout(CheckoutRequest checkoutRequest) {
        // 驗證用戶
        User user = userRepository.findById(checkoutRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("用戶不存在"));

        if (checkoutRequest.getItems() == null || checkoutRequest.getItems().isEmpty()) {
            throw new RuntimeException("購物車是空的");
        }

        // 計算總金額和項目數量
        double totalAmount = 0.0;
        int totalItemCount = 0;

        // 創建訂單
        Order order = new Order(user, 0.0, 0, Order.OrderStatus.PENDING);
        order = orderRepository.save(order);

        // 處理訂單
        for (CheckoutRequest.CheckoutItemRequest item : checkoutRequest.getItems()) {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("商品不存在: " + item.getProductId()));

            // 檢查庫存
            if (product.getStock() < item.getQuantity()) {
                throw new RuntimeException("商品庫存不足: " + product.getName());
            }

            // 創建訂單
            OrderItem orderItem = new OrderItem(order, product, item.getQuantity(), product.getPrice());
            orderItemRepository.save(orderItem);

            // 更新庫存
            product.setStock(product.getStock() - item.getQuantity());
            productRepository.save(product);

            // 累計金額、數量
            totalAmount += product.getPrice() * item.getQuantity();
            totalItemCount += item.getQuantity();
        }

        // 更新訂單總金額、項目數量
        order.setTotalAmount(totalAmount);
        order.setItemCount(totalItemCount);
        order.setStatus(Order.OrderStatus.CONFIRMED);
        order = orderRepository.save(order);

        return convertToDTO(order);
    }

    /*獲取用戶訂單*/
    public List<OrderDTO> getUserOrders(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("用戶不存在"));

        List<Order> orders = orderRepository.findByUserOrderByOrderDateDesc(user);
        return orders.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /*獲取所有訂單*/
    public List<OrderDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /*根據ID獲取訂單*/
    public OrderDTO getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("訂單不存在"));
        return convertToDTO(order);
    }

    /*轉換 Order 實體為 DTO*/
    private OrderDTO convertToDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setUserId(order.getUser().getId());
        dto.setUserName(order.getUser().getName());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setItemCount(order.getItemCount());
        dto.setOrderDate(order.getOrderDate());
        dto.setStatus(order.getStatus().name());

        // 轉換訂單項目
        if (order.getOrderItems() != null) {
            List<OrderItemDTO> orderItemDTOs = order.getOrderItems().stream()
                    .map(this::convertOrderItemToDTO)
                    .collect(Collectors.toList());
            dto.setOrderItems(orderItemDTOs);
        }

        return dto;
    }

    /*更新訂單狀態*/
    @Transactional
    public OrderDTO updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("訂單不存在"));

        // 驗證狀態
        try {
            Order.OrderStatus newStatus = Order.OrderStatus.valueOf(status);
            order.setStatus(newStatus);
            order = orderRepository.save(order);
            
            return convertToDTO(order);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("無效的訂單狀態: " + status);
        }
    }

    /*轉換 OrderItem 實體為 DTO     */
    private OrderItemDTO convertOrderItemToDTO(OrderItem orderItem) {
        return new OrderItemDTO(
                orderItem.getId(),
                orderItem.getOrder().getId(),
                orderItem.getProduct().getId(),
                orderItem.getProduct().getName(),
                orderItem.getQuantity(),
                orderItem.getPrice()
        );
    }
}