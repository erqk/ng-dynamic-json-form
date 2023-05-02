import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { ContentWrapperComponent } from '../../shared/content-wrapper/content-wrapper.component';
import { LanguageDataService } from '../../features/language/services/language-data.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MarkdownModule,
    ContentWrapperComponent,
  ],
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss'],
})
export class PageHomeComponent {
  language$ = this.languageDataService.language$;
  languageData$ = this.languageDataService.languageData$;

  constructor(private languageDataService: LanguageDataService) {}
}
