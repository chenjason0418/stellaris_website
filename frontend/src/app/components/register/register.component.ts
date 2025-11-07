import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../../services/user.service';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @Output() closeRegister = new EventEmitter<void>();
  @Output() registerSuccess = new EventEmitter<any>();
  @Output() switchToLogin = new EventEmitter<void>();

  registerData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  isLoading = false;
  errorMessage = '';

  constructor(
    private userService: UserService,
    private cryptoService: CryptoService
  ) {}

  onSubmit() {
    console.log('註冊表單提交:', this.registerData);

    if (!this.registerData.name || !this.registerData.email || !this.registerData.password || !this.registerData.confirmPassword) {
      this.errorMessage = '請填寫所有欄位';
      return;
    }

    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.errorMessage = '密碼與確認密碼不一致';
      return;
    }

    if (this.registerData.password.length < 6) {
      this.errorMessage = '密碼長度至少需要6個字符';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // 使用異步密碼哈希
    this.cryptoService.secureHashPassword(this.registerData.password).then(hashedPassword => {
      // 創建新用戶
      const newUser: User = {
        name: this.registerData.name,
        email: this.registerData.email,
        password: hashedPassword,
        role: 'user', // 默認角色為普通用戶
        status: 'active', // 默認狀態為活躍
        registeredDate: new Date()
      };

      this.userService.createUser(newUser).subscribe({
        next: (user) => {
          // 註冊成功
          console.log('註冊成功:', user);
          this.registerSuccess.emit(user);
          this.onClose();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('註冊失敗:', error);
          if (error.status === 409) {
            this.errorMessage = '此電子信箱已被註冊';
          } else {
            this.errorMessage = '註冊失敗，請稍後重試';
          }
          this.isLoading = false;
        }
      });
    }).catch(error => {
      console.error('密碼加密失敗:', error);
      this.errorMessage = '註冊處理失敗';
      this.isLoading = false;
    });
  }

  onClose() {
    this.closeRegister.emit();
    this.resetForm();
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('register-overlay')) {
      this.onClose();
    }
  }

  onSwitchToLogin() {
    this.switchToLogin.emit();
  }

  private resetForm() {
    this.registerData = { name: '', email: '', password: '', confirmPassword: '' };
    this.errorMessage = '';
    this.isLoading = false;
  }
}
