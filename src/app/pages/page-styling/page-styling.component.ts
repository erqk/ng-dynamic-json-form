import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { DocumentLoaderService } from 'src/app/features/document/services/document-loader.service';
import { ContentWrapperComponent } from '../../shared/content-wrapper/content-wrapper.component';
import { SideNavigationPaneService } from '../../shared/side-navigation-pane/side-navigation-pane.service';

@Component({
  selector: 'app-page-styling',
  standalone: true,
  imports: [CommonModule, MarkdownModule, ContentWrapperComponent],
  templateUrl: './page-styling.component.html',
  styleUrls: ['./page-styling.component.scss'],
})
export class PageStylingComponent {
  content$ = this._documentLoaderService.getDocumentContent$('styling');

  constructor(
    private _sideNavigationPaneService: SideNavigationPaneService,
    private _documentLoaderService: DocumentLoaderService
  ) {}

  onReady(): void {
    this._sideNavigationPaneService.buildNavigationLinks();
  }
}
