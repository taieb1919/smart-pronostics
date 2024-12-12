import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SubscriptionPlan } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private plans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'free',
      price: 0,
      duration: 'monthly',
      features: [
        'Accès aux pronostics gratuits',
        'Statistiques de base',
        'Notifications des résultats'
      ]
    },
    {
      id: 'premium',
      name: 'premium',
      price: 29.99,
      duration: 'monthly',
      features: [
        'Tous les avantages gratuits',
        'Pronostics premium',
        'Analyses détaillées',
        'Support prioritaire',
        'Statistiques avancées'
      ]
    },
    {
      id: 'vip',
      name: 'vip',
      price: 99.99,
      duration: 'monthly',
      features: [
        'Tous les avantages premium',
        'Pronostics VIP exclusifs',
        'Conseils personnalisés',
        'Accès au groupe privé',
        'Garantie de gains mensuels'
      ]
    }
  ];

  getSubscriptionPlans(): Observable<SubscriptionPlan[]> {
    return of(this.plans);
  }

  subscribe(planId: string, paymentDetails: any): Observable<boolean> {
    // Simulate API call
    return of(true);
  }
}