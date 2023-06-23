import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { DocumentLoaderService } from 'src/app/features/document/services/document-loader.service';
import { ContentWrapperComponent } from '../../shared/content-wrapper/content-wrapper.component';
import { SideNavigationPaneService } from '../../shared/side-navigation-pane/side-navigation-pane.service';

@Component({
  selector: 'app-page-getting-started',
  standalone: true,
  imports: [CommonModule, MarkdownModule, ContentWrapperComponent],
  templateUrl: './page-getting-started.component.html',
  styleUrls: ['./page-getting-started.component.scss'],
})
export class PageGettingStartedComponent {
  content$ = this._documentLoaderService.getDocumentContent$('getting-started');

  constructor(
    private _sideNavigationPaneService: SideNavigationPaneService,
    private _documentLoaderService: DocumentLoaderService
  ) {}

  onReady(): void {
    this._sideNavigationPaneService.buildNavigationLinks();
  }
}
