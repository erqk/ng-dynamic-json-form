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
  themes = [
    {
      key: 'light',
      class: 'bi bi-brightness-high-fill',
    },
    {
      key: 'dark',
      class: 'bi bi-moon-stars-fill',
    },
  ];

  theme$ = new BehaviorSubject<string>('auto');

  get savedTheme(): string {
    return window.localStorage.getItem('theme') || '';
  }

  set savedTheme(value: string) {
    window.localStorage.setItem('theme', value);
  }

  prefersDark$(): Observable<boolean> {
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
}
