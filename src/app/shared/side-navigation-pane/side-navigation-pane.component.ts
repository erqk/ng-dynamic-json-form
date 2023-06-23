import { CommonModule, Location } from '@angular/common';
import { Component, HostBinding, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, filter, fromEvent, merge, takeUntil, tap } from 'rxjs';
import { FADE_UP_ANIMATION } from 'src/app/animations/fade-up.animation';
import { ContentWrapperComponent } from '../content-wrapper/content-wrapper.component';
import { SideNaviagionPaneLink } from './side-navigation-pane-link.interface';
import { SideNavigationPaneService } from './side-navigation-pane.service';

@Component({
  selector: 'app-side-navigation-pane',
  standalone: true,
  imports: [CommonModule, ContentWrapperComponent],
  template: `
    <ng-container *ngFor="let item of links">
      <ng-container
        [ngTemplateOutlet]="buttonTemplate"
        [ngTemplateOutletContext]="{ item, level: 1 }"
      ></ng-container>
    </ng-container>

    <ng-template #buttonTemplate let-item="item" let-level="level">
      <button
        [@fade-up]
        [ngClass]="{
          active: currentActiveId[level - 1] === item.id,
          child: level > 1
        }"
        (click)="onLinkClick($event, item)"
      >
        {{ item.label }}
      </button>

      <div
        class="sub-titles"
        [ngClass]="{
          active:
            item.children?.length && currentActiveId[level - 1] === item.id
        }"
      >
        <ng-container
          *ngFor="let child of item.children"
          [ngTemplateOutlet]="buttonTemplate"
          [ngTemplateOutletContext]="{
            item: child,
            level: level + 1
          }"
        ></ng-container>
      </div>
    </ng-template>
  `,
  styleUrls: ['./side-navigation-pane.component.scss'],
  animations: [FADE_UP_ANIMATION],
})
export class SideNavigationPaneComponent {
  links: SideNaviagionPaneLink[] = [];
  currentActiveId = ['', ''];

  private _currentLinkIndex = 0;
  private _linksFlatten: SideNaviagionPaneLink[] = [];
  private _scrolling = false;
  private _scrollingTimeout: number = 0;

  private _reset$ = new Subject();
  private _onDestroy$ = new Subject();

  @HostBinding('class') hostClass = 'beauty-scrollbar';

  constructor(
    private _sideNavigationPaneService: SideNavigationPaneService,
    private _renderer2: Renderer2,
    private _router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this._getLinks();
    this._onRouteChange();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next(null);
    this._onDestroy$.complete();
  }

  onLinkClick(e: Event, item: SideNaviagionPaneLink): void {
    const el = e.target as HTMLElement;
    const newUrl = this._router.url.split('?')[0];
    const level = parseInt(item.tagName.replace('H', '')) - 2;
    const itemIndex = Array.from(el.parentElement?.children || []).indexOf(el);

    el.scrollIntoView({
      block: 'center',
    });

    this._location.replaceState(newUrl, `id=${item.id}`);
    this.currentActiveId[level] = item.id;
    this.currentActiveId[level + 1] = item.children?.[0].id || '';

    if (itemIndex > 0) this._scrollToContent(item.id);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private _onRouteChange(): void {
    this._router.events
      .pipe(
        filter((x) => x instanceof NavigationEnd),
        tap((x) => this._syncActiveIndexWithScroll()),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }

  private _getLinks(): void {
    this._sideNavigationPaneService.navigationLinks$
      .pipe(
        tap((x) => {
          this.links = x;
          this._flattenLinks(x);
          this._syncActiveIndexWithScroll();
          this._scrollToContent(undefined, false);
          this._setActiveIds();
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }

  private _flattenLinks(links: SideNaviagionPaneLink[]): void {
    this._linksFlatten = [];

    const flatten = (input: SideNaviagionPaneLink[]) => {
      for (const item of input) {
        this._linksFlatten.push(item);

        if (item.children) {
          flatten(item.children);
        }
      }
    };

    flatten(links);
  }

  private _syncActiveIndexWithScroll(): void {
    let lastScrollPosition = 0;
    const highlightVisibleTitle = () => {
      if (this._scrolling) return;

      const scrollUp = window.scrollY < lastScrollPosition;

      if (scrollUp) {
        const prevLinkItem = this._linksFlatten[this._currentLinkIndex - 1];
        if (!prevLinkItem) return;

        const level = parseInt(prevLinkItem.tagName.replace('H', '')) - 2;
        this.currentActiveId[level] = prevLinkItem.id || '';
      }

      this._setActiveIds();
      lastScrollPosition = window.scrollY;
    };

    this._reset$.next(null);
    fromEvent(document, 'scroll', { passive: true })
      .pipe(
        tap(() => highlightVisibleTitle()),
        takeUntil(merge(this._onDestroy$, this._reset$))
      )
      .subscribe();
  }

  private _setActiveIds(): void {
    const titles = this._linksFlatten
      .map((x) => document.querySelector(`#${x.id}`)!)
      .filter((x) => !!x);

    const rect = (input: Element) => input.getBoundingClientRect();
    const visibleTitles = titles.filter((x) => {
      return (
        rect(x).top >= 0 && rect(x).bottom < window.innerHeight - rect(x).height
      );
    });

    const activeTitle =
      visibleTitles.length === 1
        ? visibleTitles[0]
        : visibleTitles.find((x) => rect(x).y < window.innerHeight * 0.5);

    if (!activeTitle) {
      return;
    }

    const newSectionAppear = rect(activeTitle).top < window.innerHeight * 0.5;
    if (!newSectionAppear) return;

    const level = parseInt(activeTitle.tagName.replace('H', '')) - 2;
    const parent = this.links.find(
      (x) =>
        x.children && x.children.find((child) => child.id === activeTitle!.id)
    );

    this.currentActiveId[level - 1] = parent?.id || '';
    this.currentActiveId[level] = activeTitle.id || '';
    this._currentLinkIndex = this._linksFlatten.findIndex(
      (x) => x.id === activeTitle!.id
    );
  }

  private _scrollToContent(id?: string, smoothScrolling = true): void {
    const idFromRoute = this._router.parseUrl(this._location.path()).queryParams[
      'id'
    ];
    const targetId = id ?? idFromRoute;
    if (!targetId) {
      this.currentActiveId[0] = document.querySelector('markdown h2')?.id || '';
      return;
    }

    const target = document.querySelector(`#${targetId}`);
    const header = document.querySelector(
      `app-header-${window.innerWidth > 992 ? 'desktop' : 'mobile'} .header`
    );

    if (!target || !header) return;

    this._scrolling = true;
    this._renderer2.setStyle(
      target,
      'scroll-margin',
      `${header.clientHeight + 16}px`
    );

    target.scrollIntoView({
      behavior: smoothScrolling === true ? 'smooth' : 'auto',
      block: 'start',
    });

    clearTimeout(this._scrollingTimeout);
    this._scrollingTimeout = window.setTimeout(
      () => (this._scrolling = false),
      1000
    );
  }
}
