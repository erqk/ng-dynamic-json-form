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
    loadComponent: () =>
      import('./pages/page-home/page-home.component').then(
        (c) => c.PageHomeComponent
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
    path: 'playground',
    loadComponent: () =>
      import('./pages/page-playground/page-playground.component').then(
        (c) => c.PagePlaygroundComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
