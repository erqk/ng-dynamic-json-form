import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemeService } from '../../services/theme.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative z-0 hidden lg:block">
      <button
        type="button"
        [ngClass]="[
          'rounded-full ',
          showMenu
            ? 'bg-[var(--primary-500)] text-white'
            : 'hover:bg-[var(--primary-500)] hover:text-white'
        ]"
        (click)="toggleMenu()"
      >
        <i [class]="currentTheme.class"></i>
      </button>

      <div
        [ngClass]="[
          'absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 z-0',
          'p-1 rounded-full bg-[var(--primary-500)]',
          'text-white',
          showMenu ? 'grid gap-1' : 'hidden'
        ]"
      >
        <ng-container *ngFor="let item of themeIcons">
          <button
            type="button"
            class="hover:bg-[var(--primary-400)]"
            (click)="switchTheme(item.name)"
          >
            <i [class]="item.class"></i>
          </button>
        </ng-container>
      </div>
    </div>

    <div class="block lg:hidden">
      <select
        [ngModel]="currentTheme"
        (ngModelChange)="switchTheme($event.name)"
      >
        <ng-container *ngFor="let item of themeIcons">
          <option [ngValue]="item">
            {{ item?.code }}
          </option>
        </ng-container>
      </select>
    </div>
  `,
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent {
  @HostListener('document:click', ['$event'])
  onClick(e: MouseEvent): void {
    const hostElement = this._el.nativeElement as HTMLElement;
    const clickedItem = e.target as HTMLElement;

    if (!hostElement.contains(clickedItem)) {
      this.showMenu = false;
    }
  }

  themeIcons = [
    {
      name: 'auto',
      class: 'bi bi-circle-half',
      code: '📱',
    },
    {
      name: 'light',
      class: 'bi bi-brightness-high-fill',
      code: '🔆',
    },
    {
      name: 'dark',
      class: 'bi bi-moon-stars-fill',
      code: '🌃',
    },
  ];

  showMenu = false;
  currentTheme = this.themeIcons[0];

  constructor(
    private _domSanitizer: DomSanitizer,
    private _el: ElementRef,
    private _themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this._initTheme();
  }

  private _initTheme(): void {
    const themeSaved = window.localStorage.getItem('theme') || 'auto';
    this.switchTheme(themeSaved);
  }

  switchTheme(name: string): void {
    const html = document.querySelector('html');

    html?.setAttribute('class', '');
    html?.classList.add(name);

    this.currentTheme =
      this.themeIcons.find((x) => x.name === name) || this.themeIcons[0];
    this.showMenu = false;

    window.localStorage.setItem('theme', name);
    this._themeService.theme$.next(name);
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  onThemeChange(e: any): void {
    console.log(e);
  }
}
