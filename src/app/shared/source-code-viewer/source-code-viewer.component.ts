import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ContentWrapperComponent } from '../content-wrapper/content-wrapper.component';

@Component({
  selector: 'app-source-code-viewer',
  standalone: true,
  imports: [CommonModule, MarkdownModule, ContentWrapperComponent],
  templateUrl: './source-code-viewer.component.html',
  styleUrls: ['./source-code-viewer.component.scss'],
})
export class SourceCodeViewerComponent {
  private http = inject(HttpClient);

  @Input() source?: { html: string; ts: string };

  currentTab: string = 'result';
  tabs = ['html', 'ts', 'result'];
  markdown: any = null;

  ngOnInit(): void {
    if (!this.source) return;

    forkJoin([
      this.http.get(this.source.html, { responseType: 'text' }),
      this.http.get(this.source.ts, { responseType: 'text' }),
    ]).subscribe(([html, ts]) => (this.markdown = { html, ts }));
  }
}
