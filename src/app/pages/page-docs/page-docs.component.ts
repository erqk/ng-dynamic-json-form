import { CommonModule } from '@angular/common';
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
import { LayoutService } from 'src/app/core/services/layout.service';
import { scrollToTitle } from 'src/app/core/utilities/scroll-to-title';
import { DocsRouterLinkDirective } from 'src/app/features/doc/directives/doc-router-link.directive';
import { DocsLoaderService } from 'src/app/features/doc/services/docs-loader.service';
import { LanguageDataService } from 'src/app/features/language/language-data.service';
import { NavigatorIndexComponent } from 'src/app/features/navigator/components/navigator-index/navigator-index.component';
import { NavigatorTitleComponent } from 'src/app/features/navigator/components/navigator-title/navigator-title.component';
import { SidePanelService } from 'src/app/features/navigator/services/navigator.service';
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
})
export class PageDocsComponent {
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _renderer2 = inject(Renderer2);
  private _docLoaderService = inject(DocsLoaderService);
  private _layoutService = inject(LayoutService);
  private _sideNavigationPaneService = inject(SidePanelService);
  private _langService = inject(LanguageDataService);

  private _useRouterScroll = false;
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
      return EMPTY;
    })
  );

  ngOnDestroy(): void {
    this._docLoaderService.clearCache();
  }

  onDocReady(): void {
    this._docLoaderService.wrapTable();
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
    if (this._useRouterScroll) return;

    const id = this._route.snapshot.fragment?.split('?')[0];

    if (!id) {
      window.scrollTo({ top: 0 });
      return;
    }

    this._useRouterScroll = true;

    requestAnimationFrame(() => {
      const target = document.querySelector(`#${id}`);
      if (!target) return;
      scrollToTitle(target, 'auto');
    });
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
