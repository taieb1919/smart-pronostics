import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Prediction } from '../../../core/models';

@Component({
  selector: 'app-prediction-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h3 class="text-lg font-semibold">{{ prediction.match }}</h3>
          <p class="text-gray-600">{{ prediction.competition }}</p>
        </div>
        <span class="px-3 py-1 rounded-full text-sm"
          [ngClass]="{
            'bg-yellow-100 text-yellow-800': prediction.status === 'pending',
            'bg-green-100 text-green-800': prediction.status === 'won',
            'bg-red-100 text-red-800': prediction.status === 'lost'
          }">
          {{ prediction.status | titlecase }}
        </span>
      </div>
      
      <div class="mb-4">
        <div class="flex justify-between mb-2">
          <span class="text-gray-600">Pronostic:</span>
          <span class="font-medium">{{ prediction.prediction }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Cote:</span>
          <span class="font-medium">{{ prediction.odds }}</span>
        </div>
      </div>
      
      <div class="border-t pt-4">
        <p class="text-sm text-gray-700">{{ prediction.analysis }}</p>
        <div class="mt-3 flex items-center">
          <span class="text-sm text-gray-600">Confiance:</span>
          <div class="ml-2 flex-grow bg-gray-200 rounded-full h-2">
            <div class="bg-blue-600 rounded-full h-2"
              [style.width.%]="prediction.confidence">
            </div>
          </div>
          <span class="ml-2 text-sm font-medium">{{ prediction.confidence }}%</span>
        </div>
      </div>
    </div>
  `
})
export class PredictionCardComponent {
  @Input({ required: true }) prediction!: Prediction;
}