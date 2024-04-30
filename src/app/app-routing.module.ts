import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  UrlMatchResult,
  UrlSegment,
} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/page-home/page-home.component').then(
        (c) => c.PageHomeComponent
      ),
  },
  {
    path: 'playground',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/page-playground/page-playground.component').then(
        (c) => c.PagePlaygroundComponent
      ),
  },
  {
    matcher: (segments: UrlSegment[]): UrlMatchResult | null => {
      const invalidRoute = !segments.length || segments[0].path !== 'docs';
      return invalidRoute ? null : { consumed: segments };
    },
    loadComponent: () =>
      import('./pages/page-docs/page-docs.component').then(
        (c) => c.PageDocsComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 100],
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
