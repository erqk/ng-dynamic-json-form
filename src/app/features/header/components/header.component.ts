import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { map, takeUntil, tap } from 'rxjs/operators';
import { ContentWrapperComponent } from 'src/app/shared/content-wrapper/content-wrapper.component';
import { TabBarComponent } from 'src/app/shared/tab-bar/tab-bar.component';
import { LanguageSelectorComponent } from '../../language/components/language-selector/language-selector.component';
import { LanguageDataService } from '../../language/services/language-data.service';
import { ThemeSwitcherComponent } from '../../theme/components/theme-switcher/theme-switcher.component';
import { DocumentVersionSelectorComponent } from '../../document/components/document-version-selector/document-version-selector.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ContentWrapperComponent,
    TabBarComponent,
    ThemeSwitcherComponent,
    LanguageSelectorComponent,
    DocumentVersionSelectorComponent,
  ],
  templateUrl: './header.component.html',
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

  private onDestroy$ = new Subject();

  constructor(private languageDataService: LanguageDataService) {}

  ngOnInit(): void {
    this.languageDataService.language$
      .pipe(
        tap((x) => {
          this.reload = true;
          requestAnimationFrame(() => (this.reload = false));
        }),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
