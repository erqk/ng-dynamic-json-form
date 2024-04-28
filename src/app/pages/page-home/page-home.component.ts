import { CommonModule, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgDynamicJsonFormComponent } from 'ng-dynamic-json-form';
import { MarkdownModule } from 'ngx-markdown';
import { map, switchMap } from 'rxjs/operators';
import { HOST_ORIGIN } from 'src/app/core/injection-tokens/x-forwared-host.token';
import { LayoutService } from 'src/app/core/services/layout.service';
import { ExampleContainerComponent } from 'src/app/features/example-container/example-container.component';
import { UiLoadingIndicatorComponent } from 'src/app/features/ui-loading-indicator/ui-loading-indicator.component';
import { LanguageDataService } from '../../features/language/services/language-data.service';
import { UiContentWrapperComponent } from '../../features/ui-content-wrapper/ui-content-wrapper.component';

@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MarkdownModule,
    UiContentWrapperComponent,
    UiLoadingIndicatorComponent,
    ExampleContainerComponent,
    NgDynamicJsonFormComponent,
  ],
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss'],
})
export class PageHomeComponent {
  private _http = inject(HttpClient);
  private _languageDataService = inject(LanguageDataService);
  private _layoutService = inject(LayoutService);

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
}
