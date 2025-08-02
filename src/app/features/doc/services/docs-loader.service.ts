import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  TransferState,
  inject,
  makeStateKey,
  signal,
} from '@angular/core';
import { Observable, catchError, filter, finalize, map, of, tap } from 'rxjs';
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

  docLoading = signal<boolean>(false);

  loadDoc$(path: string): Observable<string> {
    if (!path) {
      return of('');
    }

    if (path.startsWith('docs/')) {
      path = path.replace('docs/', '');
    }

    const cacheData = this.docCache.find(
      (x) => x.path === path && x.data,
    )?.data;

    if (cacheData) {
      return of(cacheData);
    }

    const version = this.versionService.currentVersion();
    const lang = this.languageDataService.selectedLanguage();
    const pathSegments = path.split('/');
    const filename = `${pathSegments[pathSegments.length - 1]}_${lang}.md`;
    const filePath = path.endsWith('.md') ? path : `${path}/${filename}`;
    const url = `/assets/docs/${version}/${filePath}`;
    const key = makeStateKey<string>(url);

    if (this.transferState.hasKey(key)) {
      return of(this.transferState.get(key, ''));
    }

    this.docLoading.set(true);
    return this.http
      .get(url, {
        responseType: 'text',
        observe: 'response',
      })
      .pipe(
        filter((x) => {
          const contentType = x.headers.get('Content-Type') ?? '';
          return contentType.indexOf('text/markdown') > -1;
        }),
        map((x) => x.body ?? ''),
        tap((x) => {
          if (this.docCache.some((x) => x.path === path)) {
            return;
          }

          this.docCache.push({ path, data: x });
          this.transferState.set(key, x);
        }),
        finalize(() => this.docLoading.set(false)),
        catchError(() => of('')),
      );
  }

  clearCache(): void {
    this.docCache = [];
  }

  firstContentPath$(): Observable<string> {
    const lang = this.languageDataService.selectedLanguage();
    const version = this.versionService.currentVersion();
    const indexPath = `assets/docs/${version}/index_${lang}.md`;
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
      catchError(() => of('')),
    );
  }

  wrapTable(): void {
    if (typeof window === 'undefined') return;

    window.setTimeout(() => {
      const tables = Array.from(
        document.querySelectorAll('table'),
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
