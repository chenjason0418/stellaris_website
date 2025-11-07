package com.example.backend.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.backend.security.JwtAuthenticationFilter;
import com.example.backend.service.JwtService;
import com.example.backend.service.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private UserService userService;
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 配置 CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            
            // 禁用 CSRF（使用 REST API）
            .csrf(csrf -> csrf
                .ignoringRequestMatchers("/h2-console/**")
                .disable()
            )
            
            // 配置會話管理
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            
            // 配置授權規則
            .authorizeHttpRequests(authz -> authz
                // 公開端點
                .requestMatchers("/api/users/login", "/api/users/register", "/api/users/validate-token").permitAll()
                // 允許 H2 控制台
                .requestMatchers("/h2-console/**").permitAll()
                
                // 管理員專用端點
                .requestMatchers("/api/orders/all").hasAnyAuthority("ROLE_ADMIN", "ADMIN")
                .requestMatchers("/api/users").hasAnyAuthority("ROLE_ADMIN", "ADMIN")
                
                // 其他訂單相關端點需要認證
                .requestMatchers("/api/orders/checkout").authenticated()
                .requestMatchers("/api/orders/**").authenticated()
                
                // 其他請求需要認證
                .anyRequest().authenticated()
            )
            
            // 允許 H2 控制台在 iframe 中運行，並禁用 X-Frame-Options
            .headers(headers -> headers
                .frameOptions(frameOptions -> frameOptions.disable())
            )
            
            // 添加 JWT 過濾器
            .addFilterBefore(new JwtAuthenticationFilter(jwtService, userService), 
                           UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // 允許的來源（開發環境）
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:4200",
            "http://localhost:3000",
            "http://127.0.0.1:4200"
        ));
        
        // 允許的 HTTP 方法
        configuration.setAllowedMethods(Arrays.asList(
            "GET", "POST", "PUT", "DELETE", "OPTIONS"
        ));
        
        // 允許的請求頭
        configuration.setAllowedHeaders(Arrays.asList(
            "Content-Type", "Authorization", "X-Requested-With"
        ));
        
        // 允許憑證
        configuration.setAllowCredentials(true);
        
        // 請求的有效期
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        
        return source;
    }
}