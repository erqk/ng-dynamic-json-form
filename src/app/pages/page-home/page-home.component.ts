import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { UiContentWrapperComponent } from '../../features/ui-content-wrapper/ui-content-wrapper.component';
import { LanguageDataService } from '../../features/language/services/language-data.service';
import { RouterModule } from '@angular/router';
import { UiLoadingIndicatorComponent } from 'src/app/features/ui-loading-indicator/ui-loading-indicator.component';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { LayoutService } from 'src/app/core/services/layout.service';

@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MarkdownModule,
    UiContentWrapperComponent,
    UiLoadingIndicatorComponent,
  ],
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss'],
})
export class PageHomeComponent {
  private _http = inject(HttpClient);
  private _languageDataService = inject(LanguageDataService);
  private _layoutService = inject(LayoutService);
  isLoading = false;
  visibleLayer = 0;

  features$ = this._languageDataService.language$.pipe(
    switchMap((language) =>
      this._http.get(`assets/i18n/${language}.json`, {
        responseType: 'text',
      })
    ),
    map((x) => JSON.parse(x)['FEATURES'])
  );

  i18nContent$ = this._languageDataService.i18nContent$;
  headerHeight$ = this._layoutService.headerHeight$;

  setVisibleLayer(index: number): void {
    this.visibleLayer = index;
  }
}
