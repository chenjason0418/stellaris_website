package com.example.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

/**
 * H2 資料庫設定類
 * 
 * H2 資料庫的主要設定在 application.properties 中：
 * - spring.datasource.url=jdbc:h2:file:./data/stellaris
 * - spring.h2.console.enabled=true
 * - spring.h2.console.path=/h2-console
 * 
 * 存取 H2 控制台：http://localhost:8080/h2-console
 * 連接設定：
 * - JDBC URL: jdbc:h2:file:./data/stellaris
 * - User Name: sa
 * - Password: password
 */
@Configuration
@Profile({"dev", "test", "default"}) // 只在開發和測試環境啟用
public class H2DatabaseConfig {
    
    // H2 的設定主要透過 application.properties 進行
    // 此類別保留用於未來可能的額外設定
    
}