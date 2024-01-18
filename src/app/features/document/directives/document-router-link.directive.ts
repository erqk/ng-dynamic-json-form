import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[docRouterLink]',
  standalone: true,
})
export class DocumentRouterLinkDirective {
  private _router = inject(Router);
  private _el = inject(ElementRef);
  private _mutationObserver?: MutationObserver;

  @Input() routeActiveClass = '';

  /**https://stackoverflow.com/questions/36310288/add-element-with-routerlink-dynamically */
  @HostListener('click', ['$event'])
  onClick(e: Event): void {
    const isAnchorEl = e.target instanceof HTMLAnchorElement;
    const isRouterLink = isAnchorEl && e.target.hasAttribute('[routerLink]');

    if (!isRouterLink) return;
    e.preventDefault();

    const route = e.target.getAttribute('href') || '';
    this._router.navigateByUrl(route).then(() => this._highlightActiveRoute());
  }

  ngAfterViewInit(): void {
    this._listenMutation();
  }

  ngOnDestroy(): void {
    this._mutationObserver?.takeRecords();
    this._mutationObserver?.disconnect();
  }

  private _listenMutation(): void {
    this._mutationObserver = new MutationObserver(() => {
      this._highlightActiveRoute();
    });

    this._mutationObserver.observe(this._el.nativeElement, {
      childList: true,
      attributes: true,
    });
  }

  private _highlightActiveRoute(): void {
    if (!this.routeActiveClass) return;

    const host = this._el.nativeElement as HTMLElement;
    const links = Array.from(host.querySelectorAll('a'));

    links.forEach((el) => {
      const activeLink =
        el.href.split('/').pop() === this._routeClean.split('/').pop();

      activeLink
        ? el.classList.add(this.routeActiveClass)
        : el.classList.remove(this.routeActiveClass);
    });
  }

  private get _routeClean(): string {
    return this._router.url.split('?')[0].split('#')[0];
  }
}
