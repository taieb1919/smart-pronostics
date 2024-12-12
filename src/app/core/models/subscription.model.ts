export interface SubscriptionPlan {
  id: string;
  name: 'free' | 'premium' | 'vip';
  price: number;
  duration: 'monthly' | 'yearly';
  features: string[];
}

export interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}