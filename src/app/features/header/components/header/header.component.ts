import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { LanguageDataService } from 'src/app/features/language/services/language-data.service';
import { HeaderDesktopComponent } from '../header-desktop/header-desktop.component';
import { HeaderMobileComponent } from '../header-mobile/header-mobile.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HeaderDesktopComponent, HeaderMobileComponent],
  template: `
    <ng-container *ngIf="links$ | async as links">
      <app-header-desktop [links]="links"></app-header-desktop>
      <app-header-mobile [links]="links"></app-header-mobile>
    </ng-container>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private _languageDataService = inject(LanguageDataService);

  reload = false;

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

  ngOnInit(): void {
    this._languageDataService.language$
      .pipe(
        tap(() => {
          this.reload = true;
          requestAnimationFrame(() => (this.reload = false));
        })
      )
      .subscribe();
  }
}
