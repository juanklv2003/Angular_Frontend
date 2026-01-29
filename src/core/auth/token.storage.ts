import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenStorage {
  private key = 'token';

  get(): string | null {
    return localStorage.getItem(this.key);
  }

  set(token: string) {
    localStorage.setItem(this.key, token);
  }

  clear() {
    localStorage.removeItem(this.key);
  }

  isLogged(): boolean {
    return !!this.get();
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      return null;
    }
  }

  getUserEmail(): string | null {
    const token = this.get();
    if (!token) return null;
    
    const decoded = this.decodeToken(token);
    return decoded?.email || null;
  }
}
