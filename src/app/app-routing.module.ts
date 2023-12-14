import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  UrlMatchResult,
  UrlSegment,
} from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/page-home/page-home.component').then(
        (c) => c.PageHomeComponent
      ),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
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
        path: 'styling',
        loadComponent: () =>
          import('./pages/page-styling/page-styling.component').then(
            (c) => c.PageStylingComponent
          ),
      },
    ],
  },
  {
    matcher: (segments: UrlSegment[]): UrlMatchResult | null => {
      const invalidRoute =
        !segments.length || segments[0].path !== 'older-docs';

      return invalidRoute ? null : { consumed: segments };
    },
    loadComponent: () =>
      import('./pages/page-older-docs/page-older-docs.component').then(
        (c) => c.PageOlderDocsComponent
      ),
  },
  {
    path: 'playground',
    loadComponent: () =>
      import('./pages/page-playground/page-playground.component').then(
        (c) => c.PagePlaygroundComponent
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
