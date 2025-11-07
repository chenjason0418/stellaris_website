import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var AOS: any;

@Component({
  selector: 'app-learn',
  imports: [CommonModule],
  templateUrl: './learn.component.html'
})
export class LearnComponent implements OnInit {
  activeModalId: string | null = null;

  openModal(index: number): void {
    const modalIds = ['modal-blackhole', 'modal-universe', 'modal-planets', 'modal-nebula'];
    this.activeModalId = modalIds[index];
  }

  closeModal(): void {
    this.activeModalId = null;
  }

  onModalBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  ngOnInit(): void {
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
