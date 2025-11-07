import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

declare var AOS: any;

@Component({
  selector: 'app-explore',
  imports: [CommonModule],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    // 只在瀏覽器環境中執行
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
}
