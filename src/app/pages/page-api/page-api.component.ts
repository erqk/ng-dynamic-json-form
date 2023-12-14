import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { DocumentLoaderService } from 'src/app/features/document/services/document-loader.service';
import { LoadingIndicatorComponent } from 'src/app/features/ui-loading-indicator/ui-loading-indicator.component';
import { UiContentWrapperComponent } from '../../features/ui-content-wrapper/ui-content-wrapper.component';
import { SideNavigationPaneService } from '../../features/side-navigation-pane/side-navigation-pane.service';

@Component({
  selector: 'app-page-api',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MarkdownModule,
    UiContentWrapperComponent,
    LoadingIndicatorComponent,
  ],
  templateUrl: './page-api.component.html',
  styleUrls: ['./page-api.component.scss'],
})
export class PageApiComponent {
  content$ = this._documentLoaderService.getDocumentContent$('api', true);

  constructor(
    private _sideNavigationPaneService: SideNavigationPaneService,
    private _documentLoaderService: DocumentLoaderService
  ) {}

  onReady(): void {
    this._documentLoaderService.wrapTable();
    this._sideNavigationPaneService.buildNavigationLinks();
  }
}
