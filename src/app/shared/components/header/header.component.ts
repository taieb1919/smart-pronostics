import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <header class="bg-blue-900 text-white">
      <nav class="container mx-auto px-4 py-6">
        <div class="flex justify-between items-center">
          <a routerLink="/" class="text-2xl font-bold">PronoSports</a>
          <div class="space-x-6">
            <a routerLink="/predictions" class="hover:text-blue-300">Pronostics</a>
            <a routerLink="/subscription" class="hover:text-blue-300">Abonnements</a>
            
            @if (currentUser$ | async; as user) {
              <div class="inline-flex items-center space-x-4">
                @if (user.role === 'admin') {
                  <a routerLink="/admin" class="hover:text-blue-300">Administration</a>
                }
                <button 
                  (click)="logout()" 
                  class="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                >
                  Déconnexion
                </button>
              </div>
            } @else {
              <a routerLink="/auth/login" class="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                Connexion
              </a>
            }
          </div>
        </div>
      </nav>
    </header>
  `
})
export class HeaderComponent {
  currentUser$ = this.authService.currentUser$;

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}