import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredictionCardComponent } from './components/prediction-card.component';
import { PredictionFiltersComponent } from './components/prediction-filters.component';
import { PredictionsService } from './predictions.service';
import { Prediction } from '../../core/models/prediction.model';

@Component({
  selector: 'app-predictions',
  standalone: true,
  imports: [CommonModule, PredictionCardComponent, PredictionFiltersComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Pronostics Sportifs</h1>
      
      <app-prediction-filters
        (filterChange)="onFilterChange($event)"
        class="mb-8"
      />

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (prediction of predictions; track prediction.id) {
          <app-prediction-card
            [prediction]="prediction"
          />
        }
      </div>
    </div>
  `
})
export class PredictionsComponent implements OnInit {
  predictions: Prediction[] = [];

  constructor(private predictionsService: PredictionsService) {}

  ngOnInit() {
    this.loadPredictions();
  }

  loadPredictions() {
    this.predictionsService.getPredictions().subscribe(
      predictions => this.predictions = predictions
    );
  }

  onFilterChange(filters: any) {
    this.predictionsService.getPredictions(filters).subscribe(
      predictions => this.predictions = predictions
    );
  }
}