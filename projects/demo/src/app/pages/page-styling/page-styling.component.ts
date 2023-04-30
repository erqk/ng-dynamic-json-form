import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
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
  loadingItemCount = 0;

  constructor(private sideNavigationPaneService: SideNavigationPaneService) {}

  ngAfterViewInit(): void {
    this.loadingItemCount = document.querySelectorAll('markdown.md-file').length;
  }

  onReady(): void {
    this.loadingItemCount -= 1;

    if (this.loadingItemCount === 0) {
      const h2 = document.querySelectorAll('markdown h2');
      this.sideNavigationPaneService.h2$.next(Array.from(h2));
    }
  }
}
