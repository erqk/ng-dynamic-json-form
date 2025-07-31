import { CommonModule, Location } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { fromEvent, Subject, takeUntil, tap } from 'rxjs';
import { scrollToTitle } from 'src/app/core/utilities/scroll-to-title';
import { NavigatorTitleItem } from '../../interfaces/navigator-title-item.interface';
import { NavigatorService } from '../../services/navigator.service';

@Component({
  selector: 'app-navigator-title',
  imports: [CommonModule],
  template: `
    @for (item of links(); track $index) {
      <ng-container
        [ngTemplateOutlet]="buttonTemplate"
        [ngTemplateOutletContext]="{ item, level: 1 }"
      ></ng-container>
    }

    <ng-template #buttonTemplate let-item="item" let-level="level">
      <button
        [ngClass]="{
          active: currentActiveId()[level - 1] === item.id,
          child: level > 1,
        }"
        (click)="onLinkClick($event, item)"
      >
        {{ item.label }}
      </button>

      @if (item.children?.length) {
        <div
          class="sub-titles"
          [ngClass]="{
            active:
              item.children?.length && currentActiveId()[level - 1] === item.id,
          }"
        >
          <div class="flex flex-col overflow-hidden">
            @for (child of item.children; track child) {
              <ng-container
                [ngTemplateOutlet]="buttonTemplate"
                [ngTemplateOutletContext]="{
                  item: child,
                  level: level + 1,
                }"
              ></ng-container>
            }
          </div>
        </div>
      }
    </ng-template>
  `,
  styleUrls: ['./navigator-title.component.scss'],
  host: {
    class: 'beauty-scrollbar',
  },
})
export class NavigatorTitleComponent {
  private destroyRef = inject(DestroyRef);
  private navigatorService = inject(NavigatorService);
  private router = inject(Router);
  private location = inject(Location);
  private currentLinkIndex = 0;

  private reset$ = new Subject<void>();

  links = this.navigatorService.titles;

  linksFlatten = computed(() => {
    const links = this.links() ?? [];
    const flatten = (input: NavigatorTitleItem[]): NavigatorTitleItem[] => {
      return input.flatMap((x) =>
        !x.children ? x : flatten(x.children ?? []),
      );
    };

    const result = flatten(links);
    return result;
  });

  currentActiveId = signal(['', '']);

  handleLinksGet = effect(() => {
    const links = this.links();

    if (!links) {
      return;
    }

    this.scrollToContent(undefined, false);
    this.setActiveIds();
    this.syncActiveIndexWithScroll();
  });

  onLinkClick(e: Event, item: NavigatorTitleItem): void {
    const el = e.target as HTMLElement;
    const newUrl = this.router.url.split('?')[0].split('#')[0];
    const level = parseInt(item.tagName.replace('H', '')) - 2;

    el.scrollIntoView({
      block: 'center',
    });

    this.currentActiveId.update((x) => {
      x[level] = item.id;
      x[level + 1] = item.children?.[0].id || '';

      return [...x];
    });

    this.router.navigateByUrl(`${newUrl}#${item.id}`, {
      onSameUrlNavigation: 'reload',
    });
  }

  private syncActiveIndexWithScroll(): void {
    if (typeof window === 'undefined') return;

    this.reset$.next();
    fromEvent(document, 'scroll', { passive: true })
      .pipe(
        tap(() => this.highlightTitle()),
        takeUntil(this.reset$),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private setActiveIds(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const activeTitle = this.getActiveTitle();
    if (!activeTitle) {
      if (this._bodyScrollFraction < 0.05) {
        this.currentActiveId.set([]);
      }

      return;
    }

    const links = this.links() ?? [];
    const linksFlatten = this.linksFlatten();
    const level = parseInt(activeTitle.tagName.replace('H', '')) - 2;
    const parent = links.find(({ children }) =>
      (children || []).find(({ id }) => id === activeTitle!.id),
    );

    this.currentActiveId.update((x) => {
      x[level - 1] = parent?.id || '';
      x[level] = activeTitle.id || '';

      return [...x];
    });

    this.currentLinkIndex = linksFlatten.findIndex(
      ({ id }) => id === activeTitle!.id,
    );
  }

  private getActiveTitle(): Element | undefined {
    const linksFlatten = this.linksFlatten();
    const rect = (input: Element) => input.getBoundingClientRect();
    const titles = linksFlatten
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
        (x) => rect(x).top >= 0 && rect(x).bottom < this._visibleThreshold,
      );
    };

    return titles[targetIndex()];
  }

  private scrollToContent(id?: string, smoothScrolling = true): void {
    if (typeof window === 'undefined') {
      return;
    }

    const idFromRoute = this.router.parseUrl(this.location.path()).queryParams[
      'id'
    ];

    const targetId = id ?? idFromRoute;

    if (!targetId) {
      this.currentActiveId.update((x) => {
        x[0] = document.querySelector('markdown h2')?.id || '';
        return [...x];
      });

      return;
    }

    const target = document.querySelector(`#${targetId}`);
    if (!target) return;

    scrollToTitle(target, smoothScrolling ? 'smooth' : 'auto');
  }

  private highlightTitle(): void {
    if (typeof window === 'undefined') {
      return;
    }

    let lastScrollPosition = 0;
    const linksFlatten = this.linksFlatten();
    const scrollUp = window.scrollY < lastScrollPosition;
    const prevLinkItem = linksFlatten[this.currentLinkIndex - 1];

    if (scrollUp && !!prevLinkItem) {
      const level = parseInt(prevLinkItem.tagName.replace('H', '')) - 2;
      this.currentActiveId.update((x) => {
        x[level] = prevLinkItem.id || '';
        return [...x];
      });
    }

    this.setActiveIds();
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
