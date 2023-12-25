import { CommonModule, Location } from '@angular/common';
import { Component, ElementRef, HostBinding, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, filter, fromEvent, merge, takeUntil, tap } from 'rxjs';
import { FADE_UP_ANIMATION } from 'src/app/animations/fade-up.animation';
import { scrollToTitle } from 'src/app/core/utilities/scroll-to-title';
import { UiContentWrapperComponent } from '../ui-content-wrapper/ui-content-wrapper.component';
import { SideNaviagionPaneLink } from './side-navigation-pane-link.interface';
import { SideNavigationPaneService } from './side-navigation-pane.service';

@Component({
  selector: 'app-side-navigation-pane',
  standalone: true,
  imports: [CommonModule, UiContentWrapperComponent],
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

      <ng-container *ngIf="item.children?.length">
        <div
          class="sub-titles"
          [ngClass]="{
            active:
              item.children?.length && currentActiveId[level - 1] === item.id
          }"
        >
          <div class="overflow-hidden">
            <ng-container
              *ngFor="let child of item.children"
              [ngTemplateOutlet]="buttonTemplate"
              [ngTemplateOutletContext]="{
                item: child,
                level: level + 1
              }"
            ></ng-container>
          </div>
        </div>
      </ng-container>
    </ng-template>
  `,
  styleUrls: ['./side-navigation-pane.component.scss'],
  animations: [FADE_UP_ANIMATION],
})
export class SideNavigationPaneComponent {
  private _sideNavigationPaneService = inject(SideNavigationPaneService);
  private _el = inject(ElementRef);
  private _router = inject(Router);
  private _location = inject(Location);
  private _currentLinkIndex = 0;
  private _linksFlatten: SideNaviagionPaneLink[] = [];
  private _scrolling = false;
  private _scrollingTimeout: number = 0;

  private readonly _reset$ = new Subject<void>();
  private readonly _onDestroy$ = new Subject<void>();

  links: SideNaviagionPaneLink[] = [];
  currentActiveId = ['', ''];

  @HostBinding('class') hostClass = 'beauty-scrollbar';

  ngOnInit(): void {
    this._getLinks();
    this._onRouteChange();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  onLinkClick(e: Event, item: SideNaviagionPaneLink): void {
    const el = e.target as HTMLElement;
    const newUrl = this._router.url.split('?')[0].split('#')[0];
    const level = parseInt(item.tagName.replace('H', '')) - 2;

    el.scrollIntoView({
      block: 'center',
    });

    this.currentActiveId[level] = item.id;
    this.currentActiveId[level + 1] = item.children?.[0].id || '';
    this._router.navigateByUrl(`${newUrl}#${item.id}`, {
      onSameUrlNavigation: 'reload',
    });
  }

  private _onRouteChange(): void {
    this._router.events
      .pipe(
        filter((x) => x instanceof NavigationEnd),
        tap(() => this._syncActiveIndexWithScroll()),
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
        if (!item.children) continue;

        flatten(item.children);
      }
    };

    flatten(links);
  }

  private _syncActiveIndexWithScroll(): void {
    let lastScrollPosition = 0;
    const highlightVisibleTitle = () => {
      if (this._scrolling) return;

      const scrollUp = window.scrollY < lastScrollPosition;
      const prevLinkItem = this._linksFlatten[this._currentLinkIndex - 1];

      if (scrollUp && !!prevLinkItem) {
        const level = parseInt(prevLinkItem.tagName.replace('H', '')) - 2;
        this.currentActiveId[level] = prevLinkItem.id || '';
      }

      this._setActiveIds();
      lastScrollPosition = window.scrollY;
    };

    this._reset$.next();
    fromEvent(document, 'scroll', { passive: true })
      .pipe(
        tap(() => highlightVisibleTitle()),
        takeUntil(merge(this._onDestroy$, this._reset$))
      )
      .subscribe();
  }

  private _setActiveIds(): void {
    const titles = this._linksFlatten
      .map(({ id }) => document.querySelector(`#${id}`)!)
      .filter((x) => !!x);

    const visibleThreshold = window.innerHeight * 0.5;
    const rect = (input: Element) => input.getBoundingClientRect();
    const visibleTitles = titles.filter((x) => {
      const topEdgeVisible = rect(x).top >= 0;
      const bottomEdgeVisible = rect(x).bottom < window.innerHeight;
      return topEdgeVisible && bottomEdgeVisible;
    });

    const activeTitle =
      visibleTitles.length === 1
        ? visibleTitles[0]
        : visibleTitles.find((x) => rect(x).top < visibleThreshold);

    if (!activeTitle) {
      return;
    }

    const newSectionAppear = rect(activeTitle).top < visibleThreshold;
    if (!newSectionAppear) return;

    const level = parseInt(activeTitle.tagName.replace('H', '')) - 2;
    const parent = this.links.find(({ children }) =>
      (children || []).find(({ id }) => id === activeTitle!.id)
    );

    this.currentActiveId[level - 1] = parent?.id || '';
    this.currentActiveId[level] = activeTitle.id || '';
    this._currentLinkIndex = this._linksFlatten.findIndex(
      ({ id }) => id === activeTitle!.id
    );
  }

  private _scrollToContent(id?: string, smoothScrolling = true): void {
    const idFromRoute = this._router.parseUrl(this._location.path())
      .queryParams['id'];

    const targetId = id ?? idFromRoute;

    if (!targetId) {
      this.currentActiveId[0] = document.querySelector('markdown h2')?.id || '';
      return;
    }

    const target = document.querySelector(`#${targetId}`);
    if (!target) return;

    this._scrolling = true;
    scrollToTitle(target, smoothScrolling ? 'smooth' : 'auto');

    clearTimeout(this._scrollingTimeout);
    this._scrollingTimeout = window.setTimeout(
      () => (this._scrolling = false),
      1000
    );
  }
}
