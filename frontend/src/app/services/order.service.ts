import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Order {
  id: number;
  userId: number;
  userName: string;
  totalAmount: number;
  itemCount: number;
  orderDate: Date;
  status: string;
  orderItems?: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface CheckoutRequest {
  userId: number;
  items: CheckoutItem[];
}

export interface CheckoutItem {
  productId: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // 結帳
  checkout(checkoutRequest: CheckoutRequest): Observable<Order> {
    const headers = this.getHeaders();
    if (!headers.get('Authorization')) {
      throw new Error('未登入用戶');
    }
    return this.http.post<Order>(`${this.apiUrl}/checkout`, checkoutRequest, { headers });
  }

  // 獲取用戶的訂單列表
  getUserOrders(userId: number): Observable<Order[]> {
    const headers = this.getHeaders();
    return this.http.get<Order[]>(`${this.apiUrl}/user/${userId}`, { headers });
  }

  // 獲取所有訂單（管理員用）
  getAllOrders(): Observable<Order[]> {
    const headers = this.getHeaders();
    return this.http.get<Order[]>(`${this.apiUrl}/all`, { headers });
  }

  // 根據ID獲取訂單詳情
  getOrderById(orderId: number): Observable<Order> {
    const headers = this.getHeaders();
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`, { headers });
  }

  // 更新訂單狀態
  updateOrderStatus(orderId: number, status: string): Observable<Order> {
    const headers = this.getHeaders();
    return this.http.post<Order>(`${this.apiUrl}/${orderId}/status`, { status }, { headers });
  }
}
