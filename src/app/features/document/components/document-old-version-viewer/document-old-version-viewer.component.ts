import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { DocumentLoaderService } from '../../services/document-loader.service';
import { debounceTime, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-old-version-viewer',
  templateUrl: './document-old-version-viewer.component.html',
  styleUrls: ['./document-old-version-viewer.component.scss'],
  standalone: true,
  imports: [CommonModule, MarkdownModule],
})
export class DocumentOldVersionViewerComponent {
  private _router = inject(Router);
  private _docLoaderService = inject(DocumentLoaderService);
  private _markdownService = inject(MarkdownService);

  content$ = this._docLoaderService.oldDocsContent$;

  /**https://stackoverflow.com/questions/36310288/add-element-with-routerlink-dynamically */
  @HostListener('click', ['$event'])
  onClick(e: Event): void {
    const isAnchorEl = e.target instanceof HTMLAnchorElement;
    const isRouterLink = isAnchorEl && e.target.hasAttribute('[routerLink]');

    if (!isRouterLink) return;
    e.preventDefault();

    const route = e.target.getAttribute('href') || '';
    this._router.navigateByUrl(route);
  }

  ngOnInit(): void {
    this._markdownService.renderer.link = (
      href: string | null,
      title: string | null,
      text: string
    ) => {
      const prefix = href?.match(/^\.*\//)?.[0] || '';
      const useRouter = href?.startsWith(prefix) ?? false;

      if (!useRouter) {
        return `<a title=${title} href=${href}>${text}</a>`;
      }

      return `<a title=${title} [routerLink]
        href=/older-docs/${href?.substring(prefix.length)}>
          ${text}
        </a>`;
    };
  }
}
