import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorage } from '../../core/auth/token.storage';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="border-b bg-white">
      <div class="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <a routerLink="/" class="font-semibold text-slate-900">Demo App</a>

        <div class="flex items-center gap-3">
          @if (logged()) {
            <span class="text-sm text-slate-600">{{ userEmail() }}</span>
            <button class="rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50" (click)="logout()">
              Logout
            </button>
          } @else {
            <a routerLink="/login" class="rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50">Login</a>
          }
        </div>
      </div>
    </div>
  `
})
export class NavbarComponent {
  private token = inject(TokenStorage);
  private auth = inject(AuthService);

  logged = computed(() => this.token.isLogged());
  userEmail = computed(() => this.token.getUserEmail());

  logout() {
    this.auth.logout();
    location.href = '/login';
  }
}
