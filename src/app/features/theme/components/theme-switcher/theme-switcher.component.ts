import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, skip, takeUntil, tap } from 'rxjs';
import { THEME_LIST } from '../../constants/themes.constant';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './theme-switcher.component.html',
  styles: [],
})
export class ThemeSwitcherComponent {
  private _themeService = inject(ThemeService);
  private readonly _onDestroy$ = new Subject<void>();

  themes = this._themeService.themes;
  currentTheme = this._themeService.currentTheme;

  ngOnInit(): void {
    this.switchTheme(this.currentTheme.key);
    this._themeService
      .prefersDark$()
      .pipe(
        skip(1),
        tap((x) => this.switchTheme(x ? 'dark' : 'light')),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }

  switchTheme(theme?: 'light' | 'dark'): void {
    if (typeof window === 'undefined') return;

    const html = document.querySelector('html');
    const nextTheme = this.themes.find((x) => {
      if (theme) return x.key === theme;
      return x.key !== this.currentTheme.key;
    });

    if (!nextTheme) return;

    this.currentTheme = nextTheme;

    html?.setAttribute('class', nextTheme.key);
    this._themeService.theme$.next(nextTheme.key);
    this._themeService.savedTheme = nextTheme.key;

    for (const key in THEME_LIST) {
      const filePath = THEME_LIST[key][nextTheme.key];
      this._themeService.setTheme(`${key}-theme`, filePath);
    }
  }
}
