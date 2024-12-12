import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="container mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold text-center mb-8">
        Bienvenue sur PronoSports
      </h1>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4">Pronostics du Jour</h2>
          <!-- Liste des pronostics à venir -->
        </div>
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4">Statistiques</h2>
          <!-- Statistiques de réussite -->
        </div>
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4">Derniers Résultats</h2>
          <!-- Derniers résultats -->
        </div>
      </div>
    </section>
  `
})
export class HomeComponent {}