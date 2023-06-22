import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { DocumentLoaderService } from 'src/app/features/document/services/document-loader.service';
import { LoadingIndicatorComponent } from 'src/app/shared/loading-indicator/loading-indicator.component';
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
    LoadingIndicatorComponent,
  ],
  templateUrl: './page-api.component.html',
  styleUrls: ['./page-api.component.scss'],
})
export class PageApiComponent {
  content$ = this.documentLoaderService.getDocumentContent$('api', true);

  constructor(
    private sideNavigationPaneService: SideNavigationPaneService,
    private documentLoaderService: DocumentLoaderService
  ) {}

  onReady(): void {
    this.documentLoaderService.wrapTable();
    this.sideNavigationPaneService.buildNavigationLinks();
  }
}
