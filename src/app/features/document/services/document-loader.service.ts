import { HttpClient } from '@angular/common/http';
import { Injectable, RendererFactory2, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, finalize, map } from 'rxjs';
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

  docLoading$ = new BehaviorSubject<boolean>(false);

  loadDoc$(path: string): Observable<string> {
    const lang = this._languageDataService.language$.value;
    const pathSegments = path.split('/');
    const filename = `${pathSegments[pathSegments.length - 1]}_${lang}.md`;
    const timestamp = new Date().getTime();
    const _path = path.endsWith('.md') ? path : `${path}/${filename}`;

    this.docLoading$.next(true);
    return this._http
      .get(`assets/docs/${_path}?q=${timestamp}`, {
        responseType: 'text',
      })
      .pipe(
        finalize(() => this.docLoading$.next(false)),
        catchError((err) => {
          throw err;
        })
      );
  }

  firstContentPath$(useDefaultLang = false): Observable<string> {
    const lang = this._languageDataService.language$.value;
    const version =
      this._documentVersionService.versionSaved ??
      this._documentVersionService.latestVersion;
    const indexPath = `assets/docs/${version}/index_${
      useDefaultLang ? 'en' : lang
    }.md`;

    return this._http.get(indexPath, { responseType: 'text' }).pipe(
      map((x) => x.match(/(\.+\/){1,}.+\.md/)?.[0]),
      map((x) => x?.replace(/(\.*\/){1,}/, 'docs/') ?? ''),
      catchError(() => this.firstContentPath$(true))
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

      if (href?.startsWith('#')) {
        return `<a title="${title || text}" [routerLink]
          href="${this._router.url}${href}">${text}</a>`;
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
      .replace(languageFromUrl ?? '', language$.value);

    this._router.navigateByUrl(newRoute);
  }
}
