import { Component, inject } from '@angular/core';
import {
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
  router = inject(Router);
  documentLoaderService = inject(DocumentLoaderService);

  title = 'NgDynamicJsonForm';
  routeLoading = false;

  ngOnInit(): void {
    // No need to use `takeUntil()` because this is the root of the app
    // And this is one time action, no repeated subscription
    this.router.events
      .pipe(
        tap((x) => {
          if (x instanceof RouteConfigLoadStart) {
            this.routeLoading = true;
          }

          if (x instanceof RouteConfigLoadEnd) {
            this.routeLoading = false;
          }
        })
      )
      .subscribe();
  }
}
