import { HttpClient } from '@angular/common/http';
import { Injectable, TransferState, inject, makeStateKey } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  finalize,
  map,
  of,
  tap,
} from 'rxjs';
import { LanguageService } from '../../language/language-data.service';
import { VersionService } from '../../version/version.service';

@Injectable({
  providedIn: 'root',
})
export class DocsLoaderService {
  private http = inject(HttpClient);
  private transferState = inject(TransferState);
  private versionService = inject(VersionService);
  private languageDataService = inject(LanguageService);
  private docCache: { path: string; data: string }[] = [];

  docLoading$ = new BehaviorSubject<boolean>(false);

  loadDoc$(path: string): Observable<string> {
    if (path.startsWith('docs/')) {
      path = path.replace('docs/', '');
    }

    const cacheData = this.docCache.find(
      (x) => x.path === path && x.data
    )?.data;

    if (cacheData) return of(cacheData);

    const version = this.versionService.docVersion;
    const lang = this.languageDataService.selectedLanguage;
    const pathSegments = path.split('/');
    const filename = `${pathSegments[pathSegments.length - 1]}_${lang}.md`;
    const filePath = path.endsWith('.md') ? path : `${path}/${filename}`;
    const url = `assets/docs/${version}/${filePath}`;
    const key = makeStateKey<string>(url);

    if (this.transferState.hasKey(key)) {
      return of(this.transferState.get(key, ''));
    }

    this.docLoading$.next(true);
    return this.http
      .get(url, {
        responseType: 'text',
        observe: 'response',
      })
      .pipe(
        map((x) => {
          const contentType = x.headers.get('Content-Type') ?? '';
          const docNotFound = contentType.indexOf('text/markdown') < 0;

          if (docNotFound) {
            // To let the wildcard route redirection works correctly,
            // otherwise content after redirection will load into the doc.
            throw 'Content not found';
          }

          return x.body ?? '';
        }),
        tap((x) => {
          if (this.docCache.some((x) => x.path === path)) return;
          this.docCache.push({ path, data: x });
          this.transferState.set(key, x);
        }),
        finalize(() => this.docLoading$.next(false)),
        catchError((err) => {
          throw err;
        })
      );
  }

  clearCache(): void {
    this.docCache = [];
  }

  firstContentPath$(useDefaultLang = false): Observable<string> {
    const lang = this.languageDataService.selectedLanguage;
    const version = this.versionService.docVersion;
    const indexPath = `assets/docs/${version}/index_${
      useDefaultLang ? 'en' : lang
    }.md`;
    const key = makeStateKey<string>(indexPath);

    const source$ = () => {
      if (this.transferState.hasKey(key)) {
        return of(this.transferState.get(key, ''));
      }

      return this.http
        .get(indexPath, { responseType: 'text' })
        .pipe(tap((x) => this.transferState.set(key, x)));
    };

    return source$().pipe(
      map((x) => {
        const firstPathFound = x.match(/(\.+\/){1,}.+\.md/)?.[0];
        const relativePath = firstPathFound?.match(/(\.*\/){1,}/)?.[0] || '';
        const stringToReplace = relativePath + version + '/';
        const result = firstPathFound?.replace(stringToReplace, 'docs/') ?? '';

        return result;
      }),
      catchError(() => this.firstContentPath$(true))
    );
  }

  wrapTable(): void {
    if (typeof window === 'undefined') return;

    window.setTimeout(() => {
      const tables = Array.from(
        document.querySelectorAll('table')
      ) as HTMLTableElement[];

      for (const table of tables) {
        const tableWrapper = document.createElement('div');
        const tableCloned = table.cloneNode(true);
        const wrapped =
          table.parentElement?.classList.contains('table-wrapper') ?? false;

        if (wrapped) continue;

        tableWrapper.classList.add('table-wrapper');
        tableWrapper.appendChild(tableCloned);
        table.parentElement?.insertBefore(tableWrapper, table);
        table.remove();
      }
    });
  }
}
