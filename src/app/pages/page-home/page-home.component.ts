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
    styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {
  private title = inject(Title);
  private langService = inject(LanguageService);

  lang$ = this.langService.language$;
  i18nContent$ = this.langService.i18nContent$;
  features$ = this.i18nContent$.pipe(map((x) => x['FEATURES']));

  ngOnInit(): void {
    this.title.setTitle('NgDynamicJsonForm');
  }
}
