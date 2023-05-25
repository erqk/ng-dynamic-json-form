import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  finalize,
  from,
  map,
  mergeMap,
  reduce,
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

  getTableOfContent$(parentDirectory: string): Observable<string[]> {
    const basePath = `assets/docs/v${this.documentVersionService.currentVersion$.value}/${parentDirectory}`;
    const filePath = `${basePath}/table-of-content.json`;

    return this.http
      .get(filePath, { responseType: 'text' })
      .pipe(map((x) => JSON.parse(x)));
  }

  getDocumentContent$(
    tableOfContent: string[],
    parentDirectory?: string
  ): Observable<string> {
    const content$ = from(tableOfContent).pipe(
      mergeMap((x, i) => {
        const basePath = `assets/docs/v${
          this.documentVersionService.currentVersion$.value
        }${parentDirectory ? '/' + parentDirectory : ''}`;
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

    this.documentLoading$.next(true);
    return combineLatest([
      this.documentVersionService.currentVersion$,
      this.languageDataService.language$,
    ]).pipe(
      switchMap((x) => content$),
      tap(() => this.documentLoading$.next(false))
    );
  }
}
