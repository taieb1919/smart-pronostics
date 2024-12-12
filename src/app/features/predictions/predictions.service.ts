import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Prediction } from '../../core/models';

@Injectable({
  providedIn: 'root'
})
export class PredictionsService {
  private mockPredictions: Prediction[] = [
    {
      id: '1',
      sport: 'football',
      competition: 'Ligue 1',
      match: 'PSG vs Marseille',
      prediction: 'PSG Victoire',
      odds: 1.85,
      date: new Date(),
      status: 'pending',
      analysis: 'Le PSG est en grande forme à domicile...',
      confidence: 85
    },
    {
      id: '2',
      sport: 'tennis',
      competition: 'Roland Garros',
      match: 'Nadal vs Djokovic',
      prediction: 'Nadal Victoire',
      odds: 2.10,
      date: new Date(),
      status: 'pending',
      analysis: 'Sur terre battue, Nadal reste le favori...',
      confidence: 75
    }
  ];

  getPredictions(filters?: any): Observable<Prediction[]> {
    let filteredPredictions = this.mockPredictions;
    
    if (filters?.sport) {
      filteredPredictions = filteredPredictions.filter(p => p.sport === filters.sport);
    }

    return of(filteredPredictions);
  }
}