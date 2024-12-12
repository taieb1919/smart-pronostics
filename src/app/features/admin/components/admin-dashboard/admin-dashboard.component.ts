import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Administration</h1>
      
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 class="text-xl font-semibold mb-4">Gestion des Abonnements</h2>
          <p class="text-gray-600 mb-4">Gérez les prix et les caractéristiques des différents plans d'abonnement.</p>
          <a routerLink="subscriptions" class="text-blue-600 hover:text-blue-800 font-medium">
            Gérer les abonnements →
          </a>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 class="text-xl font-semibold mb-4">Codes Promotionnels</h2>
          <p class="text-gray-600 mb-4">Créez et gérez les codes promo pour vos abonnements.</p>
          <a routerLink="promo-codes" class="text-blue-600 hover:text-blue-800 font-medium">
            Gérer les codes promo →
          </a>
        </div>
      </div>
    </div>
  `
})
export class AdminDashboardComponent {}