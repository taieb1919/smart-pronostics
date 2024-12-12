import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubscriptionService } from '../../../../core/services/subscription.service';
import { AdminService } from '../../../../core/services/admin.service';
import { SubscriptionPlan } from '../../../../core/models';

@Component({
  selector: 'app-subscription-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Gestion des Abonnements</h1>

      <div class="grid gap-8">
        @for (plan of subscriptionPlans; track plan.id) {
          <div class="bg-white rounded-lg shadow-md p-6">
            <form [formGroup]="planForms[plan.id]" (ngSubmit)="onSubmit(plan.id)" class="space-y-6">
              <div class="flex justify-between items-start">
                <h2 class="text-xl font-semibold capitalize">{{ plan.name }}</h2>
                <div class="flex items-center space-x-4">
                  @if (isEditing[plan.id]) {
                    <button
                      type="submit"
                      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      [disabled]="planForms[plan.id].invalid"
                    >
                      Sauvegarder
                    </button>
                    <button
                      type="button"
                      class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                      (click)="cancelEdit(plan.id)"
                    >
                      Annuler
                    </button>
                  } @else {
                    <button
                      type="button"
                      class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                      (click)="startEdit(plan.id)"
                    >
                      Modifier
                    </button>
                  }
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Prix</label>
                  <div class="relative">
                    <span class="absolute left-3 top-2">€</span>
                    <input
                      type="number"
                      formControlName="price"
                      [readonly]="!isEditing[plan.id]"
                      class="pl-8 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Durée</label>
                  <select
                    formControlName="duration"
                    [disabled]="!isEditing[plan.id]"
                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="monthly">Mensuel</option>
                    <option value="yearly">Annuel</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Caractéristiques</label>
                <div formArrayName="features" class="space-y-2">
                  @for (feature of getFeatures(plan.id).controls; track feature; let i = $index) {
                    <div class="flex items-center space-x-2">
                      <input
                        [formControlName]="i"
                        type="text"
                        [readonly]="!isEditing[plan.id]"
                        class="flex-grow rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      @if (isEditing[plan.id]) {
                        <button
                          type="button"
                          (click)="removeFeature(plan.id, i)"
                          class="text-red-600 hover:text-red-800"
                        >
                          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                      }
                    </div>
                  }
                </div>
                @if (isEditing[plan.id]) {
                  <button
                    type="button"
                    (click)="addFeature(plan.id)"
                    class="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    + Ajouter une caractéristique
                  </button>
                }
              </div>
            </form>
          </div>
        }
      </div>
    </div>
  `
})
export class SubscriptionManagementComponent implements OnInit {
  subscriptionPlans: SubscriptionPlan[] = [];
  planForms: { [key: string]: FormGroup } = {};
  isEditing: { [key: string]: boolean } = {};

  constructor(
    private fb: FormBuilder,
    private subscriptionService: SubscriptionService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.subscriptionService.getSubscriptionPlans().subscribe(plans => {
      this.subscriptionPlans = plans;
      plans.forEach(plan => {
        this.initPlanForm(plan);
        this.isEditing[plan.id] = false;
      });
    });
  }

  private initPlanForm(plan: SubscriptionPlan) {
    this.planForms[plan.id] = this.fb.group({
      price: [plan.price, [Validators.required, Validators.min(0)]],
      duration: [plan.duration, Validators.required],
      features: this.fb.array(
        plan.features.map(feature => this.fb.control(feature))
      )
    });
  }

  getFeatures(planId: string) {
    return this.planForms[planId].get('features') as any;
  }

  addFeature(planId: string) {
    const features = this.getFeatures(planId);
    features.push(this.fb.control(''));
  }

  removeFeature(planId: string, index: number) {
    const features = this.getFeatures(planId);
    features.removeAt(index);
  }

  startEdit(planId: string) {
    this.isEditing[planId] = true;
  }

  cancelEdit(planId: string) {
    const plan = this.subscriptionPlans.find(p => p.id === planId);
    if (plan) {
      this.initPlanForm(plan);
    }
    this.isEditing[planId] = false;
  }

  onSubmit(planId: string) {
    if (this.planForms[planId].valid) {
      const updates = this.planForms[planId].value;
      this.adminService.updateSubscriptionPlan(planId, updates).subscribe({
        next: (updatedPlan) => {
          this.isEditing[planId] = false;
          const index = this.subscriptionPlans.findIndex(p => p.id === planId);
          if (index !== -1) {
            this.subscriptionPlans[index] = updatedPlan;
          }
        },
        error: (error) => {
          console.error('Error updating subscription plan:', error);
        }
      });
    }
  }
}