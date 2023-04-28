import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { ContentWrapperComponent } from '../../shared/content-wrapper/content-wrapper.component';

@Component({
  selector: 'app-page-styling',
  standalone: true,
  imports: [CommonModule, MarkdownModule, ContentWrapperComponent],
  templateUrl: './page-styling.component.html',
  styleUrls: ['./page-styling.component.scss']
})
export class PageStylingComponent {

}
