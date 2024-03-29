import { Component, Injector, Type, inject } from '@angular/core';
import { NgElementConfig, createCustomElement } from '@angular/elements';
import {
  ActivatedRoute,
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
import { DocumentVersionService } from './features/document/services/document-version.service';
import { LanguageDataService } from './features/language/services/language-data.service';
import { ExampleContainerComponent } from './features/example-container/example-container.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private _injector = inject(Injector);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _docLoaderService = inject(DocumentLoaderService);
  private _docVersionService = inject(DocumentVersionService);
  private _langService = inject(LanguageDataService);
  private _layoutService = inject(LayoutService);

  title = 'NgDynamicJsonForm';
  routeLoading = false;

  docLoading$ = this._docLoaderService.docLoading$.pipe(delay(0));

  ngOnInit(): void {
    const routeChange$ = this._routeChangeEvent$();
    const docVersions$ = this._docVersionService.loadVersions$();

    merge(routeChange$, docVersions$).subscribe();
    this._registerCustomElements();
  }

  ngAfterViewInit(): void {
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
