import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Injector,
  Type,
  inject,
} from '@angular/core';
import { createCustomElement } from '@angular/elements';
import {
  NavigationEnd,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { EMPTY, Observable, fromEvent } from 'rxjs';
import { debounceTime, delay, tap } from 'rxjs/operators';
import { LayoutService } from './core/services/layout.service';
import { CustomLoadingComponent } from './example/components/custom-loading/custom-loading.component';
import { InputLayoutIllustrationComponent } from './example/components/input-layout-illustration/input-layout-illustration.component';
import { DocCodeComponent } from './features/doc/components/doc-code/doc-code.component';
import { DocFormViewerComponent } from './features/doc/components/doc-form-viewer/doc-form-viewer.component';
import { DocTabComponent } from './features/doc/components/doc-tab/doc-tab.component';
import { DocsLoaderService } from './features/doc/services/docs-loader.service';
import { FormStyleTweakerComponent } from './features/form-style-tweaker/form-style-tweaker.component';
import { HeaderComponent } from './features/header/components/header/header.component';
import { LanguageService } from './features/language/language-data.service';
import { UiLoadingIndicatorComponent } from './features/ui-loading-indicator/ui-loading-indicator.component';

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
  private _cd = inject(ChangeDetectorRef);
  private _injector = inject(Injector, { optional: true });
  private _router = inject(Router);
  private _docsLoaderService = inject(DocsLoaderService);
  private _langService = inject(LanguageService);
  private _layoutService = inject(LayoutService);

  title = 'NgDynamicJsonForm';
  routeLoading = false;
  isServer = true;

  headerHeight$ = this._layoutService.headerHeight$.pipe(delay(0));
  docLoading$ = this._docsLoaderService.docLoading$.pipe(delay(0));

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.setTimeout(() => (this.isServer = false));
    }

    this._loadGoogleFonts();
    this._registerCustomElements();
    this._routeChangeEvent$().subscribe();
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
    if (typeof window === 'undefined') {
      return EMPTY;
    }

    // No need to take care of unsubscription because it is one time action
    // as this subscribe only in the root of the app.
    return this._router.events.pipe(
      tap((x) => {
        if (x instanceof RouteConfigLoadStart || x instanceof NavigationStart) {
          this.routeLoading = true;
        }

        if (x instanceof RouteConfigLoadEnd || x instanceof NavigationEnd) {
          this.routeLoading = false;
          this._langService.setCurrentLanguage();
          this._cd.detectChanges();
        }
      })
    );
  }

  private _loadGoogleFonts(): void {
    if (typeof window === 'undefined') return;

    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=Noto+Sans+TC:wght@300;400;500;700&family=Roboto:wght@300;400;500;700&display=swap';
    link.rel = 'stylesheet';

    document.head.append(link);
  }

  private _registerCustomElements(): void {
    if (typeof window === 'undefined' || !this._injector) {
      return;
    }

    const create = (selector: string, component: Type<any>) => {
      customElements.define(
        selector,
        createCustomElement(component, {
          injector: this._injector!,
        })
      );
    };

    create('doc-code', DocCodeComponent);
    create('doc-tab', DocTabComponent);
    create('custom-loading', CustomLoadingComponent);
    create('doc-form-viewer', DocFormViewerComponent);
    create('input-layout-illustration', InputLayoutIllustrationComponent);
    create('form-style-tweaker', FormStyleTweakerComponent);
  }
}
