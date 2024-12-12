import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionPlanComponent } from './components/subscription-plan.component';
import { SubscriptionService } from '../../core/services/subscription.service';
import { SubscriptionPlan } from '../../core/models/subscription.model';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, SubscriptionPlanComponent],
  template: `
    <div class="bg-gray-50 py-12">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Nos Abonnements</h1>
          <p class="text-xl text-gray-600">
            Choisissez le plan qui correspond le mieux à vos besoins
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          @for (plan of subscriptionPlans; track plan.id) {
            <app-subscription-plan
              [plan]="plan"
              (subscribe)="onSubscribe($event)"
            />
          }
        </div>

        <div class="mt-12 text-center">
          <p class="text-gray-600">
            Tous nos abonnements incluent une garantie satisfait ou remboursé de 30 jours
          </p>
        </div>
      </div>
    </div>
  `
})
export class SubscriptionComponent implements OnInit {
  subscriptionPlans: SubscriptionPlan[] = [];

  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit() {
    this.subscriptionService.getSubscriptionPlans().subscribe(
      plans => this.subscriptionPlans = plans
    );
  }

  onSubscribe(planId: string) {
    // TODO: Implement subscription logic with payment integration
    console.log('Subscribing to plan:', planId);
  }
}