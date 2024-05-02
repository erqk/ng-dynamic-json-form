import { CommonModule } from '@angular/common';
import { Component, Renderer2, inject } from '@angular/core';
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
import { DocsRouterLinkDirective } from 'src/app/features/docs/directives/doc-router-link.directive';
import { DocsLoaderService } from 'src/app/features/docs/services/docs-loader.service';
import { LanguageDataService } from 'src/app/features/language/language-data.service';
import { SidePanelPrimaryComponent } from 'src/app/features/side-panel/components/side-panel-primary/side-panel-primary.component';
import { SidePanelSecondaryComponent } from 'src/app/features/side-panel/components/side-panel-secondary/side-panel-secondary.component';
import { SidePanelService } from 'src/app/features/side-panel/services/side-panel.service';
import { UiContentWrapperComponent } from 'src/app/features/ui-content-wrapper/ui-content-wrapper.component';
import { VersionSelectorComponent } from 'src/app/features/version/version-selector.component';
import { VersionService } from 'src/app/features/version/version.service';

@Component({
  selector: 'app-page-docs',
  standalone: true,
  imports: [
    CommonModule,
    UiContentWrapperComponent,
    DocsRouterLinkDirective,
    SidePanelPrimaryComponent,
    VersionSelectorComponent,
    SidePanelSecondaryComponent,
  ],
  templateUrl: './page-docs.component.html',
  styleUrls: ['./page-docs.component.scss'],
})
export class PageDocsComponent {
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _renderer2 = inject(Renderer2);
  private _docVersionService = inject(VersionService);
  private _docLoaderService = inject(DocsLoaderService);
  private _layoutService = inject(LayoutService);
  private _sideNavigationPaneService = inject(SidePanelService);
  private _langService = inject(LanguageDataService);

  private _useRouterScroll = false;

  showMobileMenu = false;

  headerHeight$ = this._layoutService.headerHeight$.pipe(delay(0));
  windowSize$ = this._layoutService.windowSize$.pipe(delay(0));

  content$ = this._route.url.pipe(
    map((x) => x.map(({ path }) => path).join('/')),
    switchMap((x) => {
      return !x
        ? this._loadFallbackDoc$()
        : this._docLoaderService.loadDocHtml$(x);
    }),
    tap(() => {
      this.toggleMobileMenu(false);
      this._setLinkRenderer();
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
    this._docLoaderService.wrapTable();
    this._sideNavigationPaneService.buildNavigationLinks();
    this._docLoaderService.setCodeViewerTag();
    this._docLoaderService.docLoading$.next(false);
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

  private _setLinkRenderer(): void {
    const version = this._docVersionService.currentVersion;
    // this._markdownService.renderer.link =
    //   this._docLoaderService.markdownLinkRenderFn('', {
    //     searchValue: version,
    //     replaceValue: `docs`,
    //   });
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
