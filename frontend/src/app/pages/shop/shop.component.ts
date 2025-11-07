import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';
import { Subscription } from 'rxjs';

declare var AOS: any;

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-shop',
  imports: [CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit, OnDestroy {
  isLoginModalOpen = false;
  isRegisterModalOpen = false;
  isCheckoutPending = false;
  currentUserId: number | null = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}



  products: Product[] = [
    {
      id: 1,
      name: '望遠鏡模型',
      description: '精緻的哈伯太空望遠鏡模型，完美的桌面裝飾',
      price: 299,
      stock: 15,
      image: 'Hubble_Space_Telescope_model.png'
    },
    {
      id: 2,
      name: '星空海報',
      description: '高品質星雲印刷海報，為您的房間增添宇宙氛圍',
      price: 89,
      stock: 25,
      image: 'Nebula_printed_poster.png'
    },
    {
      id: 3,
      name: '太陽系模型',
      description: '可動式太陽系模型，教育與裝飾兼具',
      price: 599,
      stock: 15,
      image: 'Solar_System_Model.png'
    },
    {
      id: 4,
      name: '宇宙馬克杯',
      description: '星空圖案陶瓷馬克杯，讓每一口咖啡都充滿宇宙能量',
      price: 129,
      stock: 50,
      image: 'Cosmic_mug.png'
    },
    {
      id: 5,
      name: '火箭模型',
      description: '1:100比例火箭模型，重現人類探索太空的壯舉',
      price: 399,
      stock: 5,
      image: 'Rocket_model.png'
    },
    {
      id: 6,
      name: '極光明信片套組',
      description: '精美極光攝影明信片，6張不同極光景象',
      price: 59,
      stock: 99,
      image: 'Aurora_postcard_set.png'
    }
  ];

  cartItems: CartItem[] = [];
  isCartOpen = false;

  ngOnInit(): void {
    // 訂閱用戶狀態變化
    this.subscriptions.push(
      this.authService.currentUser$.subscribe(user => {
        this.currentUserId = user?.id || null;
        console.log('商店組件：用戶狀態更新', user);

        // 如果是從結帳流程來的，並且現在已登入，則繼續結帳
        if (user && this.cartItems.length > 0 && this.isCheckoutPending) {
          this.processCheckout();
          this.isCheckoutPending = false;
        }
      })
    );

    if (isPlatformBrowser(this.platformId)) {
      // 確保頁面滾動到頂部
      window.scrollTo(0, 0);

      // 重新初始化AOS動畫 - 多重方法確保動畫正確觸發
      setTimeout(() => {
        if (typeof AOS !== 'undefined') {
          // 1. 刷新AOS
          AOS.refresh();

          // 2. 強制重新計算所有動畫元素
          AOS.refreshHard();

          // 3. 手動觸發一次滾動事件以激活動畫
          window.dispatchEvent(new Event('scroll'));

          // 4. 如果還是沒有效果，強制顯示所有動畫元素
          setTimeout(() => {
            const aosElements = document.querySelectorAll('[data-aos]');
            aosElements.forEach(el => {
              el.classList.add('aos-animate');
            });
          }, 100);
        }
      }, 150);
    }
  }

  ngOnDestroy(): void {
    // 清理訂閱
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  addToCart(product: Product): void {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
  }

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  increaseQuantity(index: number): void {
    this.cartItems[index].quantity++;
  }

  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    }
  }

  removeFromCart(index: number): void {
    this.cartItems.splice(index, 1);
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getCartItemsCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  handleLoginSuccess(event: any): void {
    console.log('商店組件：登入成功，收到的數據：', event);

    if (!event || !event.token || !event.id) {
      console.error('登入回應缺少必要資訊');
      alert('登入失敗：系統錯誤');
      return;
    }

    this.isLoginModalOpen = false;
    // AuthService 會自動處理用戶狀態更新，包括觸發結帳流程
  }

  handleSwitchToRegister(): void {
    this.isLoginModalOpen = false;
    this.isRegisterModalOpen = true;
  }

  handleRegisterSuccess(): void {
    this.isRegisterModalOpen = false;
    this.isLoginModalOpen = true;
  }



  processCheckout(): void {
    if (!this.currentUserId || this.cartItems.length === 0) {
      console.error('結帳失敗：', !this.currentUserId ? '未登入' : '購物車為空');
      return;
    }

    console.log('開始結帳處理，用戶ID:', this.currentUserId);

    const checkoutRequest = {
      userId: this.currentUserId,
      items: this.cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      }))
    };

    console.log('送出結帳請求:', checkoutRequest);

    this.orderService.checkout(checkoutRequest).subscribe({
      next: (order) => {
        console.log('結帳成功，訂單詳情:', order);
        alert('訂單建立成功！感謝您的購買。');
        this.cartItems = [];
        this.isCartOpen = false;
      },
      error: (error) => {
        console.error('結帳錯誤:', error);
        alert('結帳過程發生錯誤，請稍後再試。\n錯誤詳情: ' + (error.message || '未知錯誤'));
      }
    });
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      alert('購物車是空的');
      return;
    }

    // 檢查是否已登入
    if (!this.authService.isLoggedIn()) {
      this.isCheckoutPending = true;  // 標記等待結帳
      this.isLoginModalOpen = true;
      return;
    }

    // 直接執行結帳流程
    this.processCheckout();
  }
}
