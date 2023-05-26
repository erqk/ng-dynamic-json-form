import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { ContentWrapperComponent } from '../../shared/content-wrapper/content-wrapper.component';
import { LanguageDataService } from '../../features/language/services/language-data.service';
import { RouterModule } from '@angular/router';
import { LoadingIndicatorComponent } from 'src/app/shared/loading-indicator/loading-indicator.component';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MarkdownModule,
    ContentWrapperComponent,
    LoadingIndicatorComponent,
  ],
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss'],
})
export class PageHomeComponent {
  private http = inject(HttpClient);
  private languageDataService = inject(LanguageDataService);
  isLoading = false;

  features$ = this.languageDataService.language$.pipe(
    switchMap((language) =>
      this.http.get(`assets/docs/introduction/introduction_${language}.md`, {
        responseType: 'text',
      })
    )
  );

  languageData$ = this.languageDataService.languageData$;
}
