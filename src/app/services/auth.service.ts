import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private API = 'http://localhost:3000/auth';

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.API}/login`, { email, password });
  }

  register(data: { email: string; password: string; name: string }) {
    return this.http.post<{ token: string }>(`${this.API}/register`, data);
  }

  loginWithGoogle() {
    window.location.href = `${this.API}/google`;
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');
  }
}
