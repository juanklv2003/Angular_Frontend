import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  template: ''
})
export class AuthCallbackComponent {
  constructor(route: ActivatedRoute, auth: AuthService, router: Router) {
    const token = route.snapshot.queryParamMap.get('token');
    if (token) auth.saveToken(token);
    router.navigate(['/']);
  }
}
