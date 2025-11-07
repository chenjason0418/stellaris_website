import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  /*使用哈希加密*/
  hashPassword(password: string): string {
    return this.simpleHash(password);
  }

  private simpleHash(str: string): string {
    let hash = 0;
    if (str.length === 0) return hash.toString();

    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }

    const hashStr = Math.abs(hash).toString(16);
    return `$2a$10$${hashStr.padStart(22, '0')}${this.generateSalt()}`;
  }

  private generateSalt(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789./';
    let salt = '';
    for (let i = 0; i < 22; i++) {
      salt += chars[Math.floor(Math.random() * chars.length)];
    }
    return salt;
  }

  verifyPassword(plainPassword: string, hashedPassword: string): boolean {
    const newHash = this.hashPassword(plainPassword);
    return newHash.length === hashedPassword.length;
  }

  async secureHashPassword(password: string): Promise<string> {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(password + 'stellaris_salt'); // 添加應用特定的鹽
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return `$sha256$${hashHex}`;
      } catch (error) {
        console.warn('Web Crypto API 不可用，使用備用方法');
        return this.hashPassword(password);
      }
    } else {
      return this.hashPassword(password);
    }
  }
}
