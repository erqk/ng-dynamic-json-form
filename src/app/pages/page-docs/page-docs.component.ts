import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { EMPTY, Subject, catchError, delay, share, switchMap, tap } from 'rxjs';
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
    MarkdownModule,
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
  private _docVersionService = inject(DocumentVersionService);
  private _docLoaderService = inject(DocumentLoaderService);
  private _layoutService = inject(LayoutService);
  private _markdownService = inject(MarkdownService);
  private _sideNavigationPaneService = inject(SideNavigationPaneService);
  private _langService = inject(LanguageDataService);
  private readonly _onDestroy$ = new Subject<void>();

  showMobileMenu = false;

  headerHeight$ = this._layoutService.headerHeight$.pipe(delay(0));
  windowSize$ = this._layoutService.windowSize$.pipe(delay(0));

  content$ = this._route.url.pipe(
    switchMap((urls) => {
      const filePath = urls
        .slice(1)
        .map(({ path }) => path)
        .join('/');

      return this._docLoaderService.loadDoc$(filePath);
    }),
    tap(() => {
      this._setLinkRenderer();
      this._scrollToContent();
      this.toggleMobileMenu(false);
    }),
    catchError(() => {
      this._reloadDocOnError();
      return EMPTY;
    })
  );

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
    this._docLoaderService.clearCache();
  }

  onReady(): void {
    this._docLoaderService.wrapTable();
    this._sideNavigationPaneService.buildNavigationLinks();
    this._docLoaderService.setCodeViewerTag();
  }

  toggleMobileMenu(value?: boolean): void {
    this.showMobileMenu = value ?? !this.showMobileMenu;
  }

  private _setLinkRenderer(): void {
    const version = this._docVersionService.currentVersion;
    this._markdownService.renderer.link =
      this._docLoaderService.markdownLinkRenderFn('', {
        searchValue: version,
        replaceValue: `docs/${version}`,
      });
  }

  private _scrollToContent(): void {
    const id = this._route.snapshot.fragment?.split('?')[0];

    if (!id) {
      window.scrollTo({ top: 0 });
      return;
    }

    requestAnimationFrame(() => {
      const target = document.querySelector(`#${id}`);
      if (!target) return;
      scrollToTitle(target, 'smooth');
    });
  }

  private _reloadDocOnError(): void {
    let targetRoute = '';
    this._docLoaderService
      .firstContentPath$()
      .pipe(
        switchMap((x) => {
          targetRoute = x;
          return this._router.navigateByUrl('/', { skipLocationChange: true });
        }),
        switchMap(() =>
          this._router.navigateByUrl(`/${targetRoute}`, { replaceUrl: true })
        ),
        switchMap(() => this._langService.loadLanguageData$())
      )
      .subscribe();
  }
}
