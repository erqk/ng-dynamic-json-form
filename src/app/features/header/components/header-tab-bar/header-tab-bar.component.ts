import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subject, filter, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'header-tab-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-tab-bar.component.html',
  styleUrls: ['./header-tab-bar.component.scss'],
})
export class HeaderTabBarComponent {
  @Input() links: {
    route: string;
    label: string;
  }[] = [];

  private _onDestroy$ = new Subject();

  constructor(
    private _router: Router,
    private _el: ElementRef,
    private _renderer2: Renderer2
  ) {}

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
        this._renderer2.setStyle(indicator, 'opacity', '0');
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

      this._renderer2.setStyle(indicator, 'opacity', '1');
      this._renderer2.setStyle(indicator, 'left', `${left + leftOffset}px`);
      this._renderer2.setStyle(indicator, 'width', `${indicatorWidth}px`);
    });
  }
}
