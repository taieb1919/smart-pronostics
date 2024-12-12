import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-gray-800 text-white py-8" role="contentinfo">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">PronoSports</h3>
            <p class="text-gray-400">
              Les meilleurs pronostics sportifs pour maximiser vos chances de gains.
            </p>
          </div>
          <nav aria-label="Liens du pied de page">
            <h3 class="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul class="space-y-2">
              <li><a routerLink="/predictions" class="text-gray-400 hover:text-white transition-colors">Pronostics</a></li>
              <li><a routerLink="/subscription" class="text-gray-400 hover:text-white transition-colors">Abonnements</a></li>
              <li><a routerLink="/contact" class="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </nav>
          <div>
            <h3 class="text-lg font-semibold mb-4">Contact</h3>
            <p class="text-gray-400">
              Email: contact&#64;pronosports.fr<br>
              Suivez-nous sur les réseaux sociaux
            </p>
            <div class="mt-4 flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 PronoSports. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}