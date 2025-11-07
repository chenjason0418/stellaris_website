import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

declare var AOS: any;

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html'
})
export class GalleryComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  isLightboxVisible = false;

  galleryImages = [
    { src: 'hubble-ultradeep.jpg', caption: '哈伯極深空 - 最遠最古老的星系影像，揭示宇宙初期' },
    { src: 'Venus.jpg', caption: '金星 - 厚重雲層下的劇烈溫室效應星球' },
    { src: 'eclipse.jpg', caption: '日全食 - 陽光與月球交織的奇觀' },
    { src: 'rocket-launch.jpg', caption: '火箭升空 - 劃破大氣層，開啟太空旅程的起點' },
    { src: 'earthrise.jpg', caption: '地球升起 - 從月球拍攝的地球，象徵希望與家園' },
    { src: 'aurora.jpg', caption: '極光 - 地磁與太陽風交織的壯麗自然現象' },
    { src: 'Nebula.jpg', caption: '鷹狀星雲 - 創生之柱（哈伯望遠鏡）' },
    { src: 'mars.gif', caption: '火星表面 - 毅力號拍攝的岩層地形' },
    { src: 'andromeda.jpg', caption: '仙女座星系 - 銀河系的鄰居，距離地球約250萬光年' },
    { src: 'moonwalk.jpg', caption: '阿姆斯壯踏上月球 - 人類首次登月的歷史時刻' },
    { src: 'james-webb.jpg', caption: '詹姆斯·韋伯太空望遠鏡 - 人類最強眼睛，深入觀測宇宙黎明' },
    { src: 'Saturn.jpg', caption: '土星與光環 - 太陽系中最具代表性的行星影像' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  openLightbox(index: number) {
    this.currentIndex = index;
    this.isLightboxVisible = true;
  }

  closeLightbox() {
    this.isLightboxVisible = false;
  }

  prevImage(event: Event) {
    event.stopPropagation();
    this.currentIndex = (this.currentIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
  }

  nextImage(event: Event) {
    event.stopPropagation();
    this.currentIndex = (this.currentIndex + 1) % this.galleryImages.length;
  }

  onLightboxBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).id === 'lightbox') {
      this.closeLightbox();
    }
  }

  ngOnInit(): void {
    // 只在瀏覽器環境中執行
    if (isPlatformBrowser(this.platformId)) {
      // 確保頁面滾動到頂部
      window.scrollTo(0, 0);

      // 添加鍵盤事件監聽
      document.addEventListener('keydown', this.handleKeydown.bind(this));

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
    // 只在瀏覽器環境中執行
    if (isPlatformBrowser(this.platformId)) {
      // 移除鍵盤事件監聽
      document.removeEventListener('keydown', this.handleKeydown.bind(this));
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    if (!this.isLightboxVisible) return;

    switch (event.key) {
      case 'Escape':
        this.closeLightbox();
        break;
      case 'ArrowLeft':
        this.prevImage(event);
        break;
      case 'ArrowRight':
        this.nextImage(event);
        break;
    }
  }
}
