import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgDynamicJsonFormComponent } from 'ng-dynamic-json-form';
import { map } from 'rxjs/operators';
import { LayoutService } from 'src/app/core/services/layout.service';
import { DocFormViewerComponent } from 'src/app/features/doc/components/doc-form-viewer/doc-form-viewer.component';
import { UiLoadingIndicatorComponent } from 'src/app/features/ui-loading-indicator/ui-loading-indicator.component';
import { LanguageService } from '../../features/language/language-data.service';
import { UiContentWrapperComponent } from '../../features/ui-content-wrapper/ui-content-wrapper.component';
import { Title } from '@angular/platform-browser';

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
export class PageHomeComponent implements OnInit {
  private _title = inject(Title);
  private _langService = inject(LanguageService);

  lang$ = this._langService.language$;
  i18nContent$ = this._langService.i18nContent$;
  features$ = this.i18nContent$.pipe(map((x) => x['FEATURES']));

  ngOnInit(): void {
    this._title.setTitle('NgDynamicJsonForm');
  }
}
