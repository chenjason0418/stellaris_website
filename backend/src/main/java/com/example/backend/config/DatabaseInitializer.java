package com.example.backend.config;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.backend.entity.Order;
import com.example.backend.entity.OrderItem;
import com.example.backend.entity.Product;
import com.example.backend.entity.User;
import com.example.backend.repository.OrderItemRepository;
import com.example.backend.repository.OrderRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.PasswordService;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private OrderItemRepository orderItemRepository;
    
    @Autowired
    private PasswordService passwordService;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("檢查資料庫狀態...");
        
        // 分別檢查各個表格，缺少什麼就初始化什麼
        System.out.println("用戶數量: " + userRepository.count());
        System.out.println("商品數量: " + productRepository.count());
        System.out.println("訂單數量: " + orderRepository.count());
        
        boolean needsUserInit = userRepository.count() == 0;
        boolean needsProductInit = productRepository.count() == 0;
        boolean needsOrderInit = orderRepository.count() == 0;
        
        if (needsUserInit || needsProductInit || needsOrderInit) {
            System.out.println("開始初始化缺少的資料...");
            
            if (needsUserInit) {
                System.out.println("初始化用戶資料...");
                initializeUsers();
            }
            
            if (needsProductInit) {
                System.out.println("初始化商品資料...");
                initializeProducts();
            }
            
            // 訂單初始化需要等用戶和商品都存在
            if (needsOrderInit) {
                System.out.println("初始化訂單資料...");
                // 如果用戶和商品剛被初始化，需要確保訂單初始化能找到它們
                if (userRepository.count() > 0 && productRepository.count() > 0) {
                    initializeOrders();
                } else {
                    System.out.println("跳過訂單初始化：需要先有用戶和商品資料");
                }
            }
            
            System.out.println("資料初始化完成！");
        } else {
            System.out.println("所有資料都已存在，跳過初始化。");
        }
    }
    
    private void initializeUsers() {
        System.out.println("正在初始化用戶資料...");
        
        // 創建管理員用戶
        User admin = new User();
        admin.setName("系統管理員");
        admin.setEmail("admin@stellaris.com");
        admin.setPassword(passwordService.hashPassword("admin123"));
        admin.setRole("admin");
        admin.setStatus("active");
        admin.setRegisteredDate(LocalDateTime.now().minusDays(100));
        userRepository.save(admin);
        
        // 創建一般用戶
        User user1 = new User();
        user1.setName("張小明");
        user1.setEmail("user@stellaris.com");
        user1.setPassword(passwordService.hashPassword("user123"));
        user1.setRole("user");
        user1.setStatus("active");
        user1.setRegisteredDate(LocalDateTime.now().minusDays(80));
        userRepository.save(user1);
        
        User user2 = new User();
        user2.setName("李小華");
        user2.setEmail("test@stellaris.com");
        user2.setPassword(passwordService.hashPassword("test123"));
        user2.setRole("user");
        user2.setStatus("active");
        user2.setRegisteredDate(LocalDateTime.now().minusDays(60));
        userRepository.save(user2);
        
        User user3 = new User();
        user3.setName("王大偉");
        user3.setEmail("wang@stellaris.com");
        user3.setPassword(passwordService.hashPassword("wang123"));
        user3.setRole("user");
        user3.setStatus("inactive");
        user3.setRegisteredDate(LocalDateTime.now().minusDays(40));
        userRepository.save(user3);
        
        User user4 = new User();
        user4.setName("陳美玲");
        user4.setEmail("chen@stellaris.com");
        user4.setPassword(passwordService.hashPassword("chen123"));
        user4.setRole("user");
        user4.setStatus("active");
        user4.setRegisteredDate(LocalDateTime.now().minusDays(20));
        userRepository.save(user4);
        
        // 添加更多測試用戶
        for (int i = 1; i <= 5; i++) {
            User testUser = new User();
            testUser.setName("測試用戶 " + i);
            testUser.setEmail("testuser" + i + "@stellaris.com");
            testUser.setPassword(passwordService.hashPassword("test123"));
            testUser.setRole("user");
            testUser.setStatus(i % 4 == 0 ? "inactive" : "active");
            testUser.setRegisteredDate(LocalDateTime.now().minusDays(i * 5));
            userRepository.save(testUser);
        }
        
        System.out.println("用戶數據初始化完成！共創建了 " + userRepository.count() + " 個用戶。");
    }
    
    private void initializeProducts() {
        System.out.println("正在初始化商品數據...");
        
        // 創建測試商品
        Product product1 = new Product();
        product1.setName("望遠鏡模型");
        product1.setDescription("精緻的哈伯太空望遠鏡模型，完美的桌面裝飾");
        product1.setPrice(299.0);
        product1.setStock(15);
        product1.setImage("Hubble_Space_Telescope_model.png");
        productRepository.save(product1);

        Product product2 = new Product();
        product2.setName("星空海報");
        product2.setDescription("高品質星雲印刷海報，為您的房間增添宇宙氛圍");
        product2.setPrice(89.0);
        product2.setStock(25);
        product2.setImage("Nebula_printed_poster.png");
        productRepository.save(product2);

        Product product3 = new Product();
        product3.setName("太陽系模型");
        product3.setDescription("可動式太陽系模型，教育與裝飾兼具");
        product3.setPrice(599.0);
        product3.setStock(15);
        product3.setImage("Solar_System_Model.png");
        productRepository.save(product3);

        Product product4 = new Product();
        product4.setName("宇宙馬克杯");
        product4.setDescription("星空圖案陶瓷馬克杯，讓每一口咖啡都充滿宇宙能量");
        product4.setPrice(129.0);
        product4.setStock(50);
        product4.setImage("Cosmic_mug.png");
        productRepository.save(product4);

        Product product5 = new Product();
        product5.setName("火箭模型");
        product5.setDescription("1:100比例火箭模型，重現人類探索太空的壯舉");
        product5.setPrice(399.0);
        product5.setStock(5);
        product5.setImage("Rocket_model.png");
        productRepository.save(product5);

        Product product6 = new Product();
        product6.setName("極光明信片套組");
        product6.setDescription("精美極光攝影明信片，6張不同極光景象");
        product6.setPrice(59.0);
        product6.setStock(99);
        product6.setImage("Aurora_postcard_set.png");
        productRepository.save(product6);

        System.out.println("商品數據初始化完成！共創建了 " + productRepository.count() + " 個商品。");
    }
    
    private void initializeOrders() {
        System.out.println("正在初始化訂單數據...");
        
        // 獲取用戶和商品進行測試訂單創建
        User user1 = userRepository.findByEmail("user@stellaris.com").orElse(null);
        User user2 = userRepository.findByEmail("test@stellaris.com").orElse(null);
        User user3 = userRepository.findByEmail("chen@stellaris.com").orElse(null);
        
        Product product1 = productRepository.findByName("望遠鏡模型").orElse(null);
        Product product2 = productRepository.findByName("星空海報").orElse(null);
        Product product3 = productRepository.findByName("太陽系模型").orElse(null);
        
        if (user1 != null && product1 != null && product2 != null) {
            // 創建第一個測試訂單（已確認）
            double totalAmount1 = product1.getPrice() + product2.getPrice(); // 299.0 + 89.0 = 388.0
            Order order1 = new Order(user1, totalAmount1, 2, Order.OrderStatus.CONFIRMED);
            order1.setOrderDate(LocalDateTime.now().minusDays(5));
            order1 = orderRepository.save(order1);
            
            OrderItem item1_1 = new OrderItem(order1, product1, 1, product1.getPrice());
            OrderItem item1_2 = new OrderItem(order1, product2, 1, product2.getPrice());
            orderItemRepository.save(item1_1);
            orderItemRepository.save(item1_2);
        }
        
        if (user2 != null && product3 != null) {
            // 創建第二個測試訂單（已出貨）
            double totalAmount2 = product3.getPrice(); // 599.0
            Order order2 = new Order(user2, totalAmount2, 1, Order.OrderStatus.SHIPPED);
            order2.setOrderDate(LocalDateTime.now().minusDays(3));
            order2 = orderRepository.save(order2);
            
            OrderItem item2_1 = new OrderItem(order2, product3, 1, product3.getPrice());
            orderItemRepository.save(item2_1);
        }
        
        if (user3 != null && product1 != null) {
            // 創建第三個測試訂單（待處理）
            double totalAmount3 = product1.getPrice(); // 299.0
            Order order3 = new Order(user3, totalAmount3, 1, Order.OrderStatus.PENDING);
            order3.setOrderDate(LocalDateTime.now().minusDays(1));
            order3 = orderRepository.save(order3);
            
            OrderItem item3_1 = new OrderItem(order3, product1, 1, product1.getPrice());
            orderItemRepository.save(item3_1);
        }
        
        System.out.println("訂單數據初始化完成！共創建了 " + orderRepository.count() + " 個訂單。");
    }
}