import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule, UrlSegment } from '@angular/router';
import { Subject, catchError, combineLatest, switchMap, takeUntil } from 'rxjs';
import { DocumentOldVersionViewerComponent } from 'src/app/features/document/components/document-old-version-viewer/document-old-version-viewer.component';
import { DocumentLoaderService } from 'src/app/features/document/services/document-loader.service';
import { LanguageDataService } from 'src/app/features/language/services/language-data.service';
import { UiContentWrapperComponent } from 'src/app/features/ui-content-wrapper/ui-content-wrapper.component';

@Component({
  selector: 'app-page-older-docs',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UiContentWrapperComponent,
    DocumentOldVersionViewerComponent,
  ],
  templateUrl: './page-older-docs.component.html',
  styleUrls: ['./page-older-docs.component.scss'],
})
export class PageOlderDocsComponent {
  private _route = inject(ActivatedRoute);
  private _languageDataService = inject(LanguageDataService);
  private _docLoaderService = inject(DocumentLoaderService);
  private _onDestroy$ = new Subject<void>();

  backUrl = '';
  version = '';

  ngOnInit(): void {
    this._loadContent();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  private _loadContent(): void {
    combineLatest([this._route.url, this._languageDataService.language$])
      .pipe(
        switchMap(([route, lang]) => {
          const filePath = route
            .slice(1)
            .map((x) => x.path)
            .join('/')
            .replace(/_\w*\.md/, `_${lang}.md`);

          this._updateUrl(filePath);
          this._setBackUrlAndVersion();
          return this._docLoaderService.loadOldDocs$(filePath);
        }),
        catchError(() => this._docLoaderService.loadOldDocs$('')),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }

  private _updateUrl(filePath: string): void {
    window.history.replaceState(
      null,
      '',
      `${window.location.origin}/older-docs/${filePath}`
    );
  }

  private _setBackUrlAndVersion(): void {
    const lang = this._languageDataService.language$.value;
    const urlSegments = this._route.snapshot.url;
    const version = urlSegments
      .map((x) => x.path)
      .slice(1, 2)
      .join('');

    if (!version) {
      this.version = '';
      this.backUrl = '';
      return;
    }

    this.version = version.substring(1);
    this.backUrl =
      urlSegments.length <= 3
        ? `/older-docs`
        : `/older-docs/${version}/index_${lang}.md`;
  }
}
