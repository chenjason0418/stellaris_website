import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<AuthUser | null>(null);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  public currentUser$ = this.currentUserSubject.asObservable();
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkLoginStatus();
    }
  }

  // 檢查登錄狀態
  private checkLoginStatus(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');

    if (token && userId && userEmail && userName && userRole) {
      const user: AuthUser = {
        id: parseInt(userId),
        email: userEmail,
        name: userName,
        role: userRole,
        token: token
      };
      this.setUser(user);
    }
  }

  // 設置用戶登錄
  login(user: AuthUser): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', user.token);
      localStorage.setItem('userId', user.id.toString());
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userRole', user.role);
    }

    this.setUser(user);
  }

  // 登出
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      localStorage.removeItem('userRole');
    }

    this.setUser(null);
  }

  // 設置當前用戶
  private setUser(user: AuthUser | null): void {
    this.currentUserSubject.next(user);
    this.isLoggedInSubject.next(!!user);
  }

  // 獲取當前用戶
  getCurrentUser(): AuthUser | null {
    return this.currentUserSubject.value;
  }

  // 檢查是否已登錄
  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  // 檢查是否為管理員
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin' || false;
  }

  // 檢查是否為普通用戶
  isUser(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'user' || false;
  }

  // 獲取認證 token
  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return localStorage.getItem('token');
  }
}
