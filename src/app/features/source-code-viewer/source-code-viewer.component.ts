import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { UiContentWrapperComponent } from '../ui-content-wrapper/ui-content-wrapper.component';

@Component({
  selector: 'app-source-code-viewer',
  standalone: true,
  imports: [CommonModule, MarkdownModule, UiContentWrapperComponent],
  templateUrl: './source-code-viewer.component.html',
  styleUrls: ['./source-code-viewer.component.scss'],
})
export class SourceCodeViewerComponent {
  private _http = inject(HttpClient);

  @Input() source?: { html: string; ts: string };

  currentTab: string = 'result';
  tabs = ['html', 'ts', 'result'];
  markdown: any = null;

  ngOnInit(): void {
    if (!this.source) return;

    forkJoin([
      this._http.get(this.source.html, { responseType: 'text' }),
      this._http.get(this.source.ts, { responseType: 'text' }),
    ]).subscribe(([html, ts]) => (this.markdown = { html, ts }));
  }
}
