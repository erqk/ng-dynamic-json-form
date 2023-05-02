import { Component } from '@angular/core';
import { Subject, map, takeUntil, tap } from 'rxjs';
import { LanguageDataService } from './features/language/services/language-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'NgDynamicJsonForm Demo';

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

  onDestroy$ = new Subject();

  constructor(
    private languageDataService: LanguageDataService
  ) {}

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
