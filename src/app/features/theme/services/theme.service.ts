import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  fromEvent,
  map,
  of,
  startWith,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themes: { key: 'dark' | 'light'; class: string }[] = [
    {
      key: 'light',
      class: 'bi bi-brightness-high-fill',
    },
    {
      key: 'dark',
      class: 'bi bi-moon-stars-fill',
    },
  ];

  theme$ = new BehaviorSubject<'auto' | 'light' | 'dark'>('auto');

  get savedTheme(): string {
    if (typeof window === 'undefined') return '';
    return window.localStorage.getItem('theme') || '';
  }

  set savedTheme(value: string) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('theme', value);
  }

  get currentTheme() {
    return this.themes.find((x) => x.key === this.savedTheme) || this.themes[0];
  }

  prefersDark$(): Observable<boolean> {
    if (typeof window === 'undefined') {
      return of(false);
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const colorSchemeChange$ = fromEvent(prefersDark, 'change', {
      passive: true,
    }).pipe(map((x) => x as MediaQueryListEvent));

    const event$ = combineLatest([of(prefersDark), colorSchemeChange$]).pipe(
      startWith([prefersDark, prefersDark]),
      map(([a, b]) => a.matches || b.matches)
    );

    return event$;
  }

  setTheme(id: string, path: string): void {
    const getStylesheet = (id: string) =>
      document.head.querySelector(`#${id}`) as HTMLLinkElement;

    const insertStylesheet = (_id: string): HTMLStyleElement => {
      const styleEl = document.createElement('link');

      styleEl.id = _id;
      styleEl.rel = 'stylesheet';
      styleEl.href = path;

      document.head.insertBefore(styleEl, document.head.childNodes[0]);

      return styleEl;
    };

    const existingStyle = getStylesheet(id);

    if (existingStyle) {
      const existingNextStyle = getStylesheet(`${id}-next`);
      const nextStyle = existingNextStyle ?? insertStylesheet(`${id}-next`);

      if (existingNextStyle) {
        existingNextStyle.href = path;
      }

      nextStyle.onload = () => {
        existingStyle.remove();
        nextStyle.id = id;
      };
    } else {
      insertStylesheet(id);
    }
  }
}
