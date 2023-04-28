import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/page-home/page-home.component').then(
        (c) => c.PageHomeComponent
      ),
  },
  {
    path: 'getting-started',
    loadComponent: () =>
      import(
        './pages/page-getting-started/page-getting-started.component'
      ).then((c) => c.PageGettingStartedComponent),
  },
  {
    path: 'api',
    loadComponent: () =>
      import('./pages/page-api/page-api.component').then(
        (c) => c.PageApiComponent
      ),
  },
  {
    path: 'playground',
    loadComponent: () =>
      import('./pages/page-playground/page-playground.component').then(
        (c) => c.PagePlaygroundComponent
      ),
  },
  {
    path: 'styling',
    loadComponent: () =>
      import('./pages/page-styling/page-styling.component').then(
        (c) => c.PageStylingComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
