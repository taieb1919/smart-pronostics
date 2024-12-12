import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prediction-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Sport</label>
          <select
            [(ngModel)]="filters.sport"
            (ngModelChange)="onFilterChange()"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Tous les sports</option>
            <option value="football">Football</option>
            <option value="tennis">Tennis</option>
            <option value="basketball">Basketball</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input
            type="date"
            [(ngModel)]="filters.date"
            (ngModelChange)="onFilterChange()"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Cote minimum</label>
          <input
            type="number"
            [(ngModel)]="filters.minOdds"
            (ngModelChange)="onFilterChange()"
            min="1"
            step="0.1"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
        </div>
      </div>
    </div>
  `
})
export class PredictionFiltersComponent {
  @Output() filterChange = new EventEmitter<any>();

  filters = {
    sport: '',
    date: '',
    minOdds: null
  };

  onFilterChange() {
    this.filterChange.emit(this.filters);
  }
}