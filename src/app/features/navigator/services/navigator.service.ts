import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavigatorTitleItem } from '../interfaces/navigator-title-item.interface';

@Injectable({
  providedIn: 'root',
})
export class NavigatorService {
  h2$ = new BehaviorSubject<Element[]>([]);
  h3$ = new BehaviorSubject<Element[]>([]);

  titles = signal<NavigatorTitleItem[]>([]);

  getNavigatorTitles(): NavigatorTitleItem[] {
    if (typeof window === 'undefined') {
      return [];
    }

    const titles = Array.from(document.querySelectorAll('*')).filter(
      (x) => x.tagName === 'H2' || x.tagName === 'H3',
    );

    if (!titles.length) {
      return [];
    }

    const result = titles.reduce((acc, curr) => {
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
    }, [] as NavigatorTitleItem[]);

    return result;
  }
}
