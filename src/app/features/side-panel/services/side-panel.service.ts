import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SidePanelSecondaryItem } from '../interfaces/side-panel-secondary-item.interface';

@Injectable({
  providedIn: 'root',
})
export class SidePanelService {
  h2$ = new BehaviorSubject<Element[]>([]);
  h3$ = new BehaviorSubject<Element[]>([]);

  navigationLinks$ = new Subject<SidePanelSecondaryItem[]>();

  buildNavigationLinks(): void {
    if (typeof window === 'undefined') return;

    const titles = Array.from(document.querySelectorAll('markdown > *')).filter(
      (x) => x.tagName === 'H2' || x.tagName === 'H3'
    );

    const links = titles.reduce((acc, curr) => {
      const prevH2 = acc.filter((x) => x.tagName === 'H2').pop();
      const item = {
        id: curr.id,
        label: (curr as HTMLElement).innerText,
        tagName: curr.tagName,
      };

      switch (curr.tagName) {
        case 'H2':
          acc.push(item);
          break;

        case 'H3':
          if (!prevH2) return acc;
          if (!prevH2.children) prevH2.children = [];

          prevH2.children.push(item);
          break;
      }

      return acc;
    }, [] as SidePanelSecondaryItem[]);

    this.navigationLinks$.next(links);
  }
}
