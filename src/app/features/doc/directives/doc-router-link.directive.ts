import { Directive, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[docRouterLink]',
  standalone: true,
})
export class DocsRouterLinkDirective {
  private router = inject(Router);

  /**https://stackoverflow.com/questions/36310288/add-element-with-routerlink-dynamically */
  @HostListener('click', ['$event'])
  onClick(e: Event): void {
    const isAnchorEl = e.target instanceof HTMLAnchorElement;
    const isRouterLink = isAnchorEl && e.target.hasAttribute('routerLink');

    if (!isRouterLink) return;
    e.preventDefault();

    const route = e.target.getAttribute('href') || '';
    this.router.navigateByUrl(route);
  }
}
