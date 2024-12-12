import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getCurrentUser();
    if (!user || user.role !== 'admin') {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}