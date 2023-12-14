import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderDesktopComponent } from '../header-desktop/header-desktop.component';
import { HeaderMobileComponent } from '../header-mobile/header-mobile.component';
import { map, tap } from 'rxjs/operators';
import { LanguageDataService } from 'src/app/features/language/services/language-data.service';

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
  reload = false;

  links$ = this._languageDataService.i18nContent$.pipe(
    map((x) => [
      {
        route: 'getting-started',
        label: `${x['MENU']['GETTING_STARTED']}`,
      },
      {
        route: 'api',
        label: `${x['MENU']['API']}`,
      },
      {
        route: 'styling',
        label: `${x['MENU']['STYLING']}`,
      },
      {
        route: 'playground',
        label: `${x['MENU']['PLAYGROUND']}`,
      },
      {
        route: 'older-docs',
        label: `${x['MENU']['OLD_DOCS']}`
      }
    ])
  );

  constructor(private _languageDataService: LanguageDataService) {}

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
