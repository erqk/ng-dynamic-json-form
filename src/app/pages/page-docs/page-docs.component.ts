import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
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

@Component({
    selector: 'app-page-docs',
    imports: [
        CommonModule,
        UiContentWrapperComponent,
        DocsRouterLinkDirective,
        NavigatorIndexComponent,
        NavigatorTitleComponent,
    ],
    templateUrl: './page-docs.component.html',
    styleUrls: ['./page-docs.component.scss'],
    animations: [FADE_UP_ANIMATION]
})
export class PageDocsComponent {
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);
  private viewportScroller = inject(ViewportScroller);
  private docLoaderService = inject(DocsLoaderService);
  private navigatorService = inject(NavigatorService);
  private markdownService = inject(MarkdownService);
  private layoutService = inject(LayoutService);
  private langService = inject(LanguageService);
  private useAnchorScrolling = false;
  private loadDoc$ = this.route.url.pipe(
    map((x) => x.map(({ path }) => path).join('/')),
    switchMap((x) => (x === 'docs' ? this.getDefaultPath$() : of(x))),
    distinctUntilChanged(),
    switchMap((x) => this.docLoaderService.loadDoc$(x)),
    tap((x) => {
      const title = x
        .match(/^#{1}.*/)?.[0]
        .replace('#', '')
        .trim();

      this.title.setTitle(title ?? 'NgDynamicJsonForm');
    })
  );

  showMobileMenu = false;

  windowSize$ = this.layoutService.windowSize$.pipe(delay(0));

  content$: Observable<SafeHtml> = this.loadDoc$.pipe(
    map((x) => this.markdownService.parse(x)),
    tap(() => {
      this.navigatorService.getNavigatorTitles();
      this.docLoaderService.wrapTable();
      this.toggleMobileMenu(false);
      this.scrollToContent();
    })
  );

  ngOnInit(): void {
    this.reloadOnLanguageChange();
  }

  ngOnDestroy(): void {
    this.docLoaderService.clearCache();
  }

  toggleMobileMenu(value?: boolean): void {
    this.showMobileMenu = value ?? !this.showMobileMenu;
  }

  setSmoothScroll(value: boolean): void {
    const html = document.querySelector('html') as HTMLElement;
    html.style.scrollBehavior = value ? 'smooth' : '';
  }

  private getDefaultPath$(): Observable<any> {
    return this.docLoaderService
      .firstContentPath$()
      .pipe(tap((x) => this.router.navigateByUrl(x, { replaceUrl: true })));
  }

  private reloadOnLanguageChange(): void {
    this.langService.language$
      .pipe(
        tap(() => {
          if (!this.router.url.includes('.md')) return;

          const currentRoute = this.router.url;
          const { selectedLanguage, languageFromUrl } = this.langService;
          const newRoute = currentRoute.replace(
            !languageFromUrl ? '' : `_${languageFromUrl}.md`,
            `_${selectedLanguage}.md`
          );

          this.router.navigateByUrl(newRoute);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private scrollToContent(): void {
    if (typeof window === 'undefined') return;

    const id = this.route.snapshot.fragment?.split('?')[0];

    this.viewportScroller.setOffset([0, getHeaderHeight() + 30]);

    if (!id) {
      window.scrollTo({ top: 0 });
      return;
    }

    if (!this.useAnchorScrolling) {
      this.useAnchorScrolling = true;

      window.requestAnimationFrame(() => {
        const target = document.querySelector(`#${id}`);
        target && scrollToTitle(target, 'auto');
      });
    }
  }
}
