package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.User;
import com.example.backend.repository.OrderRepository;
import com.example.backend.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private PasswordService passwordService;

    @Autowired
    private JwtService jwtService;
    
    // 生成 JWT token
    public String generateToken(User user) {
        return jwtService.generateToken(user);
    }

    // 驗證 token
    public boolean validateToken(String token) {
        return jwtService.validateToken(token);
    }
    
    // 獲取所有用戶
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    // 根據 ID 獲取用戶
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    // 根據 Email 獲取用戶
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    // 創建新用戶
    public User createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists: " + user.getEmail());
        }
        
        // 如果密碼尚未加密，則進行加密
        if (!passwordService.isPasswordHashed(user.getPassword())) {
            user.setPassword(passwordService.hashPassword(user.getPassword()));
        }
        
        return userRepository.save(user);
    }
    
    // 更新用戶
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        
        // 檢查 email 是否已存在（除了當前用戶）
        if (!user.getEmail().equals(userDetails.getEmail()) && 
            userRepository.existsByEmail(userDetails.getEmail())) {
            throw new RuntimeException("Email already exists: " + userDetails.getEmail());
        }
        
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        
        // 更新其他欄位（如果提供）
        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            user.setPassword(userDetails.getPassword());
        }
        if (userDetails.getRole() != null) {
            user.setRole(userDetails.getRole());
        }
        if (userDetails.getStatus() != null) {
            user.setStatus(userDetails.getStatus());
        }
        
        return userRepository.save(user);
    }
    
    // 刪除用戶
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        userRepository.delete(user);
    }
    
    // 檢查用戶是否存在
    public boolean existsById(Long id) {
        return userRepository.existsById(id);
    }
    
    // 用戶登入
    public User loginUser(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        
        // 檢查密碼是否匹配
        boolean passwordMatch;
        if (passwordService.isPasswordHashed(user.getPassword())) {
            // 如果資料庫中是哈希密碼，發送哈希密碼，直接比較
            passwordMatch = password.equals(user.getPassword());
        } else {
            // 如果資料庫中是一般密碼，發送哈希密碼，一般密碼轉換哈希後比較
            String hashedStoredPassword = passwordService.hashPassword(user.getPassword());
            passwordMatch = password.equals(hashedStoredPassword);
        }
        
        if (!passwordMatch) {
            throw new RuntimeException("Invalid password");
        }
        
        if (!"active".equals(user.getStatus())) {
            throw new RuntimeException("User account is inactive");
        }
        
        return user;
    }
    
    // 切換用戶狀態
    public User toggleUserStatus(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        
        String newStatus = "active".equals(user.getStatus()) ? "inactive" : "active";
        user.setStatus(newStatus);
        
        return userRepository.save(user);
    }
    
    // 獲取用戶統計數據
    public UserStats getUserStats() {
        long totalUsers = userRepository.count();
        long activeUsers = userRepository.countByStatus("active");
        
        // 從訂單數據獲取統計
        Long totalOrders = orderRepository.countTotalOrders();
        Double totalRevenue = orderRepository.sumTotalRevenue();
        
        return new UserStats(totalUsers, totalOrders != null ? totalOrders : 0, 
                           totalRevenue != null ? totalRevenue.longValue() : 0, activeUsers);
    }
    
    // 根據角色獲取用戶
    public List<User> getUsersByRole(String role) {
        return userRepository.findByRole(role);
    }
    
    // 用戶統計 DTO
    public static class UserStats {
        private long totalUsers;
        private long totalOrders;
        private long totalRevenue;
        private long activeUsers;
        
        public UserStats(long totalUsers, long totalOrders, long totalRevenue, long activeUsers) {
            this.totalUsers = totalUsers;
            this.totalOrders = totalOrders;
            this.totalRevenue = totalRevenue;
            this.activeUsers = activeUsers;
        }
        
        public long getTotalUsers() { return totalUsers; }
        public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }
        public long getTotalOrders() { return totalOrders; }
        public void setTotalOrders(long totalOrders) { this.totalOrders = totalOrders; }
        public long getTotalRevenue() { return totalRevenue; }
        public void setTotalRevenue(long totalRevenue) { this.totalRevenue = totalRevenue; }
        public long getActiveUsers() { return activeUsers; }
        public void setActiveUsers(long activeUsers) { this.activeUsers = activeUsers; }
    }
}