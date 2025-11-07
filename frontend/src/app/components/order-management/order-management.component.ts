import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService, Order } from '../../services/order.service';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  loading = false;

  totalOrders = 0;
  todayOrders = 0;
  totalRevenue = 0;
  pendingOrders = 0;

  selectedStatus = '';
  selectedDateFilter = '';
  searchTerm = '';

  // 彈窗
  showOrderDetail = false;
  showStatusUpdate = false;
  selectedOrder: Order | null = null;
  newStatus = '';

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.filteredOrders = [...orders];
        this.calculateStats();
        this.loading = false;
        console.log('訂單載入成功，共', orders.length, '個訂單');
      },
      error: (error) => {
        console.error('載入訂單失敗:', error);
        this.loading = false;
      }
    });
  }

  calculateStats() {
    this.totalOrders = this.orders.length;
    this.totalRevenue = this.orders.reduce((sum, order) => sum + order.totalAmount, 0);
    this.pendingOrders = this.orders.filter(order => order.status === 'PENDING').length;

    // 計算當日訂單
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.todayOrders = this.orders.filter(order => {
      const orderDate = new Date(order.orderDate);
      orderDate.setHours(0, 0, 0, 0);
      return orderDate.getTime() === today.getTime();
    }).length;
  }

  filterOrders() {
    let filtered = [...this.orders];

    // 狀態
    if (this.selectedStatus) {
      filtered = filtered.filter(order => order.status === this.selectedStatus);
    }

    // 日期
    if (this.selectedDateFilter) {
      const now = new Date();
      let startDate = new Date();

      switch (this.selectedDateFilter) {
        case 'today':
          startDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          startDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(now.getMonth() - 1);
          break;
      }

      filtered = filtered.filter(order => new Date(order.orderDate) >= startDate);
    }

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(order =>
        order.id.toString().includes(term) ||
        order.userName.toLowerCase().includes(term)
      );
    }

    this.filteredOrders = filtered;
  }

  viewOrderDetail(order: Order) {
    this.selectedOrder = order;
    if (!order.orderItems) {
      this.orderService.getOrderById(order.id).subscribe({
        next: (detailedOrder) => {
          this.selectedOrder = detailedOrder;
          this.showOrderDetail = true;
        },
        error: (error) => {
          console.error('獲取訂單詳情失敗:', error);
          this.showOrderDetail = true;
        }
      });
    } else {
      this.showOrderDetail = true;
    }
  }

  closeOrderDetail() {
    this.showOrderDetail = false;
    this.selectedOrder = null;
  }

  updateOrderStatus(order: Order) {
    this.selectedOrder = order;
    this.newStatus = order.status;
    this.showStatusUpdate = true;
  }

  closeStatusUpdate() {
    this.showStatusUpdate = false;
    this.selectedOrder = null;
    this.newStatus = '';
  }

  confirmStatusUpdate() {
    if (this.selectedOrder && this.newStatus) {
      this.orderService.updateOrderStatus(this.selectedOrder.id, this.newStatus).subscribe({
        next: (updatedOrder) => {
          const orderIndex = this.orders.findIndex(o => o.id === this.selectedOrder!.id);
          if (orderIndex !== -1) {
            this.orders[orderIndex].status = updatedOrder.status;
            this.filterOrders();
            this.calculateStats();
          }

          console.log(`訂單 #${this.selectedOrder!.id} 狀態已更新為: ${this.newStatus}`);
          this.closeStatusUpdate();
        },
        error: (error) => {
          console.error('更新訂單狀態失敗:', error);
          alert('更新訂單狀態失敗，請稍後重試');
        }
      });
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleString('zh-TW');
  }

  getStatusText(status: string): string {
    const statusMap: {[key: string]: string} = {
      'PENDING': '待處理',
      'CONFIRMED': '已確認',
      'SHIPPED': '已出貨',
      'DELIVERED': '已送達',
      'CANCELLED': '已取消'
    };
    return statusMap[status] || status;
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase()}`;
  }
}
