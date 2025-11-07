# 🚀 Stellaris 宇宙探索電商平台 - 後端 API

<div align="center">

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.6-brightgreen?style=for-the-badge&logo=spring-boot)
![Java](https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=openjdk)
![H2 Database](https://img.shields.io/badge/H2%20Database-Latest-blue?style=for-the-badge&logo=h2)
![Maven](https://img.shields.io/badge/Maven-3.8+-red?style=for-the-badge&logo=apache-maven)
![JWT](https://img.shields.io/badge/JWT-0.11.5-purple?style=for-the-badge&logo=json-web-tokens)

**Stellaris 後端是一個現代化的 RESTful API 服務，基於 Spring Boot 3.5.6 和 Java 21 構建，為宇宙主題電商平台提供強大的後端支援。**

</div>

## ✨ 架構亮點

### 🏗️ 現代化技術棧
- **🍃 Spring Boot 3.5.6**：最新的企業級 Java 框架
- **☕ Java 21**：LTS 版本，享受最新語言特性
- **🗄️ H2 Database**：輕量級嵌入式資料庫，開發友好
- **🔐 Spring Security**：企業級安全框架
- **🎯 JWT 認證**：無狀態認證機制

### 🎯 業務功能
- **👥 用戶管理系統**：註冊、登入、權限控制
- **🛍️ 商品管理**：完整的商品 CRUD 操作
- **🛒 購物車系統**：即時購物車狀態管理
- **📦 訂單管理**：完整的訂單生命週期管理
- **🔒 安全認證**：密碼加密、JWT Token 認證

### 🚀 開發體驗
- **⚡ 熱重載**：Spring Boot DevTools 支援
- **🧪 完整測試**：單元測試與整合測試
- **🔧 開發工具**：H2 Web Console 除錯介面
- **📝 API 文檔**：清晰的端點說明與範例

## 🎯 核心業務模組

### 👥 用戶管理系統 (User Management)
**提供完整的用戶生命週期管理**
- **🔐 認證功能**
  - 用戶註冊與 Email 唯一性檢查
  - 安全登入與 JWT Token 生成
  - BCrypt 密碼加密（強度等級 12）
  - 自動登出與 Token 失效處理
  
- **👤 用戶資料管理**
  - 個人資料 CRUD 操作
  - 用戶狀態管理（活躍/非活躍）
  - 多角色權限控制（管理員/一般用戶）
  - 註冊時間追蹤

### 🛍️ 商品管理系統 (Product Management)
**全方位商品資料管理平台**
- **📦 商品資料**
  - 商品基本資訊（名稱、描述、價格）
  - 庫存數量即時管理
  - 商品圖片路徑存儲
  - 商品狀態控制
  
- **🔍 查詢功能**
  - 分頁查詢大量商品
  - 按條件篩選商品
  - 庫存警告提醒

### 🛒 智能購物車系統 (Cart Management)
**即時購物車狀態同步**
- **💾 購物車操作**
  - 添加商品到購物車
  - 數量即時調整
  - 商品移除與清空
  - 購物車數據持久化
  
- **🧮 計算功能**
  - 商品小計自動計算
  - 購物車總價即時更新
  - 庫存驗證與提醒

### 📦 訂單管理系統 (Order Management)
**完整的訂單生命週期管理**
- **🏪 訂單處理**
  - 購物車轉訂單功能
  - 訂單詳情完整記錄
  - 訂單狀態流程管理
  - 訂單歷史查詢
  
- **📊 管理功能**
  - 管理員訂單總覽
  - 訂單狀態批量更新
  - 用戶訂單權限控制
  - 訂單統計與報表

### 🔒 安全認證系統 (Security & Authentication)
**企業級安全保障**
- **🛡️ 認證機制**
  - JWT 無狀態認證
  - Token 自動刷新機制
  - 角色基礎的訪問控制 (RBAC)
  - CORS 跨域資源共享
  
- **🔐 資料保護**
  - 密碼安全存儲
  - 敏感資料加密
  - SQL 注入防護
  - XSS 攻擊防護

## 🛠 技術架構

### 🏗️ 核心框架與版本
| 技術組件 | 版本 | 用途與特色 |
|----------|------|------------|
| **Spring Boot** | 3.5.6 | 🍃 企業級微服務框架，提供自動配置與內嵌服務器 |
| **Spring Data JPA** | 3.5.6 | 🗃️ 資料持久化層，簡化資料庫操作 |
| **Spring Security** | 3.5.6 | 🛡️ 認證授權框架，提供企業級安全保護 |
| **Spring Web** | 3.5.6 | 🌐 RESTful Web 服務層，支援 MVC 模式 |
| **Spring Validation** | 3.5.6 | ✅ 數據驗證框架，確保輸入資料正確性 |

### 💾 資料存儲技術
| 技術組件 | 版本 | 用途與特色 |
|----------|------|------------|
| **H2 Database** | Latest | 🗄️ 輕量級嵌入式資料庫，開發測試理想選擇 |
| **Hibernate** | 6.4.x | 🔄 強大的 ORM 框架，物件關聯映射 |
| **JPA** | 3.1.x | 📋 Java 持久化 API 標準，資料訪問抽象層 |

### 🔐 安全與認證
| 技術組件 | 版本 | 用途與特色 |
|----------|------|------------|
| **JWT (jjwt)** | 0.11.5 | 🎫 JSON Web Token，無狀態認證機制 |
| **BCrypt** | 內建 | 🔒 密碼哈希算法，高安全性密碼存儲 |

### 🧪 開發與測試工具
| 技術組件 | 版本 | 用途與特色 |
|----------|------|------------|
| **Maven** | 3.8+ | 📦 專案管理工具，依賴管理與建置自動化 |
| **Spring Boot DevTools** | 3.5.6 | ⚡ 開發工具，熱重載與自動重啟 |
| **JUnit 5** | 5.10.x | 🧪 現代化測試框架，單元測試與整合測試 |
| **Spring Security Test** | 3.5.6 | 🔍 安全層測試工具，認證授權測試 |

### ☕ 運行環境
| 環境組件 | 版本要求 | 說明 |
|----------|----------|------|
| **Java** | 21 (LTS) | ☕ 最新長期支援版本，享受現代語言特性 |
| **Maven** | 3.8+ | 🏗️ 建置工具，專案管理與依賴解析 |
| **JVM** | OpenJDK 21+ | 🖥️ 推薦使用 OpenJDK 或 Oracle JDK |

## 📁 專案架構與設計模式

### 🏗️ 整體架構設計
```
backend/
├── 📂 src/main/java/com/example/backend/    # 主要應用程式碼
│   ├── 🚀 BackendApplication.java           # Spring Boot 應用程式入口點
│   ├── 📂 config/                           # 系統配置層
│   │   ├── DatabaseInitializer.java        # 資料庫初始化與測試資料
│   │   ├── H2DatabaseConfig.java           # H2 資料庫專用配置
│   │   └── SecurityConfig.java             # Spring Security 安全配置
│   ├── 📂 controller/                       # REST API 控制層
│   │   ├── UserController.java             # 用戶管理 API
│   │   ├── ProductController.java          # 商品管理 API
│   │   ├── CartController.java             # 購物車 API
│   │   ├── OrderController.java            # 訂單管理 API
│   │   └── TestController.java             # 系統測試 API
│   ├── 📂 dto/                              # 數據傳輸對象層
│   │   ├── LoginRequest.java               # 登入請求 DTO
│   │   ├── LoginResponseDto.java           # 登入響應 DTO
│   │   ├── CheckoutRequest.java            # 結帳請求 DTO
│   │   └── OrderDTO.java                   # 訂單數據傳輸對象
│   ├── 📂 entity/                           # 資料實體層
│   │   ├── User.java                       # 用戶資料實體
│   │   ├── Product.java                    # 商品資料實體
│   │   ├── CartItem.java                   # 購物車項目實體
│   │   ├── Order.java                      # 訂單主體實體
│   │   └── OrderItem.java                  # 訂單項目實體
│   ├── 📂 repository/                       # 資料存取層
│   │   ├── UserRepository.java             # 用戶資料存取介面
│   │   ├── ProductRepository.java          # 商品資料存取介面
│   │   ├── CartItemRepository.java         # 購物車資料存取介面
│   │   ├── OrderRepository.java            # 訂單資料存取介面
│   │   └── OrderItemRepository.java        # 訂單項目資料存取介面
│   ├── 📂 service/                          # 業務邏輯層
│   │   ├── UserService.java                # 用戶業務邏輯服務
│   │   ├── ProductService.java             # 商品業務邏輯服務
│   │   ├── CartService.java                # 購物車業務邏輯服務
│   │   ├── OrderService.java               # 訂單業務邏輯服務
│   │   ├── PasswordService.java            # 密碼加密服務
│   │   └── JwtService.java                 # JWT Token 管理服務
│   ├── 📂 security/                         # 安全相關組件
│   │   └── JwtAuthenticationFilter.java    # JWT 認證過濾器
│   └── 📂 mapper/                           # 物件映射層
│       └── EntityMapper.java               # 實體與 DTO 轉換映射器
├── 📂 src/main/resources/                   # 應用程式資源
│   ├── application.properties              # 主要應用程式配置檔案
│   ├── 📂 static/                          # 靜態資源檔案
│   └── 📂 templates/                       # 模板檔案
├── 📂 src/test/java/                        # 測試程式碼
├── 📂 data/                                # H2 資料庫檔案
├── 📂 target/                              # Maven 建置輸出目錄
├── 📄 pom.xml                              # Maven 專案配置
└── 📚 README.md                            # 專案說明文檔
```

### 🏛️ 架構設計原則

#### 🔄 分層架構 (Layered Architecture)
- **Controller Layer**: 處理 HTTP 請求，參數驗證，回應格式化
- **Service Layer**: 核心業務邏輯，事務管理，資料轉換
- **Repository Layer**: 資料存取抽象，CRUD 操作，查詢定義
- **Entity Layer**: 資料模型定義，JPA 註解，資料庫映射

#### 🔧 依賴注入 (Dependency Injection)
- 使用 Spring 的 IoC 容器管理 Bean 生命週期
- `@Autowired` 自動裝配依賴關係
- 介面導向程式設計，提高可測試性

#### 🛡️ 安全設計模式
- JWT 無狀態認證機制
- 角色基礎存取控制 (RBAC)
- 密碼加密與安全存儲
- CORS 跨域資源共享配置

## 🚀 快速啟動指南

### 📋 環境準備
| 環境組件 | 版本要求 | 檢查命令 | 下載連結 |
|----------|----------|----------|----------|
| **☕ Java** | 21+ (LTS) | `java --version` | [OpenJDK](https://adoptium.net/) |
| **📦 Maven** | 3.8+ | `mvn --version` | [Apache Maven](https://maven.apache.org/) |
| **🖥️ IDE** | 推薦 | - | [IntelliJ IDEA](https://www.jetbrains.com/idea/) / [VS Code](https://code.visualstudio.com/) |

### ⚡ 一鍵啟動

#### 🔄 方式一：使用 Maven Wrapper (推薦)
```bash
# 克隆專案
git clone https://github.com/chenjason0418/stellaris_website.git
cd stellaris_website/backend

# Windows 用戶
.\mvnw.cmd spring-boot:run

# macOS/Linux 用戶  
./mvnw spring-boot:run
```

#### 🔄 方式二：使用本地 Maven
```bash
# 克隆專案
git clone https://github.com/chenjason0418/stellaris_website.git
cd stellaris_website/backend

# 清理並安裝依賴
mvn clean install

# 啟動應用程式
mvn spring-boot:run
```

#### 🔄 方式三：JAR 檔案執行
```bash
# 建置 JAR 檔案
mvn clean package

# 執行 JAR 檔案
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

### ✅ 啟動驗證

#### 🌐 快速健康檢查
```bash
# 測試 API 連線
curl http://localhost:8080/api/test

# 預期回應
"後端服務運行正常！當前時間：{timestamp}"
```

#### 🔍 詳細檢查清單
| 檢查項目 | URL | 預期結果 |
|----------|-----|----------|
| **API 測試** | http://localhost:8080/api/test | ✅ 正常回應訊息 |
| **CORS 測試** | http://localhost:8080/api/test/cors | ✅ CORS 標頭正確 |
| **H2 控制台** | http://localhost:8080/h2-console | 🗄️ 資料庫管理介面 |
| **商品 API** | http://localhost:8080/api/products | 📦 商品列表 JSON |
| **用戶 API** | http://localhost:8080/api/users | 👥 用戶列表 JSON |

### 🛠️ 開發指令集

#### 📋 基本操作
```bash
# 編譯專案（不執行測試）
mvn compile

# 清理建置檔案
mvn clean

# 執行所有測試
mvn test

# 跳過測試進行打包
mvn package -DskipTests

# 完整建置流程
mvn clean compile test package
```

#### 🔧 進階操作
```bash
# 生成專案報告
mvn site

# 檢查依賴更新
mvn versions:display-dependency-updates

# 檢查外掛更新
mvn versions:display-plugin-updates

# 查看依賴樹
mvn dependency:tree
```

### 🔥 開發模式啟動

#### ⚡ 熱重載開發
```bash
# 啟動開發模式（支援熱重載）
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# 或設定環境變數
export SPRING_PROFILES_ACTIVE=dev
mvn spring-boot:run
```

#### 🐛 除錯模式
```bash
# 啟動除錯模式（監聽 5005 端口）
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005"
```

### 🚨 常見問題排解

#### ❌ 問題：Port 8080 already in use
```bash
# 查找佔用端口的程序
netstat -ano | findstr :8080  # Windows
lsof -i :8080                 # macOS/Linux

# 使用不同端口啟動
mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=8081
```

#### ❌ 問題：Java version mismatch
```bash
# 檢查 Java 版本
java --version
javac --version

# 設定 JAVA_HOME（如需要）
export JAVA_HOME=/path/to/java21  # macOS/Linux
set JAVA_HOME=C:\path\to\java21   # Windows
```

## 🗄 資料庫配置

### H2 資料庫特色
- **嵌入式**：無需額外安裝資料庫軟體
- **持久化**：資料保存在本地檔案 `./data/stellaris.mv.db`
- **Web 控制台**：提供圖形化管理介面
- **開發友好**：支援 SQL 除錯和資料檢視

### 資料庫連線資訊
- **JDBC URL**: `jdbc:h2:file:./data/stellaris`
- **用戶名**: `sa`
- **密碼**: `password`
- **驅動程式**: `org.h2.Driver`

### Web 控制台存取
- **URL**: http://localhost:8080/h2-console
- **登入資訊**: 使用上述連線資訊

### 資料表結構

#### Users (用戶表)
- `id`: 主鍵
- `name`: 用戶姓名
- `email`: 電子郵件（唯一）
- `password`: 加密密碼
- `role`: 用戶角色（admin/user）
- `status`: 用戶狀態（active/inactive）
- `registered_date`: 註冊日期

#### Products (商品表)
- `id`: 主鍵
- `name`: 商品名稱
- `description`: 商品描述
- `price`: 商品價格
- `stock`: 庫存數量
- `image`: 商品圖片

#### Orders (訂單表)
- `id`: 主鍵
- `user_id`: 用戶 ID（外鍵）
- `total_amount`: 訂單總金額
- `total_items`: 商品總數量
- `status`: 訂單狀態
- `order_date`: 訂單日期

#### Order_Items (訂單項目表)
- `id`: 主鍵
- `order_id`: 訂單 ID（外鍵）
- `product_id`: 商品 ID（外鍵）
- `quantity`: 數量
- `price`: 單價

#### Cart_Items (購物車表)
- `id`: 主鍵
- `user_id`: 用戶 ID（外鍵）
- `product_id`: 商品 ID（外鍵）
- `quantity`: 數量

## � RESTful API 文檔

### 🔐 認證機制

#### 🎫 JWT Token 使用方式
```bash
# 在 HTTP 標頭中加入 Token
Authorization: Bearer <your-jwt-token>

# 範例 CURL 請求
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..." \
     http://localhost:8080/api/users
```

#### 🔑 權限等級說明
| 權限等級 | Role | 描述 | 可存取資源 |
|----------|------|------|------------|
| **🌟 管理員** | `ADMIN` | 系統管理員 | 所有 API + 用戶管理 |
| **👤 用戶** | `USER` | 一般用戶 | 個人資料 + 商品瀏覽 + 訂單管理 |
| **🌐 訪客** | `GUEST` | 未登入用戶 | 商品瀏覽 + 註冊登入 |

---

### 👤 用戶管理 API

#### 📝 用戶註冊
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**回應範例**
```json
{
  "success": true,
  "message": "用戶註冊成功",
  "data": {
    "id": 1,
    "name": "johndoe",
    "email": "john@example.com",
    "role": "USER",
    "registeredDate": "2024-01-01T12:00:00"
  }
}
```

#### 🔐 用戶登入
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**回應範例**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "name": "johndoe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

#### 👥 獲取用戶列表
```http
GET /api/users
Authorization: Bearer <admin-token>
```

| 參數 | 類型 | 描述 | 範例 |
|------|------|------|------|
| `page` | Integer | 頁碼（從 0 開始） | `?page=0` |
| `size` | Integer | 每頁筆數 | `?size=10` |
| `sort` | String | 排序欄位 | `?sort=name,asc` |

#### 🔍 獲取特定用戶
```http
GET /api/users/{id}
Authorization: Bearer <user-token>
```

#### 🔄 更新用戶狀態
```http
PUT /api/users/{id}/status
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "ACTIVE"
}
```

---

### 🛍️ 商品管理 API

#### 📦 獲取商品列表
```http
GET /api/products
```

**查詢參數**
| 參數 | 類型 | 描述 | 範例值 |
|------|------|------|--------|
| `category` | String | 商品分類 | `electronics` |
| `minPrice` | Number | 最低價格 | `100` |
| `maxPrice` | Number | 最高價格 | `1000` |
| `search` | String | 關鍵字�尋 | `telescope` |

**回應範例**
```json
{
  "content": [
    {
      "id": 1,
      "name": "專業天文望遠鏡",
      "description": "高倍率專業天文觀測設備",
      "price": 25999.00,
      "stock": 15,
      "image": "telescope.jpg",
      "createdAt": "2024-01-01T12:00:00"
    }
  ],
  "totalElements": 50,
  "totalPages": 5,
  "currentPage": 0
}
```

#### 🔍 獲取特定商品
```http
GET /api/products/{id}
```

#### ➕ 新增商品
```http
POST /api/products
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "新商品",
  "description": "商品描述",
  "price": 999.99,
  "stock": 100,
  "image": "product.jpg"
}
```

#### ✏️ 更新商品
```http
PUT /api/products/{id}
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "更新後的商品名稱",
  "price": 1299.99,
  "stock": 80
}
```

#### ❌ 刪除商品
```http
DELETE /api/products/{id}
Authorization: Bearer <admin-token>
```

---

### 🛒 購物車管理 API

#### 📋 查看購物車
```http
GET /api/cart/{userId}
Authorization: Bearer <user-token>
```

**回應範例**
```json
{
  "userId": 1,
  "items": [
    {
      "id": 1,
      "productId": 1,
      "productName": "專業天文望遠鏡",
      "quantity": 2,
      "price": 25999.00,
      "subtotal": 51998.00
    }
  ],
  "totalItems": 2,
  "totalAmount": 51998.00
}
```

#### ➕ 加入購物車
```http
POST /api/cart/add
Authorization: Bearer <user-token>
Content-Type: application/json

{
  "userId": 1,
  "productId": 1,
  "quantity": 2
}
```

#### 🔄 更新購物車數量
```http
PUT /api/cart/update
Authorization: Bearer <user-token>
Content-Type: application/json

{
  "userId": 1,
  "productId": 1,
  "quantity": 3
}
```

#### ➖ 移除購物車商品
```http
DELETE /api/cart/{userId}/{productId}
Authorization: Bearer <user-token>
```

#### 🗑️ 清空購物車
```http
DELETE /api/cart/{userId}
Authorization: Bearer <user-token>
```

---

### 📋 訂單管理 API

#### 📊 獲取所有訂單
```http
GET /api/orders
Authorization: Bearer <admin-token>
```

#### 🔍 獲取用戶訂單
```http
GET /api/orders/user/{userId}
Authorization: Bearer <user-token>
```

**回應範例**
```json
{
  "orders": [
    {
      "id": 1,
      "userId": 1,
      "totalAmount": 51998.00,
      "totalItems": 2,
      "status": "COMPLETED",
      "orderDate": "2024-01-01T12:00:00",
      "orderItems": [
        {
          "id": 1,
          "productId": 1,
          "productName": "專業天文望遠鏡",
          "quantity": 2,
          "price": 25999.00
        }
      ]
    }
  ]
}
```

#### 🛒 建立訂單
```http
POST /api/orders/checkout
Authorization: Bearer <user-token>
Content-Type: application/json

{
  "userId": 1,
  "orderItems": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 25999.00
    }
  ]
}
```

#### 📈 更新訂單狀態
```http
PUT /api/orders/{id}/status
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "SHIPPED"
}
```

**訂單狀態說明**
| 狀態碼 | 中文說明 | 描述 |
|--------|----------|------|
| `PENDING` | 待處理 | 訂單已建立，等待處理 |
| `CONFIRMED` | 已確認 | 訂單已確認，準備出貨 |
| `SHIPPED` | 已出貨 | 商品已寄出 |
| `DELIVERED` | 已送達 | 商品已送達客戶 |
| `CANCELLED` | 已取消 | 訂單已取消 |

---

### 🔧 測試與工具 API

#### ⚡ 系統健康檢查
```http
GET /api/test
```

**回應範例**
```json
{
  "message": "後端服務運行正常！",
  "timestamp": "2024-01-01T12:00:00",
  "version": "1.0.0"
}
```

#### 🌐 CORS 測試
```http
GET /api/test/cors
```

#### 🛡️ 驗證測試
```http
GET /api/test/auth
Authorization: Bearer <token>
```

---

### 🚨 錯誤處理

#### HTTP 狀態碼說明
| 狀態碼 | 說明 | 常見原因 |
|--------|------|----------|
| `200` | ✅ 成功 | 請求處理成功 |
| `201` | ✅ 已建立 | 資源建立成功 |
| `400` | ❌ 請求錯誤 | 參數格式錯誤 |
| `401` | 🔒 未授權 | Token 無效或過期 |
| `403` | 🚫 禁止存取 | 權限不足 |
| `404` | 🔍 找不到 | 資源不存在 |
| `409` | ⚠️ 衝突 | 資源已存在 |
| `500` | 💥 伺服器錯誤 | 系統內部錯誤 |

#### 標準錯誤回應格式
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "輸入資料驗證失敗",
    "details": [
      {
        "field": "email",
        "message": "電子郵件格式不正確"
      }
    ]
  },
  "timestamp": "2024-01-01T12:00:00"
}
```

#### 常見錯誤代碼
| 錯誤代碼 | 說明 | 解決方法 |
|----------|------|----------|
| `USER_NOT_FOUND` | 用戶不存在 | 檢查用戶 ID 是否正確 |
| `INVALID_CREDENTIALS` | 登入憑證無效 | 確認帳號密碼正確 |
| `INSUFFICIENT_STOCK` | 庫存不足 | 減少購買數量或聯絡客服 |
| `ORDER_NOT_FOUND` | 訂單不存在 | 檢查訂單 ID 是否正確 |
| `UNAUTHORIZED_ACCESS` | 未授權存取 | 檢查 JWT Token 有效性 |

## 🔒 安全配置

### 密碼加密
- 使用 BCrypt 演算法
- 隨機鹽值生成
- 安全強度等級：12

### CORS 設定
- 允許來源：`http://localhost:4200`
- 允許方法：GET, POST, PUT, DELETE, OPTIONS
- 允許標頭：所有
- 支援認證：是

### 安全端點
- 大部分 API 端點開放存取（開發階段）
- H2 控制台僅開發環境啟用
- 生產環境需要額外的認證機制

## 📊 資料初始化

系統啟動時會自動初始化測試資料：

### 預設用戶
- **管理員**: admin@stellaris.com / admin123
- **一般用戶**: user@stellaris.com / user123
- **測試用戶**: test@stellaris.com / test123

### 預設商品
- 望遠鏡模型 - $299
- 星空海報 - $89
- 太陽系模型 - $599
- 宇宙馬克杯 - $129
- 火箭模型 - $399
- 極光明信片套組 - $59

### 測試訂單
- 系統會自動建立幾筆測試訂單
- 包含不同的訂單狀態（待處理、已確認、已出貨）

## 🧪 測試指南

### 🔬 測試策略

#### 📊 測試金字塔
```
    🔺 E2E Tests (端到端測試)
   🔶 Integration Tests (整合測試)  
  🔸 Unit Tests (單元測試)
```

#### 🎯 測試覆蓋率目標
| 測試類型 | 目標覆蓋率 | 重點領域 |
|----------|------------|----------|
| **單元測試** | > 80% | Service, Repository, Util 層 |
| **整合測試** | > 60% | Controller, Database 整合 |
| **端到端測試** | > 40% | 關鍵業務流程 |

---

### ⚡ 快速測試執行

#### 🏃‍♂️ 基本測試指令
```bash
# 執行所有測試
mvn test

# 跳過測試執行
mvn package -DskipTests

# 執行特定測試類別
mvn test -Dtest=UserServiceTest

# 執行整合測試
mvn integration-test

# 產生測試報告
mvn surefire-report:report
```

#### 🎪 進階測試選項
```bash
# 平行執行測試（提升速度）
mvn test -DforkCount=4 -DreuseForks=true

# 執行失敗重試
mvn test -Dsurefire.rerunFailingTestsCount=2

# 詳細測試輸出
mvn test -DshowSuccess=true

# 測試覆蓋率報告
mvn jacoco:prepare-agent test jacoco:report
```

---

### 🛠️ API 測試工具

#### 📋 推薦工具比較
| 工具 | 類型 | 優點 | 適用場景 |
|------|------|------|----------|
| **🚀 Postman** | GUI | 視覺化操作、團隊協作 | 手動測試、API 文檔 |
| **⚡ curl** | CLI | 輕量快速、腳本化 | 自動化測試、CI/CD |
| **📊 HTTPie** | CLI | 人性化語法、美觀輸出 | 開發除錯、快速驗證 |
| **🎯 REST Assured** | Java | 原生整合、斷言豐富 | 自動化整合測試 |

#### 🧪 測試端點範例集

##### 🔐 認證測試
```bash
# 用戶註冊測試
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "測試用戶",
    "email": "test@stellaris.com",
    "password": "password123"
  }'

# 用戶登入測試
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@stellaris.com",
    "password": "password123"
  }'
```

##### 📦 商品 API 測試
```bash
# 獲取商品列表
curl http://localhost:8080/api/products

# 搜尋商品
curl "http://localhost:8080/api/products?search=telescope&minPrice=100"

# 新增商品（需要管理員權限）
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "新商品",
    "description": "商品描述",
    "price": 999.99,
    "stock": 50
  }'
```

##### 🛒 購物車測試
```bash
# 加入購物車
curl -X POST http://localhost:8080/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_USER_TOKEN" \
  -d '{
    "userId": 1,
    "productId": 1,
    "quantity": 2
  }'

# 查看購物車
curl -H "Authorization: Bearer YOUR_USER_TOKEN" \
     http://localhost:8080/api/cart/1
```

##### 📋 訂單測試
```bash
# 建立訂單
curl -X POST http://localhost:8080/api/orders/checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_USER_TOKEN" \
  -d '{
    "userId": 1,
    "orderItems": [
      {
        "productId": 1,
        "quantity": 2,
        "price": 999.99
      }
    ]
  }'

# 查看用戶訂單
curl -H "Authorization: Bearer YOUR_USER_TOKEN" \
     http://localhost:8080/api/orders/user/1
```

---

### 🔬 自動化測試實例

#### 🧩 單元測試範例
```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    @DisplayName("應該成功註冊新用戶")
    void shouldRegisterNewUser() {
        // Given
        User newUser = new User("john", "john@test.com", "password");
        when(userRepository.save(any(User.class))).thenReturn(newUser);
        
        // When
        User result = userService.registerUser(newUser);
        
        // Then
        assertThat(result.getName()).isEqualTo("john");
        verify(userRepository).save(newUser);
    }
}
```

#### 🔗 整合測試範例
```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserControllerIntegrationTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    @DisplayName("應該成功取得用戶列表")
    void shouldGetUserList() {
        // When
        ResponseEntity<List> response = restTemplate.getForEntity("/api/users", List.class);
        
        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotEmpty();
    }
}
```

---

### 📊 測試報告與分析

#### 📈 測試覆蓋率查看
```bash
# 生成覆蓋率報告
mvn jacoco:report

# 報告位置
open target/site/jacoco/index.html
```

#### 🎯 持續改進指標
| 指標 | 目標值 | 監控方式 |
|------|--------|----------|
| **測試通過率** | > 95% | CI/CD Pipeline |
| **代碼覆蓋率** | > 80% | JaCoCo 報告 |
| **測試執行時間** | < 2 分鐘 | Maven Surefire |
| **失敗測試修復時間** | < 24 小時 | 開發團隊 SLA |

---

### 🚨 測試除錯技巧

#### 🔍 常見問題排解
```bash
# 查看詳細測試失敗原因
mvn test -X

# 只執行失敗的測試
mvn test -Dsurefire.rerunFailingTestsCount=1

# 測試時保留測試資料
mvn test -Dspring.jpa.hibernate.ddl-auto=none
```

#### ⚡ 效能最佳化
```bash
# 使用記憶體資料庫加速測試
mvn test -Dspring.datasource.url=jdbc:h2:mem:testdb

# 並行執行測試
mvn test -Djunit.jupiter.execution.parallel.enabled=true
```

## 🔧 配置選項

### application.properties 主要配置

```properties
# 應用程式基本配置
spring.application.name=backend
server.port=8080

# 資料庫配置
spring.datasource.url=jdbc:h2:file:./data/stellaris
spring.datasource.username=sa
spring.datasource.password=password

# JPA 配置
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# H2 控制台
spring.h2.console.enabled=true

# CORS 配置
spring.web.cors.allowed-origins=http://localhost:4200
```

### 環境變數支援
- `DB_URL`: 資料庫連線 URL
- `DB_USERNAME`: 資料庫用戶名
- `DB_PASSWORD`: 資料庫密碼
- `SERVER_PORT`: 伺服器端口

## 🚀 部署指南

### 🏗️ 部署環境概覽

#### 🌍 環境分層策略
```
🔴 Production  → 生產環境（正式服務）
🟡 Staging     → 預發佈環境（最終測試）
🟢 Development → 開發環境（功能開發）
🔵 Local       → 本地環境（個人開發）
```

---

### 💻 本地開發部署

#### ⚡ 快速啟動
```bash
# 方式一：Maven 直接執行
mvn spring-boot:run

# 方式二：JAR 檔案執行
mvn clean package
java -jar target/backend-0.0.1-SNAPSHOT.jar

# 方式三：IDE 執行
# 直接在 IDE 中執行 BackendApplication.main()
```

#### 🔥 開發模式優化
```bash
# 啟用開發環境配置
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# 啟用熱重載
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Dspring.devtools.restart.enabled=true"

# 除錯模式啟動
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005"
```

---

### 🐳 Docker 容器部署

#### 📋 Dockerfile 最佳實踐
```dockerfile
# 多階段建置，減少映像檔大小
FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# 執行階段
FROM eclipse-temurin:21-jre-alpine
RUN addgroup -g 1001 -S spring && adduser -u 1001 -S spring -G spring
USER spring:spring

WORKDIR /app
COPY --from=builder /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# 健康檢查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/api/test || exit 1

EXPOSE 8080
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
```

#### 🏃‍♂️ Docker 操作指令
```bash
# 建置映像檔
docker build -t stellaris-backend:latest .

# 執行容器
docker run -d \
  --name stellaris-backend \
  -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=docker \
  stellaris-backend:latest

# 查看容器狀態
docker ps
docker logs stellaris-backend

# 進入容器
docker exec -it stellaris-backend /bin/sh
```

#### 🎼 Docker Compose 部署
```yaml
# docker-compose.yml
version: '3.8'
services:
  stellaris-backend:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=docker
      - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/stellaris
    depends_on:
      - postgres
    networks:
      - stellaris-network

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: stellaris
      POSTGRES_USER: stellaris
      POSTGRES_PASSWORD: stellaris123
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - stellaris-network

volumes:
  postgres_data:

networks:
  stellaris-network:
    driver: bridge
```

```bash
# Docker Compose 操作
docker-compose up -d          # 背景啟動
docker-compose logs -f        # 查看日誌
docker-compose down           # 停止並移除
```

---

### ⛅ 雲端部署策略

#### 🔵 Azure 部署
```bash
# Azure Container Instances
az container create \
  --resource-group stellaris-rg \
  --name stellaris-backend \
  --image stellaris-backend:latest \
  --ports 8080 \
  --environment-variables \
    SPRING_PROFILES_ACTIVE=azure

# Azure App Service
az webapp create \
  --resource-group stellaris-rg \
  --plan stellaris-plan \
  --name stellaris-backend-app \
  --deployment-container-image-name stellaris-backend:latest
```

#### 🟠 AWS 部署
```bash
# AWS ECS 服務
aws ecs create-service \
  --cluster stellaris-cluster \
  --service-name stellaris-backend \
  --task-definition stellaris-backend:1 \
  --desired-count 2

# AWS Elastic Beanstalk
eb init stellaris-backend
eb create production
eb deploy
```

#### 🟡 Google Cloud 部署
```bash
# Google Cloud Run
gcloud run deploy stellaris-backend \
  --image gcr.io/PROJECT_ID/stellaris-backend \
  --platform managed \
  --region asia-east1 \
  --allow-unauthenticated
```

---

### 🗄️ 生產環境資料庫配置

#### 🐘 PostgreSQL 配置
```properties
# application-prod.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/stellaris_prod
spring.datasource.username=${DB_USERNAME:stellaris}
spring.datasource.password=${DB_PASSWORD:}
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false

# Connection Pool 設定
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.idle-timeout=300000
```

#### 🐬 MySQL 配置
```properties
# application-prod.properties
spring.datasource.url=jdbc:mysql://localhost:3306/stellaris_prod?useSSL=true&serverTimezone=UTC
spring.datasource.username=${DB_USERNAME:stellaris}
spring.datasource.password=${DB_PASSWORD:}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=validate
```

---

### 🔒 生產環境安全配置

#### 🛡️ Spring Security 完整配置
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/api/test", "/h2-console/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated())
            .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
}
```

#### 🔐 環境變數管理
```bash
# 生產環境變數設定
export SPRING_PROFILES_ACTIVE=prod
export DB_HOST=prod-db.stellaris.com
export DB_USERNAME=stellaris_user
export DB_PASSWORD=super_secure_password
export JWT_SECRET=your_jwt_secret_key_here
export REDIS_HOST=redis.stellaris.com
export MAIL_PASSWORD=your_mail_password
```

---

### 📊 監控與日誌

#### 🎯 Spring Boot Actuator 配置
```properties
# 健康檢查端點
management.endpoints.web.exposure.include=health,info,metrics,prometheus
management.endpoint.health.show-details=always
management.health.redis.enabled=true
management.health.db.enabled=true

# 應用資訊
info.app.name=Stellaris Backend
info.app.version=@project.version@
info.app.description=宇宙商店後端服務
```

#### 📈 Prometheus + Grafana 監控
```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'stellaris-backend'
    static_configs:
      - targets: ['localhost:8080']
    metrics_path: '/actuator/prometheus'
    scrape_interval: 15s
```

#### 📝 日誌配置
```xml
<!-- logback-spring.xml -->
<configuration>
    <springProfile name="prod">
        <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
            <file>logs/stellaris-backend.log</file>
            <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
                <fileNamePattern>logs/stellaris-backend.%d{yyyy-MM-dd}.gz</fileNamePattern>
                <maxHistory>30</maxHistory>
            </rollingPolicy>
            <encoder>
                <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
            </encoder>
        </appender>
        <root level="INFO">
            <appender-ref ref="FILE" />
        </root>
    </springProfile>
</configuration>
```

---

### 🔄 CI/CD 管道

#### 🐙 GitHub Actions 工作流程
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up JDK 21
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
      
      - name: Run tests
        run: mvn clean test
      
      - name: Generate test report
        uses: dorny/test-reporter@v1
        if: success() || failure()
        with:
          name: Maven Tests
          path: target/surefire-reports/*.xml
          reporter: java-junit

  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build Docker image
        run: |
          docker build -t stellaris-backend:${{ github.sha }} .
          docker tag stellaris-backend:${{ github.sha }} stellaris-backend:latest
      
      - name: Deploy to production
        run: |
          echo "Deploying to production..."
          # 部署腳本
```

#### 🚀 部署最佳實踐檢查清單

##### ✅ 部署前檢查
- [ ] 所有測試通過
- [ ] 代碼審查完成
- [ ] 安全漏洞掃描
- [ ] 效能測試通過
- [ ] 資料庫遷移腳本準備

##### ✅ 部署後驗證
- [ ] 健康檢查端點正常
- [ ] 關鍵 API 功能測試
- [ ] 資料庫連線正常
- [ ] 日誌輸出正常
- [ ] 監控指標正常

##### ✅ 回滾計畫
- [ ] 前一版本映像檔備份
- [ ] 資料庫備份與還原計畫
- [ ] DNS 切換程序
- [ ] 緊急聯絡人清單

---

### 🆘 故障排除

#### 🔍 常見部署問題

| 問題 | 可能原因 | 解決方案 |
|------|----------|----------|
| **容器啟動失敗** | 記憶體不足 | 增加容器記憶體限制 |
| **資料庫連線失敗** | 網路或認證問題 | 檢查連線字串和憑證 |
| **API 回應慢** | 資料庫查詢效能 | 優化查詢和增加索引 |
| **記憶體洩漏** | 物件未釋放 | 使用 profiler 分析 |

#### 🛠️ 除錯工具
```bash
# 容器內部除錯
docker exec -it stellaris-backend /bin/sh

# 查看應用日誌
docker logs -f stellaris-backend

# 監控系統資源
docker stats stellaris-backend

# 堆記憶體分析
jmap -dump:format=b,file=heapdump.hprof $(pgrep java)
```

## 🔮 未來功能規劃

### 🎯 短期目標 (1-3 個月)

#### 🔐 安全性強化
- [ ] **JWT 認證機制完善**
  - Token 刷新機制
  - 角色權限細分
  - 登入日誌記錄
- [ ] **API 限流 (Rate Limiting)**
  - Redis + Spring Security 整合
  - 不同用戶等級限制
  - 異常流量監控

#### 📧 通知系統
- [ ] **電子郵件服務**
  - 用戶註冊確認信
  - 訂單狀態通知
  - 密碼重設功能
- [ ] **站內訊息系統**
  - WebSocket 即時通知
  - 訊息模板管理
  - 通知偏好設定

#### 💳 支付整合
- [ ] **多元支付方式**
  - 信用卡支付 (Stripe/PayPal)
  - 電子錢包整合
  - 分期付款支援
- [ ] **訂單管理優化**
  - 訂單追蹤系統
  - 退款處理流程
  - 發票開立功能

---

### 🚀 中期目標 (3-6 個月)

#### 🗄️ 資料層優化
- [ ] **Redis 快取系統**
  - 商品資訊快取
  - 用戶 Session 管理
  - 購物車持久化
- [ ] **資料庫效能調優**
  - 查詢索引優化
  - 讀寫分離架構
  - 連線池調優

#### 📁 檔案管理系統
- [ ] **圖片上傳服務**
  - 多格式支援 (JPEG, PNG, WebP)
  - 自動壓縮和縮圖
  - CDN 整合
- [ ] **檔案存儲策略**
  - 雲端存儲 (AWS S3/Azure Blob)
  - 檔案版本控制
  - 存取權限管理

#### 📊 商業智慧
- [ ] **資料分析功能**
  - 銷售報表生成
  - 用戶行為分析
  - 商品推薦演算法
- [ ] **營運儀表板**
  - 即時銷售數據
  - 庫存預警系統
  - 客戶服務指標

---

### 🌟 長期願景 (6-12 個月)

#### 🤖 智能化升級
- [ ] **AI 驅動功能**
  - 個人化商品推薦
  - 智能客服機器人
  - 需求預測分析
- [ ] **機器學習整合**
  - 用戶偏好學習
  - 價格優化策略
  - 反詐騙檢測

#### 🌍 國際化擴展
- [ ] **多語言支援**
  - i18n 國際化框架
  - 多時區處理
  - 多幣別支援
- [ ] **地區化服務**
  - 不同地區法規適配
  - 本地化支付方式
  - 區域倉儲管理

#### 🔧 架構現代化
- [ ] **微服務改造**
  - 服務拆分策略
  - API Gateway 整合
  - 服務網格 (Service Mesh)
- [ ] **容器原生部署**
  - Kubernetes 集群管理
  - 自動擴縮容
  - 零停機部署

---

### 🛠️ 技術債務清理

#### 🔄 代碼重構
- [ ] **設計模式應用**
  - 策略模式 (支付處理)
  - 觀察者模式 (事件通知)
  - 工廠模式 (服務創建)
- [ ] **代碼品質提升**
  - SonarQube 代碼掃描
  - 單元測試覆蓋率 >90%
  - 文檔自動生成

#### 📝 API 文檔化
- [ ] **Swagger/OpenAPI 整合**
  - 自動 API 文檔生成
  - 互動式 API 測試
  - 客戶端 SDK 生成
- [ ] **API 版本管理**
  - 語義化版本控制
  - 向後相容性保證
  - 廢棄 API 遷移計畫

---

## 🐛 已知問題與限制

### ⚠️ 當前限制

#### 🗄️ 資料層限制
| 問題 | 影響程度 | 預計解決時間 |
|------|----------|--------------|
| **H2 資料庫** | 🟡 中等 | 2024 Q2 |
| 僅適用開發環境，不支援並發 | 生產部署受限 | 遷移到 PostgreSQL |
| **無快取機制** | 🟡 中等 | 2024 Q2 |
| 每次請求都查詢資料庫 | 效能影響 | 整合 Redis 快取 |

#### 🔒 安全性問題
| 問題 | 風險等級 | 解決方案 |
|------|----------|----------|
| **JWT Token 管理** | 🔴 高 | 短期修復 |
| 缺乏 Token 刷新機制 | 安全風險 | 實作 Refresh Token |
| **API 限流缺失** | 🟡 中等 | 中期規劃 |
| 無流量控制機制 | DoS 攻擊風險 | Spring Security + Redis |

#### 🔧 功能缺失
- ❌ 檔案上傳功能
- ❌ 電子郵件通知系統
- ❌ 支付系統整合
- ❌ 多語言國際化
- ❌ 即時通訊功能

### 🚨 技術債務

#### 📊 代碼品質
```
技術債務評估：
├── 🔴 高優先級
│   ├── 缺少輸入驗證
│   ├── 異常處理不完整
│   └── 安全配置不足
├── 🟡 中優先級
│   ├── 代碼重複
│   ├── 測試覆蓋率不足
│   └── 文檔不完整
└── 🟢 低優先級
    ├── 命名規範改進
    ├── 注釋完善
    └── 效能微調
```

---

## 🤝 開發貢獻指南

### 👥 參與方式

#### 🔄 貢獻流程
1. **🍴 Fork 專案**
   ```bash
   git clone https://github.com/chenjason0418/stellaris_website.git
   cd stellaris_website/backend
   ```

2. **🌿 建立功能分支**
   ```bash
   git checkout -b feature/新功能名稱
   git checkout -b bugfix/錯誤修復
   git checkout -b refactor/重構內容
   ```

3. **✨ 開發與測試**
   ```bash
   # 確保測試通過
   mvn clean test
   
   # 代碼格式檢查
   mvn spotless:check
   
   # 安全漏洞掃描
   mvn dependency-check:check
   ```

4. **📝 提交變更**
   ```bash
   git add .
   git commit -m "feat: 新增用戶權限管理功能"
   git push origin feature/新功能名稱
   ```

5. **🔄 建立 Pull Request**
   - 詳細描述變更內容
   - 關聯相關 Issue
   - 確保 CI/CD 通過

#### 📋 提交訊息規範 (Conventional Commits)
```
類型(範圍): 簡短描述

詳細說明（可選）

相關 Issue: #123
```

**提交類型**
- `feat`: 新功能
- `fix`: 錯誤修復
- `docs`: 文檔更新
- `style`: 代碼格式調整
- `refactor`: 代碼重構
- `test`: 測試相關
- `chore`: 建置工具或輔助工具變動

### 🎯 代碼規範

#### ☕ Java 編碼標準
```java
// ✅ 良好示例
@Service
@Transactional
@Slf4j
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public UserService(UserRepository userRepository, 
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    /**
     * 註冊新用戶
     * @param userRequest 用戶註冊請求
     * @return 註冊成功的用戶資訊
     * @throws UserAlreadyExistsException 用戶已存在時拋出
     */
    public User registerUser(UserRegistrationRequest userRequest) {
        log.info("開始註冊用戶: {}", userRequest.getEmail());
        
        if (userRepository.existsByEmail(userRequest.getEmail())) {
            throw new UserAlreadyExistsException("用戶已存在");
        }
        
        User user = User.builder()
            .name(userRequest.getName())
            .email(userRequest.getEmail())
            .password(passwordEncoder.encode(userRequest.getPassword()))
            .role(UserRole.USER)
            .status(UserStatus.ACTIVE)
            .build();
            
        User savedUser = userRepository.save(user);
        log.info("用戶註冊成功: {}", savedUser.getId());
        
        return savedUser;
    }
}
```

#### 🧪 測試撰寫指南
```java
@ExtendWith(MockitoExtension.class)
@DisplayName("用戶服務測試")
class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @Mock
    private PasswordEncoder passwordEncoder;
    
    @InjectMocks
    private UserService userService;
    
    @Nested
    @DisplayName("用戶註冊測試")
    class RegisterUserTests {
        
        @Test
        @DisplayName("應該成功註冊新用戶")
        void shouldRegisterNewUser() {
            // Given
            UserRegistrationRequest request = UserRegistrationRequest.builder()
                .name("測試用戶")
                .email("test@example.com")
                .password("password123")
                .build();
                
            when(userRepository.existsByEmail(request.getEmail())).thenReturn(false);
            when(passwordEncoder.encode(request.getPassword())).thenReturn("encoded_password");
            when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
                User user = invocation.getArgument(0);
                user.setId(1L);
                return user;
            });
            
            // When
            User result = userService.registerUser(request);
            
            // Then
            assertThat(result).isNotNull();
            assertThat(result.getName()).isEqualTo("測試用戶");
            assertThat(result.getEmail()).isEqualTo("test@example.com");
            
            verify(userRepository).existsByEmail(request.getEmail());
            verify(passwordEncoder).encode(request.getPassword());
            verify(userRepository).save(any(User.class));
        }
        
        @Test
        @DisplayName("當用戶已存在時應該拋出異常")
        void shouldThrowExceptionWhenUserAlreadyExists() {
            // Given
            UserRegistrationRequest request = UserRegistrationRequest.builder()
                .email("existing@example.com")
                .build();
                
            when(userRepository.existsByEmail(request.getEmail())).thenReturn(true);
            
            // When & Then
            assertThatThrownBy(() -> userService.registerUser(request))
                .isInstanceOf(UserAlreadyExistsException.class)
                .hasMessage("用戶已存在");
                
            verify(userRepository).existsByEmail(request.getEmail());
            verify(userRepository, never()).save(any(User.class));
        }
    }
}
```

### 🏆 貢獻者認可

#### 🌟 貢獻等級
| 等級 | 條件 | 權限 |
|------|------|------|
| **🥉 貢獻者** | 1+ PR 合併 | Issue 標記權限 |
| **🥈 活躍貢獻者** | 5+ PR 合併 | Code Review 權限 |
| **🥇 核心貢獻者** | 10+ PR 合併 | Branch 管理權限 |
| **👑 維護者** | 長期貢獻 | 完整管理權限 |

#### 📈 貢獻統計
- 總貢獻者數量：徵求中 🙋‍♂️
- 活躍貢獻者：徵求中 🤝
- 代碼提交數：持續增長 📊
- 問題解決率：目標 >95% 🎯

---

## 📄 開源授權

### 📜 MIT 授權條款

本專案採用 MIT 授權協議，允許：

#### ✅ 允許的使用方式
- 🆓 **商業使用** - 可用於商業專案
- 🔄 **修改** - 可以修改原始碼
- 📋 **分發** - 可以分發原始碼或編譯後的程式
- 🔒 **私人使用** - 可以私人使用和修改
- 📄 **專利使用** - 授予專利使用權

#### 📋 使用條件
- 📝 **保留版權聲明** - 必須保留原始的版權聲明
- 📄 **保留授權條款** - 必須保留 MIT 授權條款

#### ⚠️ 免責聲明
- 🚫 **無保證** - 軟體按 "現況" 提供，無任何保證
- 🛡️ **無責任** - 作者不承擔任何責任

### 📞 聯絡資訊

#### 👨‍💻 專案維護者
- **姓名**：Jason Chen
- **角色**：全端開發工程師 & 專案創建者
- **Email**：[chenjason0418@gmail.com](mailto:chenjason0418@gmail.com)
- **GitHub**：[@chenjason0418](https://github.com/chenjason0418)
- **時區**：UTC+8 (台北時間)

#### 🌐 專案連結
- **主要倉庫**：[stellaris_website](https://github.com/chenjason0418/stellaris_website)
- **Issues 追蹤**：[GitHub Issues](https://github.com/chenjason0418/stellaris_website/issues)
- **專案看板**：[GitHub Projects](https://github.com/chenjason0418/stellaris_website/projects)
- **Wiki 文檔**：[GitHub Wiki](https://github.com/chenjason0418/stellaris_website/wiki)

#### 💬 社群交流
- **討論區**：[GitHub Discussions](https://github.com/chenjason0418/stellaris_website/discussions)
- **問題回報**：使用 GitHub Issues
- **功能建議**：歡迎提出 Feature Request
- **技術支援**：透過 Email 或 GitHub Issues

---

<div align="center">

## 🌟 感謝您的關注！

**探索宇宙的後端動力，由 Spring Boot 驅動！** 

🚀✨ **Stellaris Backend - 連接星際的技術橋樑** ✨🚀

---

*讓我們一起建造連接宇宙的技術基礎設施！*

[![Star this repo](https://img.shields.io/github/stars/chenjason0418/stellaris_website?style=social)](https://github.com/chenjason0418/stellaris_website)
[![Fork this repo](https://img.shields.io/github/forks/chenjason0418/stellaris_website?style=social)](https://github.com/chenjason0418/stellaris_website/fork)
[![Watch this repo](https://img.shields.io/github/watchers/chenjason0418/stellaris_website?style=social)](https://github.com/chenjason0418/stellaris_website)

</div>
