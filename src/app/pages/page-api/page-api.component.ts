import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import {
  Observable,
  concatMap,
  from,
  map,
  switchMap,
  toArray
} from 'rxjs';
import { LanguageDataService } from '../../features/language/services/language-data.service';
import { ContentWrapperComponent } from '../../shared/content-wrapper/content-wrapper.component';
import { SideNavigationPaneService } from '../../shared/side-navigation-pane/side-navigation-pane.service';

@Component({
  selector: 'app-page-api',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MarkdownModule,
    ContentWrapperComponent,
  ],
  templateUrl: './page-api.component.html',
  styleUrls: ['./page-api.component.scss'],
})
export class PageApiComponent {
  markdownContent$ = this.getContent$();

  constructor(
    private http: HttpClient,
    private sideNavigationPaneService: SideNavigationPaneService,
    private languageDataService: LanguageDataService
  ) {}

  getContent$(): Observable<string> {
    const contentSequence = [
      'form-config',
      'input-type',
      'input-mask',
      'options',
      'css-grid',
      'extra',
      'form-array',
      'validators',
      'custom-validators',
      'conditions',
      'custom-component',
      'custom-ui-component',
    ];

    const content$ = from(contentSequence).pipe(
      concatMap((x) => {
        const filePath = `assets/docs/api/api-${x}/api-${x}_${this.languageDataService.language$.value}.md`;
        return this.http.get(filePath, {
          responseType: 'text',
        });
      }),
      toArray(),
      map((x) => x.join(''))
    );

    return this.languageDataService.language$.pipe(switchMap(() => content$));
  }

  onReady(): void {
    const h2 = document.querySelectorAll('markdown h2');
    this.sideNavigationPaneService.h2$.next(Array.from(h2));
  }
}
