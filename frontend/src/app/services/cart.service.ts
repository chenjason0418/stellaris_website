import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Product } from './product.service';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  userSession: string;
}

export interface CartSummary {
  total: number;
  itemCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/cart';
  private userSession: string;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // 生成或獲取用戶會話ID
    this.userSession = this.getUserSession();
  }

  private getUserSession(): string {
    if (isPlatformBrowser(this.platformId)) {
      let session = localStorage.getItem('userSession');
      if (!session) {
        session = 'user_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('userSession', session);
      }
      return session;
    } else {
      return 'ssr_temp_session';
    }
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/${this.userSession}`);
  }

  addToCart(productId: number, quantity: number = 1): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.apiUrl}/${this.userSession}/add`, {
      productId,
      quantity
    });
  }

  updateCartItemQuantity(cartItemId: number, quantity: number): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.apiUrl}/item/${cartItemId}`, {
      quantity
    });
  }

  removeFromCart(cartItemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/item/${cartItemId}`);
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${this.userSession}`);
  }

  getCartSummary(): Observable<CartSummary> {
    return this.http.get<CartSummary>(`${this.apiUrl}/${this.userSession}/summary`);
  }
}
