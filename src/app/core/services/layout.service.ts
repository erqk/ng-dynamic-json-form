import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  headerHeight$ = new BehaviorSubject<number>(0);

  updateHeaderHeight(): void {
    if (typeof window === 'undefined') return;

    const header = document.querySelector('app-header');
    if (!header) return;

    this.headerHeight$.next(header.clientHeight);
  }
}
