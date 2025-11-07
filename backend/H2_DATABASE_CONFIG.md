# H2 資料庫設定說明

## 設定檔案位置
- 主設定：`src/main/resources/application.properties`
- 設定類：`src/main/java/com/example/backend/config/H2DatabaseConfig.java`

## application.properties 設定

```properties
# H2 資料庫配置 - 持久化到本地檔案
spring.datasource.url=jdbc:h2:file:./data/stellaris;DB_CLOSE_ON_EXIT=FALSE;AUTO_RECONNECT=TRUE
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=password

# H2 控制台配置（開發用）
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# JPA/Hibernate 配置
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.format-sql=true
```

## H2 Web 控制台存取

### 存取 URL
http://localhost:8080/h2-console

### 連接設定
- **JDBC URL**: `jdbc:h2:file:./data/stellaris`
- **User Name**: `sa`
- **Password**: `password`
- **Driver Class**: `org.h2.Driver`

## 資料庫檔案位置
- 資料庫檔案會儲存在專案根目錄下的 `data/` 資料夾
- 檔案名稱：`stellaris.mv.db`

## 重要設定說明

### 持久化設定
- `spring.jpa.hibernate.ddl-auto=update`: 保持資料不會在重啟時刪除
- `DB_CLOSE_ON_EXIT=FALSE`: 應用程式關閉時不關閉資料庫連接
- `AUTO_RECONNECT=TRUE`: 自動重新連接

### 安全設定
- H2 控制台只在開發環境啟用
- 僅允許本地存取（localhost）

## 疑難排解

### 如果無法存取 H2 控制台
1. 確認應用程式已啟動
2. 檢查 `spring.h2.console.enabled=true` 設定
3. 瀏覽器存取：http://localhost:8080/h2-console

### 如果資料遺失
1. 檢查 `spring.jpa.hibernate.ddl-auto` 設定
2. 確認不是 `create-drop` 模式
3. 檢查 `data/` 資料夾是否存在

### 重新初始化資料庫
1. 停止應用程式
2. 刪除 `data/` 資料夾
3. 重新啟動應用程式（會自動重新初始化）