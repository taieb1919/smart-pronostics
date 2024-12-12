import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionPlan } from '../../../core/models/subscription.model';

@Component({
  selector: 'app-subscription-plan',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
         [class.border-2]="plan.name === 'premium'"
         [class.border-blue-500]="plan.name === 'premium'">
      <div class="px-6 py-8">
        <h3 class="text-2xl font-bold text-center mb-2 capitalize">{{ plan.name }}</h3>
        <div class="text-center mb-6">
          <span class="text-4xl font-bold">{{ plan.price }}€</span>
          <span class="text-gray-600">/mois</span>
        </div>

        <ul class="space-y-4 mb-8">
          @for (feature of plan.features; track feature) {
            <li class="flex items-start">
              <svg class="h-6 w-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>{{ feature }}</span>
            </li>
          }
        </ul>

        <button
          (click)="onSubscribe()"
          class="w-full py-3 px-6 rounded-md text-white font-semibold transition-colors duration-200"
          [class.bg-blue-600]="plan.name === 'premium'"
          [class.hover:bg-blue-700]="plan.name === 'premium'"
          [class.bg-gray-600]="plan.name !== 'premium'"
          [class.hover:bg-gray-700]="plan.name !== 'premium'"
        >
          {{ plan.name === 'free' ? 'Commencer gratuitement' : 'Souscrire maintenant' }}
        </button>
      </div>
    </div>
  `
})
export class SubscriptionPlanComponent {
  @Input({ required: true }) plan!: SubscriptionPlan;
  @Output() subscribe = new EventEmitter<string>();

  onSubscribe() {
    this.subscribe.emit(this.plan.id);
  }
}