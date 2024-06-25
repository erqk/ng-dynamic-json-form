import { CommonModule, Location } from '@angular/common';
import { Component, HostBinding, Input, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, filter, fromEvent, merge, takeUntil, tap } from 'rxjs';
import { scrollToTitle } from 'src/app/core/utilities/scroll-to-title';
import { UiContentWrapperComponent } from '../../../ui-content-wrapper/ui-content-wrapper.component';
import { NavigatorTitleItem } from '../../interfaces/navigator-title-item.interface';
import { NavigatorService } from '../../services/navigator.service';

@Component({
  selector: 'app-navigator-title',
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
          <div class="flex flex-col overflow-hidden">
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
  styleUrls: ['./navigator-title.component.scss'],
})
export class NavigatorTitleComponent {
  private _sideNavigationPaneService = inject(NavigatorService);
  private _router = inject(Router);
  private _location = inject(Location);
  private _currentLinkIndex = 0;
  private _linksFlatten: NavigatorTitleItem[] = [];
  private _pauseScrollingHighlight = false;

  private _reset$ = new Subject<void>();
  private _onDestroy$ = new Subject<void>();

  links: NavigatorTitleItem[] = [];
  currentActiveId = ['', ''];

  @Input() htmlString?: string;
  @HostBinding('class') hostClass = 'beauty-scrollbar';

  ngOnChanges(): void {
    if (typeof window !== 'undefined') {
      window.setTimeout(() => {
        this._sideNavigationPaneService.buildNavigationLinks();
      });
    }
  }

  ngOnInit(): void {
    if (typeof window === 'undefined') return;

    this._getLinks();
    this._onRouteChange();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  onLinkClick(e: Event, item: NavigatorTitleItem): void {
    const el = e.target as HTMLElement;
    const newUrl = this._router.url.split('?')[0].split('#')[0];
    const level = parseInt(item.tagName.replace('H', '')) - 2;

    el.scrollIntoView({
      block: 'center',
    });

    this._pauseScrollingHighlight = true;
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

  private _flattenLinks(links: NavigatorTitleItem[]): void {
    this._linksFlatten = [];

    const flatten = (input: NavigatorTitleItem[]) => {
      for (const item of input) {
        this._linksFlatten.push(item);
        if (!item.children) continue;

        flatten(item.children);
      }
    };

    flatten(links);
  }

  private _syncActiveIndexWithScroll(): void {
    if (typeof window === 'undefined') return;

    this._reset$.next();
    fromEvent(document, 'scroll', { passive: true })
      .pipe(
        tap(() => this._highlightTitle()),
        takeUntil(merge(this._onDestroy$, this._reset$))
      )
      .subscribe();
  }

  private _setActiveIds(): void {
    if (typeof window === 'undefined') return;

    const activeTitle = this._getActiveTitle();
    if (!activeTitle) {
      if (this._bodyScrollFraction < 0.05) {
        this.currentActiveId = [];
      }

      return;
    }

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

  private _getActiveTitle(): Element | undefined {
    const rect = (input: Element) => input.getBoundingClientRect();
    const titles = this._linksFlatten
      .map(({ id }) => document.querySelector(`#${id}`)!)
      .filter((x) => !!x);

    if (titles.length === 1) {
      return titles[0];
    }

    const targetIndex = () => {
      if (this._bodyScrollFraction > 0.99) {
        return titles.length - 1;
      }

      if (this._bodyScrollFraction > 0.9) {
        return Math.floor(titles.length * this._bodyScrollFraction);
      }

      return titles.findIndex(
        (x) => rect(x).top >= 0 && rect(x).bottom < this._visibleThreshold
      );
    };

    return titles[targetIndex()];
  }

  private _scrollToContent(id?: string, smoothScrolling = true): void {
    if (typeof window === 'undefined') return;

    const idFromRoute = this._router.parseUrl(this._location.path())
      .queryParams['id'];

    const targetId = id ?? idFromRoute;

    if (!targetId) {
      this.currentActiveId[0] = document.querySelector('markdown h2')?.id || '';
      return;
    }

    const target = document.querySelector(`#${targetId}`);
    if (!target) return;

    scrollToTitle(target, smoothScrolling ? 'smooth' : 'auto');
  }

  private _highlightTitle(): void {
    if (typeof window === 'undefined') return;

    let lastScrollPosition = 0;
    const scrollUp = window.scrollY < lastScrollPosition;
    const prevLinkItem = this._linksFlatten[this._currentLinkIndex - 1];

    if (scrollUp && !!prevLinkItem) {
      const level = parseInt(prevLinkItem.tagName.replace('H', '')) - 2;
      this.currentActiveId[level] = prevLinkItem.id || '';
    }

    this._setActiveIds();
    lastScrollPosition = window.scrollY;
  }

  private get _bodyScrollFraction(): number {
    return (
      Math.floor(Math.abs(document.body.getBoundingClientRect().top)) /
      (document.body.clientHeight - window.innerHeight)
    );
  }

  private get _visibleThreshold(): number {
    return (
      window.innerHeight *
      (this._bodyScrollFraction > 0.5 ? this._bodyScrollFraction : 0.5)
    );
  }
}
