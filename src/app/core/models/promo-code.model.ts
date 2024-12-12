export interface PromoCode {
  id: string;
  code: string;
  discountPercentage: number;
  validFrom: Date;
  validUntil: Date;
  maxUses: number;
  currentUses: number;
  isActive: boolean;
  applicablePlans: string[];
}