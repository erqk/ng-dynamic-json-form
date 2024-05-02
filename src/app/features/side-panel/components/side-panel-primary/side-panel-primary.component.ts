import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { catchError, switchMap, tap } from 'rxjs';
import { LanguageDataService } from 'src/app/features/language/language-data.service';
import { DocsRouterLinkDirective } from '../../../docs/directives/doc-router-link.directive';
import { DocsLoaderService } from '../../../docs/services/docs-loader.service';
import { VersionService } from '../../../version/version.service';

@Component({
  selector: 'app-side-panel-primary',
  standalone: true,
  imports: [CommonModule, DocsRouterLinkDirective],
  templateUrl: './side-panel-primary.component.html',
})
export class SidePanelPrimaryComponent {
  private _domSanitizer = inject(DomSanitizer);
  private _docLoaderService = inject(DocsLoaderService);
  private _versionService = inject(VersionService);
  private _languageDataService = inject(LanguageDataService);

  @Input() containerClass?: string | string[];

  content$ = this._languageDataService.language$.pipe(
    switchMap((lang) => {
      const _lang = this._languageDataService.languageFromUrl ?? lang;
      return this._docLoaderService.loadDocHtml$(`index_${_lang}.md`);
    }),
    tap(() => {
      const version = this._versionService.currentVersion;
      // this._markdownService.renderer.link =
      //   this._docLoaderService.markdownLinkRenderFn('', {
      //     searchValue: version,
      //     replaceValue: `docs`,
      //   });
    }),
    // map((x) => this._markdownService.parse(x)),
    // map((x) => {
    //   if (typeof window === 'undefined') {
    //     return x;
    //   }

    //   const domParser = new DOMParser();
    //   const html = domParser.parseFromString(x, 'text/html');
    //   const links = html.querySelectorAll('a');
    //   links.forEach((el) => html.body.appendChild(el));
    //   Array.from(html.body.querySelectorAll('*'))
    //     .filter(({ tagName }) => tagName !== 'A')
    //     .forEach((el) => el.remove());

    //   return html.body.innerHTML;
    // }),
    // map((x) => this._domSanitizer.bypassSecurityTrustHtml(x)),
    catchError((err) => {
      this._docLoaderService.updateUrl();
      throw err;
    })
  );
}
