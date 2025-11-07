import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, LoginRequest } from '../../services/user.service';
import { CryptoService } from '../../services/crypto.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() closeLogin = new EventEmitter<void>();
  @Output() loginSuccess = new EventEmitter<any>();
  @Output() switchToRegister = new EventEmitter<void>();

  loginData = {
    email: '',
    password: ''
  };

  isLoading = false;
  errorMessage = '';

  constructor(
    private userService: UserService,
    private cryptoService: CryptoService,
    private authService: AuthService
  ) {}

  onSubmit() {
    console.log('登入表單提交:', this.loginData);

    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = '請填寫所有欄位';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // 使用哈希算法
    this.cryptoService.secureHashPassword(this.loginData.password).then(hashedPassword => {
      console.log('哈希後的密碼:', hashedPassword);

      const loginRequest: LoginRequest = {
        email: this.loginData.email,
        password: hashedPassword
      };

      console.log('發送登入請求:', loginRequest);
      this.userService.loginUser(loginRequest).subscribe({
        next: (user) => {
          console.log('登入成功:', user);
          this.authService.login(user);
          this.loginSuccess.emit(user);
          this.onClose();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('登入失敗詳細錯誤:', error);
          console.error('錯誤狀態:', error.status);
          console.error('錯誤訊息:', error.error);
          this.errorMessage = '電子信箱或密碼錯誤 (狀態: ' + error.status + ')';
          this.isLoading = false;
        }
      });
    }).catch(error => {
      console.error('密碼加密失敗:', error);
      this.errorMessage = '登入處理失敗';
      this.isLoading = false;
    });
  }

  onClose() {
    this.closeLogin.emit();
    this.resetForm();
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('login-overlay')) {
      this.onClose();
    }
  }

  onSwitchToRegister() {
    this.switchToRegister.emit();
  }

  private resetForm() {
    this.loginData = { email: '', password: '' };
    this.errorMessage = '';
    this.isLoading = false;
  }
}
