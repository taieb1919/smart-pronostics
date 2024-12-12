import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'predictions',
    loadComponent: () => 
      import('./features/predictions/predictions.component').then(m => m.PredictionsComponent)
  },
  {
    path: 'auth',
    loadChildren: () => 
      import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'subscription',
    loadComponent: () => 
      import('./features/subscription/subscription.component').then(m => m.SubscriptionComponent)
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  }
];