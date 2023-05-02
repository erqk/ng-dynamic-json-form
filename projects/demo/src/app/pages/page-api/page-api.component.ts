import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { ContentWrapperComponent } from '../../shared/content-wrapper/content-wrapper.component';
import { SideNavigationPaneService } from '../../shared/side-navigation-pane/side-navigation-pane.service';
import { LanguageDataService } from '../../features/language/services/language-data.service';

@Component({
  selector: 'app-page-api',
  standalone: true,
  imports: [CommonModule, MarkdownModule, ContentWrapperComponent],
  templateUrl: './page-api.component.html',
  styleUrls: ['./page-api.component.scss'],
})
export class PageApiComponent {
  language$ = this.languageDataService.language$;
  
  constructor(
    private sideNavigationPaneService: SideNavigationPaneService,
    private languageDataService: LanguageDataService
  ) {}

  onReady(): void {
    const h2 = document.querySelectorAll('markdown h2');
    this.sideNavigationPaneService.h2$.next(Array.from(h2));
  }
}
