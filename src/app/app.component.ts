import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { delay, tap } from 'rxjs/operators';
import { DocumentLoaderService } from './features/document/services/document-loader.service';
import { DocumentVersionService } from './features/document/services/document-version.service';
import { LanguageDataService } from './features/language/services/language-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _docLoaderService = inject(DocumentLoaderService);
  private _docVersionService = inject(DocumentVersionService);
  private _langService = inject(LanguageDataService);

  title = 'NgDynamicJsonForm';
  routeLoading = false;

  docLoading$ = this._docLoaderService.docLoading$.pipe(delay(0));

  ngOnInit(): void {
    // No need to use `takeUntil()` because this is the root of the app
    // And this is one time action, no repeated subscription
    const routeChange$ = this._router.events.pipe(
      tap((x) => {
        if (x instanceof RouteConfigLoadStart) {
          this.routeLoading = true;
        }

        if (x instanceof RouteConfigLoadEnd) {
          this.routeLoading = false;
        }

        if (x instanceof NavigationEnd) {
          this._langService
            .setLanguage$(this._langService.languageFromUrl)
            .subscribe();
        }
      })
    );

    const docVersions$ = this._docVersionService.loadVersions$();

    routeChange$.subscribe();
    docVersions$.subscribe();
  }
}
