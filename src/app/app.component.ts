import { Component, Injector, Type, inject } from '@angular/core';
import { NgElementConfig, createCustomElement } from '@angular/elements';
import {
  NavigationEnd,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime, delay, tap } from 'rxjs/operators';
import { LayoutService } from './core/services/layout.service';
import { DocsCustomErrorMessageComponent } from './docs-example/components/docs-custom-error-message/docs-custom-error-message.component';
import { CustomLoadingComponent } from './example/components/custom-loading/custom-loading.component';
import { DocumentLoaderService } from './features/document/services/document-loader.service';
import { ExampleContainerComponent } from './features/example-container/example-container.component';
import { LanguageDataService } from './features/language/services/language-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private _injector = inject(Injector, { optional: true });
  private _router = inject(Router);
  private _docLoaderService = inject(DocumentLoaderService);
  private _langService = inject(LanguageDataService);
  private _layoutService = inject(LayoutService);

  title = 'NgDynamicJsonForm';
  routeLoading = false;

  docLoading$ = this._docLoaderService.docLoading$.pipe(delay(0));

  ngOnInit(): void {
    const routeChange$ = this._routeChangeEvent$();

    merge(routeChange$).subscribe();
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

    create('custom-error-message', DocsCustomErrorMessageComponent);
    create('custom-loading', CustomLoadingComponent);
    create('example-container', ExampleContainerComponent);
  }
}
