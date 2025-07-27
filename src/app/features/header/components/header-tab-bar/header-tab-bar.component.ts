import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  Component,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'header-tab-bar',
  imports: [CommonModule, RouterModule],
  templateUrl: './header-tab-bar.component.html',
  styleUrls: ['./header-tab-bar.component.scss'],
})
export class HeaderTabBarComponent {
  private el = inject(ElementRef);
  private router = inject(Router);

  private onDestroy$ = new Subject();

  links = input<
    {
      route: string;
      label: string;
    }[]
  >([]);

  updateIndicator = effect(() => {
    const links = this.links();

    if (!links.length) {
      return;
    }

    this.setIndicatorStyle();
  });

  constructor() {
    afterNextRender(() => {
      this.onRouteChange();
      this.setIndicatorStyle();
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  private onRouteChange(): void {
    this.router.events
      .pipe(
        filter((x) => x instanceof NavigationEnd),
        tap(() => this.setIndicatorStyle()),
        takeUntil(this.onDestroy$),
      )
      .subscribe();
  }

  private findElement(selector: string): HTMLElement | null {
    const host = this.el.nativeElement as HTMLElement;
    return host.querySelector(selector);
  }

  private setIndicatorStyle(): void {
    if (typeof window === 'undefined') return;

    requestAnimationFrame(() => {
      const indicator = this.findElement('.indicator');
      const activeTab = this.findElement('a.active');
      if (!indicator) {
        return;
      }

      if (!activeTab) {
        indicator.style.setProperty('opacity', '0');
        return;
      }

      const containerPaddingLeft = this.findElement('.content')
        ? parseFloat(
            window.getComputedStyle(this.findElement('.content')!).paddingLeft,
          )
        : 0;

      const leftStart =
        (this.findElement('a')?.getBoundingClientRect().x || 0) -
        containerPaddingLeft;
      const left = activeTab.getBoundingClientRect().x - leftStart;
      const indicatorWidth = activeTab.clientWidth * 0.8;
      const leftOffset = (activeTab.clientWidth - indicatorWidth) / 2;

      activeTab.scrollIntoView({
        inline: 'center',
        block: 'nearest',
      });

      indicator.style.setProperty('opacity', '1');
      indicator.style.setProperty('left', `${left + leftOffset}px`);
      indicator.style.setProperty('width', `${indicatorWidth}px`);
    });
  }
}
