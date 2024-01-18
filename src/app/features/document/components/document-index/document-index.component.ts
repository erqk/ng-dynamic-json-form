import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import {
  catchError,
  combineLatest,
  debounceTime,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { LanguageDataService } from 'src/app/features/language/services/language-data.service';
import { DocumentRouterLinkDirective } from '../../directives/document-router-link.directive';
import { DocumentLoaderService } from '../../services/document-loader.service';
import { DocumentVersionService } from '../../services/document-version.service';

@Component({
  selector: 'app-document-index',
  standalone: true,
  imports: [CommonModule, MarkdownModule, DocumentRouterLinkDirective],
  templateUrl: './document-index.component.html',
})
export class DocumentIndexComponent {
  private _domSanitizer = inject(DomSanitizer);
  private _docLoaderService = inject(DocumentLoaderService);
  private _docVersionService = inject(DocumentVersionService);
  private _markdownService = inject(MarkdownService);
  private _languageDataService = inject(LanguageDataService);

  @Input() containerClass?: string | string[];

  content$ = combineLatest([
    this._languageDataService.language$,
    this._docVersionService.currentVersion$,
  ]).pipe(
    debounceTime(0),
    switchMap(([lang, version]) => {
      const _lang = this._languageDataService.languageFromUrl ?? lang;
      const _version = version ?? this._docVersionService.latestVersion;

      return this._docLoaderService.loadDoc$(`${_version}/index_${_lang}.md`);
    }),
    tap(() => {
      const version = this._docVersionService.currentVersion;
      this._markdownService.renderer.link =
        this._docLoaderService.markdownLinkRenderFn('', {
          searchValue: version,
          replaceValue: `docs/${version}`,
        });
    }),
    map((x) => this._markdownService.parse(x)),
    map((x) => {
      const domParser = new DOMParser();
      const html = domParser.parseFromString(x, 'text/html');
      const links = html.querySelectorAll('a');
      links.forEach((el) => html.body.appendChild(el));
      Array.from(html.body.querySelectorAll('*'))
        .filter(({ tagName }) => tagName !== 'A')
        .forEach((el) => el.remove());

      return html.body.innerHTML;
    }),
    map((x) => this._domSanitizer.bypassSecurityTrustHtml(x)),
    catchError((err) => {
      this._docLoaderService.updateUrl();
      throw err;
    })
  );
}
