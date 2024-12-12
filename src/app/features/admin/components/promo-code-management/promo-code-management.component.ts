import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../../core/services/admin.service';
import { PromoCode } from '../../../../core/models';

@Component({
  selector: 'app-promo-code-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Codes Promotionnels</h1>
        <button
          (click)="showCreateForm = !showCreateForm"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {{ showCreateForm ? 'Annuler' : 'Nouveau Code Promo' }}
        </button>
      </div>

      @if (showCreateForm) {
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-xl font-semibold mb-6">Créer un nouveau code promo</h2>
          <form [formGroup]="promoForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Code</label>
                <input
                  type="text"
                  formControlName="code"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Réduction (%)</label>
                <input
                  type="number"
                  formControlName="discountPercentage"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Valide du</label>
                <input
                  type="date"
                  formControlName="validFrom"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Valide jusqu'au</label>
                <input
                  type="date"
                  formControlName="validUntil"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nombre max d'utilisations</label>
                <input
                  type="number"
                  formControlName="maxUses"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Plans applicables</label>
                <select
                  multiple
                  formControlName="applicablePlans"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="premium">Premium</option>
                  <option value="vip">VIP</option>
                </select>
              </div>
            </div>

            <div class="flex justify-end space-x-4">
              <button
                type="submit"
                [disabled]="promoForm.invalid"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                Créer
              </button>
            </div>
          </form>
        </div>
      }

      <div class="grid gap-6">
        @for (promoCode of promoCodes; track promoCode.id) {
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-lg font-semibold">{{ promoCode.code }}</h3>
                <p class="text-sm text-gray-600">
                  {{ promoCode.discountPercentage }}% de réduction
                </p>
              </div>
              <div class="flex items-center space-x-2">
                <button
                  (click)="togglePromoCode(promoCode)"
                  [class]="promoCode.isActive ? 'text-green-600' : 'text-gray-400'"
                  class="p-2 hover:bg-gray-100 rounded-full"
                >
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"/>
                  </svg>
                </button>
                <button
                  (click)="deletePromoCode(promoCode.id)"
                  class="p-2 text-red-600 hover:bg-gray-100 rounded-full"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-600">Validité:</span>
                <p>Du {{ promoCode.validFrom | date }} au {{ promoCode.validUntil | date }}</p>
              </div>
              <div>
                <span class="text-gray-600">Utilisations:</span>
                <p>{{ promoCode.currentUses }}/{{ promoCode.maxUses }}</p>
              </div>
              <div>
                <span class="text-gray-600">Plans applicables:</span>
                <p class="capitalize">{{ promoCode.applicablePlans.join(', ') }}</p>
              </div>
              <div>
                <span class="text-gray-600">Statut:</span>
                <span [class]="promoCode.isActive ? 'text-green-600' : 'text-red-600'">
                  {{ promoCode.isActive ? 'Actif' : 'Inactif' }}
                </span>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class PromoCodeManagementComponent implements OnInit {
  promoCodes: PromoCode[] = [];
  promoForm: FormGroup;
  showCreateForm = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.promoForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      discountPercentage: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      validFrom: [null, Validators.required],
      validUntil: [null, Validators.required],
      maxUses: [null, [Validators.required, Validators.min(1)]],
      applicablePlans: [[], Validators.required],
      isActive: [true]
    });
  }

  ngOnInit() {
    this.loadPromoCodes();
  }

  loadPromoCodes() {
    this.adminService.getPromoCodes().subscribe(
      codes => this.promoCodes = codes
    );
  }

  onSubmit() {
    if (this.promoForm.valid) {
      const newPromoCode = {
        ...this.promoForm.value,
        currentUses: 0,
        validFrom: new Date(this.promoForm.value.validFrom),
        validUntil: new Date(this.promoForm.value.validUntil)
      };

      this.adminService.createPromoCode(newPromoCode).subscribe({
        next: () => {
          this.loadPromoCodes();
          this.showCreateForm = false;
          this.promoForm.reset();
        },
        error: (error) => {
          console.error('Error creating promo code:', error);
        }
      });
    }
  }

  togglePromoCode(promoCode: PromoCode) {
    this.adminService.updatePromoCode(promoCode.id, {
      isActive: !promoCode.isActive
    }).subscribe({
      next: () => this.loadPromoCodes(),
      error: (error) => console.error('Error toggling promo code:', error)
    });
  }

  deletePromoCode(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce code promo ?')) {
      this.adminService.deletePromoCode(id).subscribe({
        next: () => this.loadPromoCodes(),
        error: (error) => console.error('Error deleting promo code:', error)
      });
    }
  }
}