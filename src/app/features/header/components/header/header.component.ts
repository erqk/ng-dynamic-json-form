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

  links$ = this.languageDataService.languageData$.pipe(
    map((x) => [
      {
        route: 'getting-started',
        label: `${x['menu']['getting_started']}`,
      },
      {
        route: 'api',
        label: `${x['menu']['api']}`,
      },
      {
        route: 'styling',
        label: `${x['menu']['styling']}`,
      },
      {
        route: 'playground',
        label: `${x['menu']['playground']}`,
      },
    ])
  );

  constructor(private languageDataService: LanguageDataService) {}

  ngOnInit(): void {
    this.languageDataService.language$
      .pipe(
        tap((x) => {
          this.reload = true;
          requestAnimationFrame(() => (this.reload = false));
        })
      )
      .subscribe();
  }
}
