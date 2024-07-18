import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, DestroyRef, Renderer2, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  delay,
  distinctUntilChanged,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { FADE_UP_ANIMATION } from 'src/app/animations/fade-up.animation';
import { LayoutService } from 'src/app/core/services/layout.service';
import { getHeaderHeight } from 'src/app/core/utilities/get-header-height';
import { scrollToTitle } from 'src/app/core/utilities/scroll-to-title';
import { DocsRouterLinkDirective } from 'src/app/features/doc/directives/doc-router-link.directive';
import { DocsLoaderService } from 'src/app/features/doc/services/docs-loader.service';
import { LanguageService } from 'src/app/features/language/language-data.service';
import { MarkdownService } from 'src/app/features/markdown/markdown.service';
import { NavigatorIndexComponent } from 'src/app/features/navigator/components/navigator-index/navigator-index.component';
import { NavigatorTitleComponent } from 'src/app/features/navigator/components/navigator-title/navigator-title.component';
import { NavigatorService } from 'src/app/features/navigator/services/navigator.service';
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
  private _destroyRef = inject(DestroyRef);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _title = inject(Title);
  private _viewportScroller = inject(ViewportScroller);
  private _renderer2 = inject(Renderer2);
  private _docLoaderService = inject(DocsLoaderService);
  private _navigatorService = inject(NavigatorService);
  private _markdownService = inject(MarkdownService);
  private _layoutService = inject(LayoutService);
  private _langService = inject(LanguageService);
  private _useAnchorScrolling = false;
  private _loadDoc$ = this._route.url.pipe(
    map((x) => x.map(({ path }) => path).join('/')),
    switchMap((x) => (x === 'docs' ? this._getDefaultPath$() : of(x))),
    distinctUntilChanged(),
    switchMap((x) => this._docLoaderService.loadDoc$(x)),
    tap((x) => {
      const title = x
        .match(/^#{1}.*/)?.[0]
        .replace('#', '')
        .trim();

      this._title.setTitle(title ?? 'NgDynamicJsonForm');
    })
  );

  showMobileMenu = false;

  windowSize$ = this._layoutService.windowSize$.pipe(delay(0));

  content$: Observable<SafeHtml> = this._loadDoc$.pipe(
    map((x) => this._markdownService.parse(x)),
    tap(() => {
      this._navigatorService.getNavigatorTitles();
      this._docLoaderService.wrapTable();
      this.toggleMobileMenu(false);
      this._scrollToContent();
    })
  );

  ngOnInit(): void {
    this._reloadOnLanguageChange();
  }

  ngOnDestroy(): void {
    this._docLoaderService.clearCache();
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

  private _getDefaultPath$(): Observable<any> {
    return this._docLoaderService
      .firstContentPath$()
      .pipe(tap((x) => this._router.navigateByUrl(x, { replaceUrl: true })));
  }

  private _reloadOnLanguageChange(): void {
    this._langService.language$
      .pipe(
        tap(() => {
          if (!this._router.url.includes('.md')) return;

          const currentRoute = this._router.url;
          const { selectedLanguage, languageFromUrl } = this._langService;
          const newRoute = currentRoute.replace(
            `_${languageFromUrl}.md` ?? '',
            `_${selectedLanguage}.md`
          );

          this._router.navigateByUrl(newRoute);
        }),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
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
}
