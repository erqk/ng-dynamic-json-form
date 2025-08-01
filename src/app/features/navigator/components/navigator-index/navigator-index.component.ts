import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ActiveRouteHighlightDirective } from 'src/app/features/doc/directives/active-route-higlight.directive';
import { DocsRouterLinkDirective } from 'src/app/features/doc/directives/doc-router-link.directive';
import { DocsLoaderService } from 'src/app/features/doc/services/docs-loader.service';
import { LanguageService } from 'src/app/features/language/language-data.service';
import { MarkdownService } from 'src/app/features/markdown/markdown.service';

@Component({
  selector: 'app-navigator-index',
  imports: [
    CommonModule,
    DocsRouterLinkDirective,
    ActiveRouteHighlightDirective,
  ],
  templateUrl: './navigator-index.component.html',
})
export class NavigatorIndexComponent {
  private docLoaderService = inject(DocsLoaderService);
  private markdownService = inject(MarkdownService);
  private langService = inject(LanguageService);

  containerClass = input<string | string[]>('');

  content = rxResource({
    params: () => this.langService.selectedLanguage(),
    stream: ({ params }) =>
      this.docLoaderService
        .loadDoc$(`index_${params}.md`)
        .pipe(map((x) => this.markdownService.parse(x))),
  });
}
