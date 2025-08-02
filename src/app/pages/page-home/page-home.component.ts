import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs/operators';
import { DocFormViewerComponent } from 'src/app/features/doc/components/doc-form-viewer/doc-form-viewer.component';
import { LanguageService } from '../../features/language/language-data.service';
import { UiContentWrapperComponent } from '../../features/ui-content-wrapper/ui-content-wrapper.component';

@Component({
  selector: 'app-page-home',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    UiContentWrapperComponent,
    DocFormViewerComponent,
  ],
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss'],
})
export class PageHomeComponent implements OnInit {
  private title = inject(Title);
  private langService = inject(LanguageService);

  lang = this.langService.selectedLanguage;
  i18nContent$ = this.langService.i18nContent$;
  features$ = this.i18nContent$.pipe(map((x) => x['FEATURES']));

  ngOnInit(): void {
    this.title.setTitle('NgDynamicJsonForm');
  }
}
