package com.example.backend.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.backend.service.JwtService;
import com.example.backend.service.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserService userService;

    public JwtAuthenticationFilter(JwtService jwtService, UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        // 如果沒有 Authorization header 或者不是以 Bearer 開頭，直接放行
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // 從 header 中提取 token
            String token = authHeader.substring(7);

            // 驗證 token
            if (jwtService.validateToken(token)) {
                // 從 token 中提取用戶信息
                String userEmail = jwtService.extractEmail(token);
                Long userId = jwtService.extractUserId(token);

                // 獲取用戶角色並正確處理前綴
                String role = jwtService.extractRole(token);
                List<SimpleGrantedAuthority> authorities = new ArrayList<>();
                
                // 檢查角色是否已經包含 ROLE_ 前綴
                String roleWithPrefix = role.toUpperCase().startsWith("ROLE_") ? 
                    role.toUpperCase() : "ROLE_" + role.toUpperCase();
                authorities.add(new SimpleGrantedAuthority(roleWithPrefix));
                
                // 創建認證對象
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    userEmail, null, authorities
                );

                // 將認證信息設置到 SecurityContext 中
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            logger.error("無法設置用戶認證: {}", e);
        }

        filterChain.doFilter(request, response);
    }
}