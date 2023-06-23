import { Component, inject } from '@angular/core';
import {
  NavigationEnd,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { tap } from 'rxjs/operators';
import { DocumentLoaderService } from './features/document/services/document-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  documentLoaderService = inject(DocumentLoaderService);
  private _router = inject(Router);

  title = 'NgDynamicJsonForm';
  routeLoading = false;

  ngOnInit(): void {
    // No need to use `takeUntil()` because this is the root of the app
    // And this is one time action, no repeated subscription
    this._router.events
      .pipe(
        tap((x) => {
          if (x instanceof RouteConfigLoadStart) {
            this.routeLoading = true;
          }

          if (x instanceof RouteConfigLoadEnd) {
            this.routeLoading = false;
          }

          if (x instanceof NavigationEnd) {
            this.documentLoaderService.documentLoading$.next(false)
          }
        })
      )
      .subscribe();
  }
}
