export interface Prediction {
  id: string;
  sport: 'football' | 'tennis' | 'basketball';
  competition: string;
  match: string;
  prediction: string;
  odds: number;
  date: Date;
  status: 'pending' | 'won' | 'lost';
  analysis: string;
  confidence: number;
}