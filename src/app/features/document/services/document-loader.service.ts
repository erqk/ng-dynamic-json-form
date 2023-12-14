import { HttpClient } from '@angular/common/http';
import { Injectable, RendererFactory2, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  delay,
  from,
  map,
  merge,
  mergeMap,
  of,
  switchMap,
  tap,
  toArray,
} from 'rxjs';
import { LanguageDataService } from '../../language/services/language-data.service';
import { DocumentVersionService } from './document-version.service';

@Injectable({
  providedIn: 'root',
})
export class DocumentLoaderService {
  private _renderer2 = inject(RendererFactory2).createRenderer(null, null);
  private _http = inject(HttpClient);
  private _router = inject(Router);
  private _documentVersionService = inject(DocumentVersionService);
  private _languageDataService = inject(LanguageDataService);

  documentLoading$ = new BehaviorSubject<boolean>(false);
  oldDocsContent$ = new BehaviorSubject<string>('');

  loadOldDocs$(filePath: string): Observable<string> {
    const lang = this._languageDataService.language$.value;

    filePath = !filePath
      ? `assets/docs/index_${lang}.md`
      : `assets/docs/${filePath}`;

    return this._http
      .get(`${filePath}?q=${new Date().getTime()}`, { responseType: 'text' })
      .pipe(
        tap((x) => this.oldDocsContent$.next(x)),
        catchError(() => this.loadOldDocs$(''))
      );
  }

  getDocumentContent$(
    parentDirectory: string,
    hasTableOfContent = false
  ): Observable<string> {
    const content$ = (tableOfContent: string[]) =>
      from(tableOfContent).pipe(
        mergeMap((x, i) => {
          const basePath = `assets/docs/v${
            this._documentVersionService.currentVersion
          }${hasTableOfContent ? '/' + parentDirectory : ''}`;
          const filePath = `${basePath}/${x}/${x}_${this._languageDataService.language$.value}.md`;

          return this._http
            .get(`${filePath}?q=${new Date().getTime()}`, { responseType: 'text' })
            .pipe(map((x) => ({ index: i, content: x })));
        }),
        toArray(),
        map((x) =>
          x
            .sort((a, b) => a.index - b.index)
            .map((x) => x.content)
            .join('')
        ),
        catchError(() => {
          return of('');
        })
      );

    return this._settings$.pipe(
      switchMap(() =>
        hasTableOfContent
          ? this._getTableOfContent$(parentDirectory)
          : of([parentDirectory])
      ),
      switchMap((x) => (x.length ? content$(x) : of(''))),
      tap(() => this.documentLoading$.next(false))
    );
  }

  wrapTable(): void {
    const tables = Array.from(
      document.querySelectorAll('table')
    ) as HTMLTableElement[];

    for (const table of tables) {
      const tableWrapper = document.createElement('div');
      const tableCloned = table.cloneNode(true);
      tableWrapper.classList.add('table-wrapper');
      tableWrapper.appendChild(tableCloned);
      table.insertAdjacentElement('beforebegin', tableWrapper);
      table.remove();
    }
  }

  mapCorrectRouterLink(host?: HTMLElement): void {
    const links = Array.from((host || document).querySelectorAll('a')).filter(
      (x) => x.href.startsWith('./')
    );

    console.log(links, (host || document).querySelectorAll('a'));
    links.forEach((x) => {
      const { version } = this._router.parseUrl(this._router.url).queryParams;

      const currentUrlClean = window.location.href.split('?')[0];
      const path = x.href.replace('./', '');
      const newQuery = new URLSearchParams({
        version,
        path,
      }).toString();
      const newHref = `${currentUrlClean}?${newQuery}`;

      this._renderer2.setProperty(x, 'href', newHref);
    });
  }

  private _getTableOfContent$(parentDirectory: string): Observable<string[]> {
    const basePath = `assets/docs/v${this._documentVersionService.currentVersion}/${parentDirectory}`;
    const filePath = `${basePath}/table-of-content.json`;

    return this._http.get(filePath, { responseType: 'text' }).pipe(
      map((x) => JSON.parse(x)),
      catchError(() => {
        return of([]);
      })
    );
  }

  private get _settings$(): Observable<any> {
    return merge(
      this._languageDataService.language$,
      this._documentVersionService.currentVersion$
    ).pipe(
      // https://github.com/angular/angular/issues/23522#issuecomment-385015819
      // add delay(0) before set the `documentLoading$` value to avoid NG0100
      delay(0),
      tap(() => this.documentLoading$.next(true))
    );
  }
}
