import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: string;
  status: string;
  registeredDate: Date;
}

export interface TokenValidationResponse {
  valid: boolean;
  userId?: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  token: string;
  status: string;
}

export interface UserStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  activeUsers: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // 驗證 token 是否有效
  validateToken(): Observable<boolean> {
    const headers = this.getHeaders();
    if (!headers.get('Authorization')) {
      return new Observable(subscriber => {
        subscriber.next(false);
        subscriber.complete();
      });
    }
    return this.http.get<TokenValidationResponse>(`${this.apiUrl}/validate-token`, { headers })
      .pipe(map(response => response.valid));
  }

  // 檢查用戶是否已登入
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // 登出用戶
  logout(): void {
    this.authService.logout();
    // 登出後強制導航到首頁
    this.router.navigate(['/home']);
  }

  // 獲取所有用戶
  getAllUsers(): Observable<User[]> {
    // 添加時間戳參數防止緩存
    const timestamp = new Date().getTime();
    const headers = this.getHeaders();
    return this.http.get<User[]>(`${this.apiUrl}?t=${timestamp}`, { headers });
  }

  // 根據 ID 獲取單個用戶
  getUserById(id: number): Observable<User> {
    const headers = this.getHeaders();
    return this.http.get<User>(`${this.apiUrl}/${id}`, { headers });
  }

  // 創建新用戶
  createUser(user: User): Observable<User> {
    const headers = this.getHeaders();
    return this.http.post<User>(this.apiUrl, user, { headers });
  }

  // 更新用戶
  updateUser(id: number, user: User): Observable<User> {
    const headers = this.getHeaders();
    return this.http.put<User>(`${this.apiUrl}/${id}`, user, { headers });
  }

  // 刪除用戶
  deleteUser(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  // 用戶登入
  loginUser(loginRequest: LoginRequest): Observable<LoginResponse> {
    console.log('UserService: 發送登入請求到', `${this.apiUrl}/login`);
    console.log('UserService: 請求內容', loginRequest);
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginRequest);
  }

  // 切換用戶狀態
  toggleUserStatus(id: number): Observable<User> {
    const headers = this.getHeaders();
    return this.http.put<User>(`${this.apiUrl}/${id}/toggle-status`, {}, { headers });
  }

  // 獲取用戶統計數據
  getUserStats(): Observable<UserStats> {
    // 添加時間戳參數防止緩存
    const timestamp = new Date().getTime();
    const headers = this.getHeaders();
    return this.http.get<UserStats>(`${this.apiUrl}/stats?t=${timestamp}`, { headers });
  }

  // 根據角色獲取用戶
  getUsersByRole(role: string): Observable<User[]> {
    const headers = this.getHeaders();
    return this.http.get<User[]>(`${this.apiUrl}/role/${role}`, { headers });
  }
}
