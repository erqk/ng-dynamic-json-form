import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  Input,
  SimpleChanges,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'header-tab-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-tab-bar.component.html',
  styleUrls: ['./header-tab-bar.component.scss'],
})
export class HeaderTabBarComponent {
  private _el = inject(ElementRef);
  private _router = inject(Router);

  @Input() links: {
    route: string;
    label: string;
  }[] = [];

  private _onDestroy$ = new Subject();

  ngOnChanges(simpleChanges: SimpleChanges): void {
    const { links } = simpleChanges;

    links && this._setIndicatorStyle();
  }

  ngAfterViewInit(): void {
    this._onRouteChange();
    this._setIndicatorStyle();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next(null);
    this._onDestroy$.complete();
  }

  private _onRouteChange(): void {
    this._router.events
      .pipe(
        filter((x) => x instanceof NavigationEnd),
        tap(() => this._setIndicatorStyle()),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }

  private _findElement(selector: string): HTMLElement | null {
    const host = this._el.nativeElement as HTMLElement;
    return host.querySelector(selector);
  }

  private _setIndicatorStyle(): void {
    if (typeof window === 'undefined') return;

    requestAnimationFrame(() => {
      const indicator = this._findElement('.indicator');
      const activeTab = this._findElement('a.active');
      if (!indicator) {
        return;
      }

      if (!activeTab) {
        indicator.style.setProperty('opacity', '0');
        return;
      }

      const containerPaddingLeft = this._findElement('.content')
        ? parseFloat(
            window.getComputedStyle(this._findElement('.content')!).paddingLeft
          )
        : 0;

      const leftStart =
        (this._findElement('a')?.getBoundingClientRect().x || 0) -
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
