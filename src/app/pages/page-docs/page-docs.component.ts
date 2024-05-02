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
import { DocumentIndexComponent } from 'src/app/features/document/components/document-index/document-index.component';
import { DocumentVersionSelectorComponent } from 'src/app/features/document/components/document-version-selector/document-version-selector.component';
import { DocumentRouterLinkDirective } from 'src/app/features/document/directives/document-router-link.directive';
import { DocumentLoaderService } from 'src/app/features/document/services/document-loader.service';
import { DocumentVersionService } from 'src/app/features/document/services/document-version.service';
import { LanguageDataService } from 'src/app/features/language/services/language-data.service';
import { SideNavigationPaneComponent } from 'src/app/features/side-navigation-pane/side-navigation-pane.component';
import { SideNavigationPaneService } from 'src/app/features/side-navigation-pane/side-navigation-pane.service';
import { UiContentWrapperComponent } from 'src/app/features/ui-content-wrapper/ui-content-wrapper.component';

@Component({
  selector: 'app-page-docs',
  standalone: true,
  imports: [
    CommonModule,
    UiContentWrapperComponent,
    DocumentRouterLinkDirective,
    DocumentIndexComponent,
    DocumentVersionSelectorComponent,
    SideNavigationPaneComponent,
  ],
  templateUrl: './page-docs.component.html',
  styleUrls: ['./page-docs.component.scss'],
})
export class PageDocsComponent {
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _renderer2 = inject(Renderer2);
  private _docVersionService = inject(DocumentVersionService);
  private _docLoaderService = inject(DocumentLoaderService);
  private _layoutService = inject(LayoutService);
  private _sideNavigationPaneService = inject(SideNavigationPaneService);
  private _langService = inject(LanguageDataService);

  private _useRouterScroll = false;

  showMobileMenu = false;

  headerHeight$ = this._layoutService.headerHeight$.pipe(delay(0));
  windowSize$ = this._layoutService.windowSize$.pipe(delay(0));

  content$ = this._route.url.pipe(
    map((x) => x.map(({ path }) => path).join('/')),
    switchMap((x) => {
      return !x ? this._loadFallbackDoc$() : this._docLoaderService.loadDocHtml$(x);
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
