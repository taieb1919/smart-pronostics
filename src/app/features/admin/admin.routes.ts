import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: '',
        loadComponent: () => 
          import('./components/admin-dashboard/admin-dashboard.component')
            .then(m => m.AdminDashboardComponent)
      },
      {
        path: 'subscriptions',
        loadComponent: () => 
          import('./components/subscription-management/subscription-management.component')
            .then(m => m.SubscriptionManagementComponent)
      },
      {
        path: 'promo-codes',
        loadComponent: () => 
          import('./components/promo-code-management/promo-code-management.component')
            .then(m => m.PromoCodeManagementComponent)
      }
    ]
  }
];