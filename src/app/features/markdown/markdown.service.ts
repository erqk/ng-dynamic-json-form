import { Injectable, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import hljs from 'highlight.js';
import { Marked, RendererObject } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { markedHighlight } from 'marked-highlight';
import { VersionService } from '../version/version.service';

@Injectable({
  providedIn: 'root',
})
export class MarkdownService {
  private router = inject(Router);
  private versionService = inject(VersionService);
  private domSanitizer = inject(DomSanitizer);
  private marked = new Marked(
    gfmHeadingId(),
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code: string, lang, info) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      },
    })
  );

  parse(val: string): SafeHtml {
    const version = this.versionService.docVersion;
    const renderer: RendererObject = {
      link: this.linkRendererFn({
        searchValue: version,
        replaceValue: 'docs',
      }),
    };

    this.marked.use({ renderer: renderer as any });
    const tabsReplaced = val.replace(/\t/g, '  ');
    const result = this.marked.parse(tabsReplaced, {
      async: false,
      gfm: true,
    }) as string;

    return this.domSanitizer.bypassSecurityTrustHtml(result);
  }

  private linkRendererFn(replaceHref?: {
    searchValue: string | RegExp;
    replaceValue: string;
  }) {
    return (link: { href: string; title?: string | null; text: string }) => {
      const { href, title, text } = link;
      const prefix = href?.match(/(\.*\/){1,}/)?.[0] || '';
      const pageAnchor = href.startsWith('#');
      const externalLink = prefix && !href?.startsWith(prefix);
      const routeClean = this.router.url
        .split('?')[0]
        .split('#')[0]
        .substring(1);

      if (pageAnchor) {
        return `<a title="${title || text}" routerLink
        href="${routeClean}${href}">${text}</a>`;
      }

      if (externalLink) {
        return `<a target="_blank" rel="noreferrer noopener"
        title="${title || text}" href="${href}">${text}</a>`;
      }

      const newHref = href
        ?.substring(prefix.length)
        .replace(
          replaceHref?.searchValue || '',
          replaceHref?.replaceValue || ''
        );

      return `<a title="${title || text}" routerLink
      href="${newHref}">${text}</a>`;
    };
  }
}
