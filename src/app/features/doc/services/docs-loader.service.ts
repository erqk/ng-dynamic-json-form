import { HttpClient } from '@angular/common/http';
import { Injectable, RendererFactory2, inject } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  finalize,
  map,
  of,
  tap,
} from 'rxjs';
import { LanguageDataService } from '../../language/language-data.service';
import { MarkdownService } from '../../markdown/markdown.service';
import { VersionService } from '../../version/version.service';

@Injectable({
  providedIn: 'root',
})
export class DocsLoaderService {
  private _renderer2 = inject(RendererFactory2).createRenderer(null, null);
  private _http = inject(HttpClient);
  private _router = inject(Router);
  private _versionService = inject(VersionService);
  private _languageDataService = inject(LanguageDataService);
  private _markdownService = inject(MarkdownService);
  private _docCache: { path: string; data: SafeHtml | string }[] = [];

  docLoading$ = new BehaviorSubject<boolean>(false);

  loadDocHtml$(
    path: string,
    returnType?: 'safeHTML' | 'string'
  ): Observable<SafeHtml | string> {
    if (path.startsWith('docs/')) {
      path = path.replace('docs/', '');
    }

    const cacheData = this._docCache.find(
      (x) => x.path === path && x.data
    )?.data;

    if (cacheData) return of(cacheData);

    const version = this._versionService.currentVersion;
    const lang = this._languageDataService.language$.value;
    const pathSegments = path.split('/');
    const filename = `${pathSegments[pathSegments.length - 1]}_${lang}.md`;
    const filePath = path.endsWith('.md') ? path : `${path}/${filename}`;

    this.docLoading$.next(true);
    return this._http
      .get(`assets/docs/${version}/${filePath}`, {
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

          const str = x.body ?? '';
          return returnType === 'safeHTML'
            ? this._markdownService.parse(str)
            : str;
        }),
        tap((x) => {
          if (this._docCache.some((x) => x.path === path)) return;
          this._docCache.push({ path, data: x });
        }),
        finalize(() => this.docLoading$.next(false)),
        catchError((err) => {
          throw err;
        })
      );
  }

  clearCache(): void {
    this._docCache = [];
  }

  firstContentPath$(useDefaultLang = false): Observable<string> {
    const lang = this._languageDataService.language$.value;
    const version = this._versionService.currentVersion;
    const indexPath = `assets/docs/${version}/index_${
      useDefaultLang ? 'en' : lang
    }.md`;

    return this._http.get(indexPath, { responseType: 'text' }).pipe(
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

    const tables = Array.from(
      document.querySelectorAll('table')
    ) as HTMLTableElement[];

    for (const table of tables) {
      const tableWrapper = document.createElement('div');
      const tableCloned = table.cloneNode(true);

      tableWrapper.classList.add('table-wrapper');
      tableWrapper.appendChild(tableCloned);
      this._renderer2.appendChild(tableWrapper, tableCloned);
      this._renderer2.insertBefore(table.parentElement, tableWrapper, table);
      table.remove();
    }
  }

  updateUrl(): void {
    if (!this._router.url.includes('.md')) return;

    const currentRoute = this._router.url;
    const { language$, languageFromUrl } = this._languageDataService;
    const newRoute = currentRoute.replace(
      `_${languageFromUrl}.md` ?? '',
      `_${language$.value}.md`
    );

    this._router.navigateByUrl(newRoute);
  }

  /**Add tag to indicate the type of file of the current */
  setCodeViewerTag(): void {
    if (typeof window === 'undefined') return;

    const viewers = document.querySelectorAll('pre[class^="language-"]');
    const createTagEl = (parentEl: HTMLElement, text: string) => {
      const el = document.createElement('span');
      el.classList.add('code-tag');
      this._renderer2.setProperty(el, 'innerText', text);
      this._renderer2.appendChild(parentEl, el);
    };

    for (const item of Array.from(viewers)) {
      const el = item as HTMLElement;
      const type = el.classList.toString().replace('language-', '');

      const wrapper = document.createElement('div');
      wrapper.classList.add('code-wrapper');
      this._renderer2.appendChild(wrapper, el.cloneNode(true));
      this._renderer2.insertBefore(el.parentElement, wrapper, el);
      el.remove();

      switch (type) {
        case 'html':
          createTagEl(wrapper, 'HTML');
          break;

        case 'javascript':
          createTagEl(wrapper, 'TS');
          break;

        case 'json':
          createTagEl(wrapper, 'JSON');
          break;
      }
    }
  }
}
