import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgDynamicJsonFormComponent } from 'ng-dynamic-json-form';
import { map } from 'rxjs/operators';
import { LayoutService } from 'src/app/core/services/layout.service';
import { DocFormViewerComponent } from 'src/app/features/doc/components/doc-form-viewer/doc-form-viewer.component';
import { UiLoadingIndicatorComponent } from 'src/app/features/ui-loading-indicator/ui-loading-indicator.component';
import { LanguageDataService } from '../../features/language/language-data.service';
import { UiContentWrapperComponent } from '../../features/ui-content-wrapper/ui-content-wrapper.component';

@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    UiContentWrapperComponent,
    UiLoadingIndicatorComponent,
    DocFormViewerComponent,
    NgDynamicJsonFormComponent,
  ],
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss'],
})
export class PageHomeComponent {
  private _languageDataService = inject(LanguageDataService);
  private _layoutService = inject(LayoutService);

  headerHeight$ = this._layoutService.headerHeight$;
  lang$ = this._languageDataService.language$;
  i18nContent$ = this._languageDataService.i18nContent$;
  features$ = this.i18nContent$.pipe(map((x) => x['FEATURES']));
}
