import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { debounceTime, map, switchMap } from 'rxjs';
import { DocsRouterLinkDirective } from 'src/app/features/doc/directives/doc-router-link.directive';
import { DocsLoaderService } from 'src/app/features/doc/services/docs-loader.service';
import { LanguageDataService } from 'src/app/features/language/language-data.service';
import { MarkdownService } from 'src/app/features/markdown/markdown.service';

@Component({
  selector: 'app-navigator-index',
  standalone: true,
  imports: [CommonModule, DocsRouterLinkDirective],
  templateUrl: './navigator-index.component.html',
})
export class NavigatorIndexComponent {
  private _docLoaderService = inject(DocsLoaderService);
  private _markdownService = inject(MarkdownService);
  private _languageDataService = inject(LanguageDataService);

  @Input() containerClass?: string | string[];

  content$ = this._languageDataService.language$.pipe(
    debounceTime(0),
    switchMap((lang) => {
      const _lang = this._languageDataService.languageFromUrl ?? lang;
      return this._docLoaderService.loadDoc$(`index_${_lang}.md`);
    }),
    map((x) => this._markdownService.parse(x))
  );
}
