import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  Input,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs';
import { DocsRouterLinkDirective } from 'src/app/features/doc/directives/doc-router-link.directive';
import { DocsLoaderService } from 'src/app/features/doc/services/docs-loader.service';
import { LanguageService } from 'src/app/features/language/language-data.service';
import { MarkdownService } from 'src/app/features/markdown/markdown.service';

@Component({
  selector: 'app-navigator-index',
  standalone: true,
  imports: [CommonModule, DocsRouterLinkDirective],
  templateUrl: './navigator-index.component.html',
})
export class NavigatorIndexComponent {
  private destroyRef = inject(DestroyRef);
  private el = inject(ElementRef);
  private router = inject(Router);
  private docLoaderService = inject(DocsLoaderService);
  private markdownService = inject(MarkdownService);
  private langService = inject(LanguageService);

  @Input() containerClass?: string | string[];

  content$ = this.langService.language$.pipe(
    debounceTime(0),
    switchMap((lang) => {
      const _lang = this.langService.languageFromUrl ?? lang;
      return this.docLoaderService.loadDoc$(`index_${_lang}.md`);
    }),
    map((x) => this.markdownService.parse(x)),
    tap(() => this.highlightActiveRoute())
  );

  ngOnInit(): void {
    this.onRouteChange();
  }

  private onRouteChange(): void {
    this.router.events
      .pipe(
        filter((x) => x instanceof NavigationEnd),
        tap(() => this.highlightActiveRoute()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private highlightActiveRoute(): void {
    if (typeof window === 'undefined') return;

    window.setTimeout(() => {
      const host = this.el.nativeElement as HTMLElement;
      const routeClean = this.router.url.split('?')[0].split('#')[0];
      const links = Array.from(
        host.querySelectorAll('.docs-index-container a')
      ) as HTMLAnchorElement[];

      links.forEach((el) => {
        const activeLink =
          el.href.split('/').pop() === routeClean.split('/').pop();

        activeLink ? el.classList.add('active') : el.classList.remove('active');
      });
    });
  }
}
