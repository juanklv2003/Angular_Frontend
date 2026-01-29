import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { map, take } from 'rxjs';

@Component({
  standalone: true,
  template: `<p style="padding:16px">Procesando login...</p>`
})
export class AuthCallbackPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);

  constructor() {
    this.route.queryParamMap.pipe(
      map(params => params.get('token')),
      take(1)
    ).subscribe((token) => {
      const finalToken = token ?? this.getTokenFromFragment();
      if (finalToken) this.auth.saveToken(finalToken);
      window.location.replace('/');
    });
  }

  private getTokenFromFragment(): string | null {
    const fragment = this.route.snapshot.fragment;
    if (!fragment) return null;

    const params = new URLSearchParams(fragment);
    return params.get('token');
  }
}
