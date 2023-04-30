import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
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
  constructor(private sideNavigationPaneService: SideNavigationPaneService) {}

  onReady(): void {
    const h2 = document.querySelectorAll('markdown h2');
    this.sideNavigationPaneService.h2$.next(Array.from(h2));
  }
}
