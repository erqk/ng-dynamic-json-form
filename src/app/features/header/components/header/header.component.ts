import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { debounceTime, map, takeUntil, tap, windowWhen } from 'rxjs/operators';
import { LanguageDataService } from 'src/app/features/language/services/language-data.service';
import { HeaderDesktopComponent } from '../header-desktop/header-desktop.component';
import { HeaderMobileComponent } from '../header-mobile/header-mobile.component';
import { LayoutService } from 'src/app/core/services/layout.service';
import { Subject, fromEvent } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HeaderDesktopComponent, HeaderMobileComponent],
  template: `
    <div
      [ngClass]="[
        'p-2 px-4 lg:p-4 lg:pb-2',
        'border-b',
        'duration-200',
        showBackground
          ? 'border-[var(--border-color-25)] bg-[rgba(var(--body-bg-color-rgb),0.6)] backdrop-blur'
          : 'border-transparent'
      ]"
    >
      <ng-container *ngIf="links$ | async as links">
        <app-header-desktop [links]="links"></app-header-desktop>
        <app-header-mobile [links]="links"></app-header-mobile>
      </ng-container>
    </div>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private _el = inject(ElementRef);
  private _languageDataService = inject(LanguageDataService);
  private _layoutService = inject(LayoutService);
  private readonly _onDestroy$ = new Subject<void>();

  showBackground = false;

  links$ = this._languageDataService.i18nContent$.pipe(
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
    this.showBackground =
      window.scrollY > this._layoutService.headerHeight$.value * 0.5;
  }

  ngAfterViewInit(): void {
    this._updateHeaderHeight();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  private _updateHeaderHeight(): void {
    const host = this._el.nativeElement as HTMLElement;
    if (!host) return;

    fromEvent(host, 'transitionend', { passive: true })
      .pipe(
        debounceTime(0),
        tap(() => this._layoutService.updateHeaderHeight()),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }
}
