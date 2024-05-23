import { CommonModule } from '@angular/common';
import { Component, Injector, Type, inject } from '@angular/core';
import { NgElementConfig, createCustomElement } from '@angular/elements';
import {
  NavigationEnd,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime, delay, tap } from 'rxjs/operators';
import { LayoutService } from './core/services/layout.service';
import { DocsCustomErrorMessageComponent } from './docs-example/components/docs-custom-error-message/docs-custom-error-message.component';
import { CustomLoadingComponent } from './example/components/custom-loading/custom-loading.component';
import { DocCodeComponent } from './features/doc/components/doc-code/doc-code.component';
import { DocsLoaderService } from './features/doc/services/docs-loader.service';
import { DocFormViewerComponent } from './features/doc/components/doc-form-viewer/doc-form-viewer.component';
import { HeaderComponent } from './features/header/components/header/header.component';
import { LanguageDataService } from './features/language/language-data.service';
import { UiLoadingIndicatorComponent } from './features/ui-loading-indicator/ui-loading-indicator.component';
import { VersionService } from './features/version/version.service';
import { NgDynamicJsonFormComponent } from 'ng-dynamic-json-form';
import { DocTabComponent } from './features/doc/components/doc-tab/doc-tab.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    UiLoadingIndicatorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private _injector = inject(Injector, { optional: true });
  private _router = inject(Router);
  private _docsLoaderService = inject(DocsLoaderService);
  private _versionService = inject(VersionService);
  private _langService = inject(LanguageDataService);
  private _layoutService = inject(LayoutService);

  title = 'NgDynamicJsonForm';
  routeLoading = false;

  docLoading$ = this._docsLoaderService.docLoading$.pipe(delay(0));

  ngOnInit(): void {
    const routeChange$ = this._routeChangeEvent$();
    const docVersions$ = this._versionService.loadVersions$();

    merge(routeChange$, docVersions$).subscribe();
    this._registerCustomElements();
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    this._layoutService.updateHeaderHeight();
    this._layoutService.updateWindowSize();
    fromEvent(window, 'resize', { passive: true })
      .pipe(
        debounceTime(50),
        tap(() => {
          this._layoutService.updateHeaderHeight();
          this._layoutService.updateWindowSize();
        })
      )
      .subscribe();
  }

  private _routeChangeEvent$(): Observable<any> {
    // No need to take care of unsubscription because this is the root of the app.
    // And this is one time action, no repeated subscription
    return this._router.events.pipe(
      tap((x) => {
        if (x instanceof RouteConfigLoadStart) {
          this.routeLoading = true;
        }

        if (x instanceof RouteConfigLoadEnd) {
          this.routeLoading = false;
        }

        if (x instanceof NavigationEnd) {
          this._langService.language$.next(this._langService.currentLanguage);
        }
      })
    );
  }

  private _registerCustomElements(): void {
    if (typeof window === 'undefined' || !this._injector) {
      return;
    }

    const options: NgElementConfig = {
      injector: this._injector,
    };

    const create = (selector: string, component: Type<any>) => {
      customElements.define(selector, createCustomElement(component, options));
    };

    create('doc-code', DocCodeComponent);
    create('doc-tab', DocTabComponent);
    create('custom-error-message', DocsCustomErrorMessageComponent);
    create('custom-loading', CustomLoadingComponent);
    create('doc-form-viewer', DocFormViewerComponent);
  }
}
