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
  private _router = inject(Router);
  private _versionService = inject(VersionService);
  private _domSanitizer = inject(DomSanitizer);
  private _marked = new Marked(
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
    const version = this._versionService.docVersion;
    const renderer: RendererObject = {
      link: this._linkRendererFn({
        searchValue: version,
        replaceValue: 'docs',
      }),
    };

    this._marked.use({ renderer: renderer as any });
    const tabsReplaced = val.replace(/\t/g, '  ');
    const result = this._marked.parse(tabsReplaced, {
      async: false,
      gfm: true,
    }) as string;

    return this._domSanitizer.bypassSecurityTrustHtml(result);
  }

  private _linkRendererFn(replaceHref?: {
    searchValue: string | RegExp;
    replaceValue: string;
  }) {
    return (href: string, title: string | null | undefined, text: string) => {
      const prefix = href?.match(/(\.*\/){1,}/)?.[0] || '';
      const pageAnchor = href.startsWith('#');
      const externalLink = prefix && !href?.startsWith(prefix);
      const routeClean = this._router.url
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
