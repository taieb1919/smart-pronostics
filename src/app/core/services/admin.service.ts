import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SubscriptionPlan, PromoCode } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private mockPromoCodes: PromoCode[] = [
    {
      id: '1',
      code: 'WELCOME2024',
      discountPercentage: 20,
      validFrom: new Date('2024-01-01'),
      validUntil: new Date('2024-12-31'),
      maxUses: 100,
      currentUses: 45,
      isActive: true,
      applicablePlans: ['premium', 'vip']
    }
  ];

  updateSubscriptionPlan(planId: string, updates: Partial<SubscriptionPlan>): Observable<SubscriptionPlan> {
    // In production, make an API call
    return of({ id: planId, ...updates } as SubscriptionPlan);
  }

  getPromoCodes(): Observable<PromoCode[]> {
    return of(this.mockPromoCodes);
  }

  createPromoCode(promoCode: Omit<PromoCode, 'id'>): Observable<PromoCode> {
    return of({ ...promoCode, id: Date.now().toString() });
  }

  updatePromoCode(id: string, updates: Partial<PromoCode>): Observable<PromoCode> {
    return of({ ...updates, id } as PromoCode);
  }

  deletePromoCode(id: string): Observable<void> {
    return of(void 0);
  }
}