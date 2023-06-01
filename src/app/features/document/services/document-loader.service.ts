import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
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
  private http = inject(HttpClient);
  private documentVersionService = inject(DocumentVersionService);
  private languageDataService = inject(LanguageDataService);

  documentLoading$ = new BehaviorSubject<boolean>(false);

  getDocumentContent$(
    parentDirectory: string,
    hasTableOfContent = false
  ): Observable<string> {
    const content$ = (tableOfContent: string[]) =>
      from(tableOfContent).pipe(
        mergeMap((x, i) => {
          const basePath = `assets/docs/v${
            this.documentVersionService.currentVersion
          }${hasTableOfContent ? '/' + parentDirectory : ''}`;
          const filePath = `${basePath}/${x}/${x}_${this.languageDataService.language$.value}.md`;

          return this.http
            .get(filePath, { responseType: 'text' })
            .pipe(map((x) => ({ index: i, content: x })));
        }),
        toArray(),
        map((x) =>
          x
            .sort((a, b) => a.index - b.index)
            .map((x) => x.content)
            .join('')
        )
      );

    return this.settings$.pipe(
      switchMap(() =>
        hasTableOfContent
          ? this.getTableOfContent$(parentDirectory)
          : of([parentDirectory])
      ),
      switchMap((x) => content$(x)),
      tap(() => this.documentLoading$.next(false))
    );
  }

  private getTableOfContent$(parentDirectory: string): Observable<string[]> {
    const basePath = `assets/docs/v${this.documentVersionService.currentVersion}/${parentDirectory}`;
    const filePath = `${basePath}/table-of-content.json`;

    return this.http
      .get(filePath, { responseType: 'text' })
      .pipe(map((x) => JSON.parse(x)));
  }

  private get settings$(): Observable<any> {
    return merge(
      this.languageDataService.language$,
      this.documentVersionService.currentVersion$
    ).pipe(
      // https://github.com/angular/angular/issues/23522#issuecomment-385015819
      // Use of(null) and add delay(0) before set the `documentLoading$` value to avoid NG0100
      delay(0),
      tap(() => this.documentLoading$.next(true))
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
}
