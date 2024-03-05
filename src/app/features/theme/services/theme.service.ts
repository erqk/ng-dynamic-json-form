import { Injectable, RendererFactory2, inject } from '@angular/core';
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
  private _renderer2 = inject(RendererFactory2).createRenderer(null, null);

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

  get currentTheme() {
    return this.themes.find((x) => x.key === this.savedTheme) || this.themes[0];
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

  setPrimengTheme(): void {
    this._setTheme(
      'primeng-theme',
      `assets/primeng-theme/lara-${this.currentTheme.key}-blue.css`
    );
  }

  setMaterialTheme(): void {
    const filename =
      this.currentTheme.key === 'dark' ? 'pink-bluegrey' : 'deeppurple-amber';

    this._setTheme('material-theme', `assets/material-theme/${filename}.css`);
  }

  private _setTheme(stylesheetId: string, stylesheetPath: string): void {
    const style =
      (document.head.querySelector(`#${stylesheetId}`) as HTMLLinkElement) ||
      this._renderer2.createElement('link');

    this._renderer2.setProperty(style, 'id', stylesheetId);
    this._renderer2.setProperty(style, 'rel', 'stylesheet');
    this._renderer2.setProperty(style, 'href', stylesheetPath);

    if (!document.head.contains(style)) {
      this._renderer2.insertBefore(
        document.head,
        style,
        document.head.childNodes[0]
      );
    }
  }

  private get _baseHref(): string {
    return window.location.origin.indexOf('localhost') > -1
      ? ''
      : 'ng-dynamic-json-form';
  }
}
