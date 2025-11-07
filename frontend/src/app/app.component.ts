import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { AuthService, AuthUser } from './services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, LoginComponent, RegisterComponent, UserOrdersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'class20250521';
  isFixed = false;
  isScrolled = false;
  isMenuActive = false;

  isLoginOpen = false;
  isRegisterOpen = false;
  isUserOrdersOpen = false;
  currentUser: AuthUser | null = null;
  isLoggedIn = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.authService.currentUser$.subscribe(user => {
        this.currentUser = user;
        console.log('用戶狀態更新:', user);
      })
    );

    this.subscriptions.push(
      this.authService.isLoggedIn$.subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
        console.log('登錄狀態更新:', isLoggedIn);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }



  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
    document.body.scrollTop || 0;

    if (scrollTop > 50) {
      this.isFixed = true;
      this.isScrolled = true;
    } else {
      this.isFixed = false;
      this.isScrolled = false;
    }
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  openLogin(): void {
    console.log('openLogin() 被調用');
    this.isLoginOpen = true;
  }

  closeLogin(): void {
    console.log('closeLogin() 被調用');
    this.isLoginOpen = false;
  }

  onLoginSuccess(user: any): void {
    this.authService.login(user);
    console.log('用戶登入成功:', user);
  }

  openRegister(): void {
    console.log('openRegister() 被調用');
    this.isRegisterOpen = true;
  }

  closeRegister(): void {
    console.log('closeRegister() 被調用');
    this.isRegisterOpen = false;
  }

  onRegisterSuccess(user: any): void {
    console.log('用戶註冊成功:', user);
    this.authService.login(user);
    alert(`歡迎 ${user.name}！註冊成功並已自動登入。`);
  }

  onSwitchToLogin(): void {
    this.isRegisterOpen = false;
    this.isLoginOpen = true;
  }

  onSwitchToRegister(): void {
    this.isLoginOpen = false;
    this.isRegisterOpen = true;
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isUser(): boolean {
    return this.authService.isUser();
  }

  logout(): void {
    this.authService.logout();
    console.log('用戶已登出');
    this.router.navigate(['/home']).then(() => {
      alert('已成功登出！');
    });
  }

  openUserOrders(): void {
    console.log('openUserOrders() 被調用');
    console.log('當前用戶:', this.currentUser);
    console.log('是否為用戶:', this.isUser());
    console.log('是否已登入:', this.isLoggedIn);
    console.log('設置前 isUserOrdersOpen:', this.isUserOrdersOpen);
    this.isUserOrdersOpen = true;
    console.log('設置後 isUserOrdersOpen:', this.isUserOrdersOpen);
  }

  closeUserOrders(): void {
    console.log('closeUserOrders() 被調用');
    this.isUserOrdersOpen = false;
  }

}
