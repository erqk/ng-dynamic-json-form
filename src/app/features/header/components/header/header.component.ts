import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject } from '@angular/core';
import {
  debounceTime,
  filter,
  map,
  takeUntil,
  tap,
  windowWhen,
} from 'rxjs/operators';
import { LanguageService } from 'src/app/features/language/language-data.service';
import { HeaderDesktopComponent } from '../header-desktop/header-desktop.component';
import { HeaderMobileComponent } from '../header-mobile/header-mobile.component';
import { LayoutService } from 'src/app/core/services/layout.service';
import { Subject, fromEvent } from 'rxjs';

@Component({
    selector: 'app-header',
    imports: [CommonModule, HeaderDesktopComponent, HeaderMobileComponent],
    template: `
    <div
      [ngClass]="[
        'header-container',
        'p-3 px-7 lg:p-4 lg:pb-2',
        'duration-200',
        showBackground ? 'show-background' : '',
        openSettings ? 'full-background' : ''
      ]"
    >
      <ng-container *ngIf="links$ | async as links">
        <app-header-desktop [links]="links"></app-header-desktop>
        <app-header-mobile
          [links]="links"
          [openSettings]="openSettings"
          (settingsOpened)="openSettings = $event"
        ></app-header-mobile>
      </ng-container>
    </div>
  `,
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private el = inject(ElementRef);
  private languageDataService = inject(LanguageService);
  private layoutService = inject(LayoutService);
  private readonly onDestroy$ = new Subject<void>();

  showBackground = false;
  openSettings = false;

  links$ = this.languageDataService.i18nContent$.pipe(
    filter((x) => Object.values(x).length > 0),
    map((x) => [
      {
        route: 'docs',
        label: `${x['MENU']['DOCS']}`,
      },
      {
        route: 'playground',
        label: `${x['MENU']['PLAYGROUND']}`,
      },
    ])
  );

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (typeof window === 'undefined') return;
    this.showBackground = window.scrollY > 0;
  }

  constructor() {
    this.layoutService.windowSize$
      .pipe(
        filter((x) => x.x >= 1024),
        tap(() => (this.openSettings = false))
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.updateHeaderHeight();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private updateHeaderHeight(): void {
    const host = this.el.nativeElement as HTMLElement;
    if (!host) return;

    fromEvent(host, 'transitionend', { passive: true })
      .pipe(
        debounceTime(0),
        tap(() => this.layoutService.updateHeaderHeight()),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }
}
