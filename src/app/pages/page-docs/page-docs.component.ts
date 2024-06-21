import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, Renderer2, inject } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EMPTY,
  Observable,
  catchError,
  delay,
  from,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { FADE_UP_ANIMATION } from 'src/app/animations/fade-up.animation';
import { LayoutService } from 'src/app/core/services/layout.service';
import { getHeaderHeight } from 'src/app/core/utilities/get-header-height';
import { scrollToTitle } from 'src/app/core/utilities/scroll-to-title';
import { DocsRouterLinkDirective } from 'src/app/features/doc/directives/doc-router-link.directive';
import { DocsLoaderService } from 'src/app/features/doc/services/docs-loader.service';
import { LanguageDataService } from 'src/app/features/language/language-data.service';
import { NavigatorIndexComponent } from 'src/app/features/navigator/components/navigator-index/navigator-index.component';
import { NavigatorTitleComponent } from 'src/app/features/navigator/components/navigator-title/navigator-title.component';
import { UiContentWrapperComponent } from 'src/app/features/ui-content-wrapper/ui-content-wrapper.component';
import { VersionSelectorComponent } from 'src/app/features/version/version-selector.component';

@Component({
  selector: 'app-page-docs',
  standalone: true,
  imports: [
    CommonModule,
    UiContentWrapperComponent,
    DocsRouterLinkDirective,
    NavigatorIndexComponent,
    VersionSelectorComponent,
    NavigatorTitleComponent,
  ],
  templateUrl: './page-docs.component.html',
  styleUrls: ['./page-docs.component.scss'],
  animations: [FADE_UP_ANIMATION],
})
export class PageDocsComponent {
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _viewportScroller = inject(ViewportScroller);
  private _renderer2 = inject(Renderer2);
  private _docLoaderService = inject(DocsLoaderService);
  private _layoutService = inject(LayoutService);
  private _langService = inject(LanguageDataService);
  private _useAnchorScrolling = false;
  private _loadDoc$ = (type: 'safeHTML' | 'string') =>
    this._route.url.pipe(
      map((x) => x.map(({ path }) => path).join('/')),
      switchMap((x) => {
        return !x
          ? this._loadFallbackDoc$()
          : this._docLoaderService.loadDocHtml$(x, type);
      })
    );

  showMobileMenu = false;

  headerHeight$ = this._layoutService.headerHeight$.pipe(delay(0));
  windowSize$ = this._layoutService.windowSize$.pipe(delay(0));

  title$: Observable<string> = this._loadDoc$('string');
  content$: Observable<SafeHtml> = this._loadDoc$('safeHTML').pipe(
    tap(() => {
      this.onDocReady();
      this.toggleMobileMenu(false);
      this._scrollToContent();
    }),
    catchError(() => {
      this._reloadDocOnError();
      return EMPTY;
    })
  );

  ngOnDestroy(): void {
    this._docLoaderService.clearCache();
  }

  onDocReady(): void {
    if (typeof window === 'undefined') return;

    window.setTimeout(() => {
      this._docLoaderService.wrapTable();
    });
  }

  toggleMobileMenu(value?: boolean): void {
    this.showMobileMenu = value ?? !this.showMobileMenu;
  }

  setSmoothScroll(value: boolean): void {
    this._renderer2.setStyle(
      document.querySelector('html'),
      'scroll-behavior',
      value ? 'smooth' : null
    );
  }

  private _scrollToContent(): void {
    if (typeof window === 'undefined') return;

    const id = this._route.snapshot.fragment?.split('?')[0];

    this._viewportScroller.setOffset([0, getHeaderHeight() + 30]);

    if (!id) {
      window.scrollTo({ top: 0 });
      return;
    }

    if (!this._useAnchorScrolling) {
      this._useAnchorScrolling = true;

      window.requestAnimationFrame(() => {
        const target = document.querySelector(`#${id}`);
        target && scrollToTitle(target, 'auto');
      });
    }
  }

  private _loadFallbackDoc$(): Observable<any> {
    return this._docLoaderService.firstContentPath$().pipe(
      switchMap((x) =>
        this._router.navigateByUrl(`/${x}`, { replaceUrl: true })
      ),
      switchMap(() => this._langService.loadLanguageData$())
    );
  }

  private _reloadDocOnError(): void {
    const exitPage$ = from(
      this._router.navigateByUrl('/', { skipLocationChange: true })
    );

    exitPage$.pipe(switchMap(() => this._loadFallbackDoc$())).subscribe();
  }
}
