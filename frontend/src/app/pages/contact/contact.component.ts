import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var AOS: any;

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit(): void {
    if (this.contactForm.name && this.contactForm.email && this.contactForm.message) {
      alert('訊息已送出，我們會盡快回覆您！');
      this.resetForm();
    } else {
      alert('請填寫所有必填欄位');
    }
  }

  resetForm(): void {
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
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
