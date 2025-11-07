import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  newUser: User = {
    name: '',
    email: '',
    password: '',
    role: 'user',
    status: 'active',
    registeredDate: new Date()
  };
  editingUser: User | null = null;
  isLoading = false;
  message = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
        this.message = `成功載入 ${users.length} 位用戶`;
      },
      error: (error) => {
        console.error('載入用戶失敗:', error);
        this.isLoading = false;
        this.message = '載入用戶失敗：無法連接到後端伺服器';
      }
    });
  }

  addUser() {
    if (this.newUser.name && this.newUser.email) {
      this.userService.createUser(this.newUser).subscribe({
        next: (user) => {
          this.users.push(user);
          this.resetForm();
          this.message = '用戶新增成功';
          this.loadUsers(); // 重新載入用戶列表
        },
        error: (error) => {
          console.error('新增用戶失敗:', error);
          this.message = '新增用戶失敗';
        }
      });
    }
  }

  deleteUser(id: number | undefined) {
    if (id && confirm('確定要刪除這位用戶嗎？')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== id);
          this.message = '用戶刪除成功';
        },
        error: (error) => {
          console.error('刪除用戶失敗:', error);
          this.message = '刪除用戶失敗';
        }
      });
    }
  }

  editUser(user: User) {
    this.editingUser = { ...user };
    // 你可以在這裡添加編輯模態框或內聯編輯邏輯
    console.log('編輯用戶:', user);
  }

  resetForm() {
    this.newUser = {
      name: '',
      email: '',
      password: '',
      role: 'user',
      status: 'active',
      registeredDate: new Date()
    };
    this.editingUser = null;
  }

  getRoleDisplayName(role: string): string {
    return role === 'admin' ? '管理員' : '一般用戶';
  }

  getRoleBadgeClass(role: string): string {
    return role === 'admin' ? 'bg-danger' : 'bg-primary';
  }

  getStatusDisplayName(status: string): string {
    return status === 'active' ? '活躍' : '非活躍';
  }

  getStatusBadgeClass(status: string): string {
    return status === 'active' ? 'bg-success' : 'bg-secondary';
  }

  formatDate(date: Date | string): string {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // 統計方法
  getTotalUsers(): number {
    return this.users.length;
  }

  getAdminCount(): number {
    return this.users.filter(user => user.role === 'admin').length;
  }

  getActiveUsers(): number {
    return this.users.filter(user => user.status === 'active').length;
  }

  getInactiveUsers(): number {
    return this.users.filter(user => user.status === 'inactive').length;
  }

  // 密碼強度檢查
  getPasswordStrength(): number {
    const password = this.newUser.password || '';
    let strength = 0;

    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    return strength;
  }

  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrength();
    if (strength <= 2) return '弱';
    if (strength <= 4) return '中等';
    return '強';
  }

  getPasswordStrengthClass(): string {
    const strength = this.getPasswordStrength();
    if (strength <= 2) return 'text-danger';
    if (strength <= 4) return 'text-warning';
    return 'text-success';
  }
}
