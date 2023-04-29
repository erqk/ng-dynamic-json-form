import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subject, filter, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-tab-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
})
export class TabBarComponent {
  @Input() links: {
    route: string;
    label: string;
  }[] = [];

  private onDestroy$ = new Subject();

  constructor(
    private router: Router,
    private el: ElementRef,
    private renderer2: Renderer2
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.onRouteChange();
    this.setIndicatorStyle();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  private onRouteChange(): void {
    this.router.events
      .pipe(
        filter((x) => x instanceof NavigationEnd),
        tap((x) => this.setIndicatorStyle()),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }

  private findElement(selector: string): HTMLElement | null {
    const host = this.el.nativeElement as HTMLElement;
    return host.querySelector(selector);
  }

  private setIndicatorStyle(): void {
    requestAnimationFrame(() => {
      const indicator = this.findElement('.indicator');
      const activeTab = this.findElement('a.active');
      if (!indicator || !activeTab) {
        this.renderer2.setStyle(indicator, 'opacity', '0');
        return;
      }

      const screenLeft =
        this.findElement('a')?.getBoundingClientRect().left || 0;
      const left = activeTab.getBoundingClientRect().x - screenLeft;

      const indicatorWidth = activeTab.clientWidth * 0.8;
      const leftOffset = (activeTab.clientWidth - indicatorWidth) / 2;

      this.renderer2.setStyle(indicator, 'opacity', '1');
      this.renderer2.setStyle(indicator, 'left', `${left + leftOffset}px`);
      this.renderer2.setStyle(indicator, 'width', `${indicatorWidth}px`);
    });
  }
}
