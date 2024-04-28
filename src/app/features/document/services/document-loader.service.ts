import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  PLATFORM_ID,
  RendererFactory2,
  inject,
} from '@angular/core';
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
import { HOST_ORIGIN } from 'src/app/core/injection-tokens/x-forwared-host.token';
import { LanguageDataService } from '../../language/services/language-data.service';
import { DocumentVersionService } from './document-version.service';

@Injectable({
  providedIn: 'root',
})
export class DocumentLoaderService {
  private _renderer2 = inject(RendererFactory2).createRenderer(null, null);
  private _http = inject(HttpClient);
  private _router = inject(Router);
  private _platformId = inject(PLATFORM_ID);
  private _hostOrigin = isPlatformServer(this._platformId)
    ? inject(HOST_ORIGIN, { optional: true })
    : window.location.origin;
  private _documentVersionService = inject(DocumentVersionService);
  private _languageDataService = inject(LanguageDataService);
  private _docCache: { path: string; data: string }[] = [];

  docLoading$ = new BehaviorSubject<boolean>(false);

  loadDoc$(path: string): Observable<string> {
    if (path.startsWith('docs/')) {
      path = path.replace('docs/', '');
    }

    const cacheData = this._docCache.find(
      (x) => x.path === path && x.data
    )?.data;

    if (cacheData) return of(cacheData);

    const lang = this._languageDataService.language$.value;
    const pathSegments = path.split('/');
    const filename = `${pathSegments[pathSegments.length - 1]}_${lang}.md`;
    const _path = path.endsWith('.md') ? path : `${path}/${filename}`;

    this.docLoading$.next(true);
    return this._http
      .get(`${this._hostOrigin}/assets/docs/${_path}`, {
        responseType: 'text',
      })
      .pipe(
        tap((x) => {
          if (isPlatformBrowser(this._platformId)) {
            if (this._docCache.some((x) => x.path === path)) return;
            this._docCache.push({ path, data: x });
          }
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
    const version = this._documentVersionService.latestVersion;
    const indexPath = `${this._hostOrigin}/assets/docs/${version}/index_${
      useDefaultLang ? 'en' : lang
    }.md`;

    return this._http.get(indexPath, { responseType: 'text' }).pipe(
      map((x) => {
        const firstPathFound = x.match(/(\.+\/){1,}.+\.md/)?.[0];
        const result = firstPathFound?.replace(/(\.*\/){1,}/, 'docs/') ?? '';
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

  markdownLinkRenderFn(
    routePrefix: string,
    replaceHref?: { searchValue: string | RegExp; replaceValue: string }
  ) {
    return (href: string | null, title: string | null, text: string) => {
      const prefix = href?.match(/(\.*\/){1,}/)?.[0] || '';
      const useRouter = !!prefix && href?.startsWith(prefix);
      const routeClean = this._router.url.split('?')[0].split('#')[0];

      if (href?.startsWith('#')) {
        return `<a title="${title || text}" [routerLink]
          href="${routeClean}${href}">${text}</a>`;
      }

      if (!useRouter) {
        return `<a target="_blank" rel="noreferrer noopener"
          title="${title || text}" href="${href}">${text}</a>`;
      }

      const _href = href
        ?.substring(prefix.length)
        .replace(
          replaceHref?.searchValue || '',
          replaceHref?.replaceValue || ''
        );

      const newHref = routePrefix ? `/${routePrefix}/${_href}` : _href;

      return `<a title="${title || text}" [routerLink]
        href="${newHref}">${text}</a>`;
    };
  }

  updateUrl(): void {
    if (!this._router.url.includes('.md')) return;

    const currentRoute = this._router.url;
    const { versionFromUrl, currentVersion } = this._documentVersionService;
    const { language$, languageFromUrl } = this._languageDataService;
    const newRoute = currentRoute
      .replace(versionFromUrl ?? currentVersion, currentVersion)
      .replace(`_${languageFromUrl}.md` ?? '', `_${language$.value}.md`);

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
