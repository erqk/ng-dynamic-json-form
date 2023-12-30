import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  headerHeight$ = new BehaviorSubject<number>(0);
  windowSize$ = new BehaviorSubject<{ x: number; y: number }>({ x: 0, y: 0 });

  updateHeaderHeight(): void {
    if (typeof window === 'undefined') return;

    const header = document.querySelector('app-header');
    if (!header) return;

    this.headerHeight$.next(header.clientHeight);
  }

  updateWindowSize(): void {
    if (typeof window === 'undefined') return;

    this.windowSize$.next({
      x: window.innerWidth,
      y: window.innerHeight,
    });
  }
}
