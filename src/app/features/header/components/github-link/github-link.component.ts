import { Component } from '@angular/core';

@Component({
  selector: 'github-link',
  imports: [],
  template: `
    <a
      class="inline-flex items-center justify-center h-12 w-12 rounded-full border border-[var(--border-color-25)] lg:border-0"
      target="_blank"
      href="https://github.com/erqk/ng-dynamic-json-form"
    >
      <i class="bi bi-github ml-1"></i>
    </a>
  `,
  styles: ``,
})
export class GithubLinkComponent {}
