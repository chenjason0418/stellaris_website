import { Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService, Order } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css'
})
export class UserOrdersComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();

  orders: Order[] = [];
  isLoading = false;
  errorMessage = '';
  selectedOrder: Order | null = null;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('UserOrdersComponent ngOnInit, isOpen:', this.isOpen);
    if (this.isOpen) {
      this.loadUserOrders();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('UserOrdersComponent ngOnChanges, changes:', changes);
    console.log('UserOrdersComponent ngOnChanges, isOpen:', this.isOpen);
    if (changes['isOpen'] && this.isOpen) {
      this.loadUserOrders();
    }
  }

  loadUserOrders(): void {
    console.log('loadUserOrders() 被調用');
    const currentUser = this.authService.getCurrentUser();
    console.log('當前用戶:', currentUser);
    if (!currentUser) {
      this.errorMessage = '請先登入';
      console.log('用戶未登入');
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    console.log('開始載入用戶訂單, userId:', currentUser.id);

    this.orderService.getUserOrders(currentUser.id).subscribe({
      next: (orders) => {
        console.log('成功載入訂單:', orders);
        this.orders = orders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
        this.isLoading = false;
        console.log('訂單載入完成, 共', this.orders.length, '筆訂單');
      },
      error: (error) => {
        console.error('載入訂單失敗:', error);
        this.errorMessage = '載入訂單失敗，請稍後再試';
        this.isLoading = false;
      }
    });
  }

  onClose(): void {
    console.log('UserOrdersComponent onClose() 被調用');
    this.closeModal.emit();
    this.selectedOrder = null;
  }

  selectOrder(order: Order): void {
    if (this.selectedOrder?.id === order.id) {
      this.selectedOrder = null;
    } else {
      this.selectedOrder = order;
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pending': '處理中',
      'confirmed': '已確認',
      'shipped': '已出貨',
      'delivered': '已送達',
      'cancelled': '已取消'
    };
    return statusMap[status] || status;
  }

  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'pending': 'status-pending',
      'confirmed': 'status-confirmed',
      'shipped': 'status-shipped',
      'delivered': 'status-delivered',
      'cancelled': 'status-cancelled'
    };
    return statusClasses[status] || 'status-default';
  }
}
