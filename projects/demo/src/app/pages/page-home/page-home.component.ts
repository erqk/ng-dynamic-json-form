import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { ContentWrapperComponent } from '../../shared/content-wrapper/content-wrapper.component';
import { LanguageDataService } from '../../features/language/services/language-data.service';

@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [CommonModule, MarkdownModule, ContentWrapperComponent],
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss'],
})
export class PageHomeComponent {
  language$ = this.languageDataService.language$;
  
  constructor(private languageDataService: LanguageDataService) {}
}
