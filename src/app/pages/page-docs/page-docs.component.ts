import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, computed, effect, ElementRef, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { FADE_UP_ANIMATION } from 'src/app/animations/fade-up.animation';
import { LayoutService } from 'src/app/core/services/layout.service';
import { getHeaderHeight } from 'src/app/core/utilities/get-header-height';
import { scrollToTitle } from 'src/app/core/utilities/scroll-to-title';
import { DocsRouterLinkDirective } from 'src/app/features/doc/directives/doc-router-link.directive';
import { DocsLoaderService } from 'src/app/features/doc/services/docs-loader.service';
import { LanguageService } from 'src/app/features/language/language-data.service';
import { MarkdownService } from 'src/app/features/markdown/markdown.service';
import { NavigatorIndexComponent } from 'src/app/features/navigator/components/navigator-index/navigator-index.component';
import { NavigatorTitleComponent } from 'src/app/features/navigator/components/navigator-title/navigator-title.component';
import { NavigatorService } from 'src/app/features/navigator/services/navigator.service';
import { UiContentWrapperComponent } from 'src/app/features/ui-content-wrapper/ui-content-wrapper.component';

@Component({
  selector: 'app-page-docs',
  imports: [
    CommonModule,
    UiContentWrapperComponent,
    DocsRouterLinkDirective,
    NavigatorIndexComponent,
    NavigatorTitleComponent,
  ],
  templateUrl: './page-docs.component.html',
  styleUrls: ['./page-docs.component.scss'],
  animations: [FADE_UP_ANIMATION],
})
export class PageDocsComponent {
  private el = inject(ElementRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);
  private viewportScroller = inject(ViewportScroller);
  private docLoaderService = inject(DocsLoaderService);
  private navigatorService = inject(NavigatorService);
  private markdownService = inject(MarkdownService);
  private layoutService = inject(LayoutService);
  private langService = inject(LanguageService);
  private useAnchorScrolling = false;

  windowSize = toSignal(this.layoutService.windowSize$);

  currentRoute = toSignal(
    this.route.url.pipe(map((x) => x.map((item) => item.path).join('/'))),
  );

  currentLanguage = toSignal(this.langService.language$);

  defaultDocPath = rxResource({
    stream: () => this.docLoaderService.firstContentPath$(),
    defaultValue: '',
  });

  docContent = rxResource({
    params: () => {
      const currentRoute = this.currentRoute() ?? '';
      const defaultDocPath = this.defaultDocPath.value();
      const lang = this.currentLanguage();
      const languageFromUrl = this.langService.languageFromUrl;
      const docPath = currentRoute.replace(
        !languageFromUrl ? '' : `_${languageFromUrl}.md`,
        `_${lang}.md`,
      );

      return currentRoute === 'docs' ? defaultDocPath : docPath;
    },
    stream: (x) => this.docLoaderService.loadDoc$(x.params),
  });

  docHtml = computed(() => {
    const data = this.docContent.value();

    if (!data) {
      return undefined;
    }

    const result = this.markdownService.parse(data);
    return result;
  });

  reloadForDefaultDoc = effect(() => {
    const defaultDocPath = this.defaultDocPath.value();
    const currentRoute = this.currentRoute();

    if (currentRoute === 'docs' && defaultDocPath) {
      this.router.navigate([`/${defaultDocPath}`], {
        relativeTo: this.route,
        replaceUrl: true,
      });
    }
  });

  handleDocHtmlGet = effect(() => {
    const docHtml = this.docHtml();

    if (!docHtml) {
      return;
    }

    setTimeout(() => {
      const titles = this.navigatorService.getNavigatorTitles();
      this.navigatorService.titles.set(titles);
    });

    this.wrapTable();
    this.toggleMobileMenu(false);
    this.scrollToContent();
  });

  updateTitle = effect(() => {
    const docContent = this.docContent.value() ?? '';
    const title = docContent
      .match(/^#{1}.*/)?.[0]
      .replace('#', '')
      .trim();

    this.title.setTitle(title || 'NgDynamicJsonForm');
  });

  showMobileMenu = false;

  ngOnDestroy(): void {
    this.docLoaderService.clearCache();
  }

  toggleMobileMenu(value?: boolean): void {
    this.showMobileMenu = value ?? !this.showMobileMenu;
  }

  setSmoothScroll(value: boolean): void {
    const html = document.querySelector('html') as HTMLElement;
    html.style.scrollBehavior = value ? 'smooth' : '';
  }

  private wrapTable(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const host = this.el.nativeElement as HTMLElement;

    window.requestAnimationFrame(() => {
      const tables = Array.from(
        host.querySelectorAll('table'),
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

  private scrollToContent(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const id = this.route.snapshot.fragment?.split('?')[0];

    this.viewportScroller.setOffset([0, getHeaderHeight() + 30]);

    if (!id) {
      window.scrollTo({ top: 0 });
      return;
    }

    if (!this.useAnchorScrolling) {
      this.useAnchorScrolling = true;

      window.requestAnimationFrame(() => {
        const target = document.querySelector(`#${id}`);
        target && scrollToTitle(target, 'auto');
      });
    }
  }
}
