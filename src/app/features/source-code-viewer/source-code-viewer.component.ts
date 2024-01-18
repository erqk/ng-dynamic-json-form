import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { CheckboxModule } from 'primeng/checkbox';
import { forkJoin } from 'rxjs';
import { UiContentWrapperComponent } from '../ui-content-wrapper/ui-content-wrapper.component';

@Component({
  selector: 'app-source-code-viewer',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownModule,
    UiContentWrapperComponent,
    CheckboxModule,
    FormsModule,
  ],
  templateUrl: './source-code-viewer.component.html',
  styleUrls: ['./source-code-viewer.component.scss'],
})
export class SourceCodeViewerComponent {
  private _http = inject(HttpClient);

  @Input() source?: { html: string; ts: string };

  selectedTabs: string[] = [];
  tabs = ['html', 'ts'];
  markdown: any = null;

  ngOnInit(): void {
    if (!this.source) return;

    forkJoin([
      this._http.get(this.source.html, { responseType: 'text' }),
      this._http.get(this.source.ts, { responseType: 'text' }),
    ]).subscribe(([html, ts]) => (this.markdown = { html, ts }));
  }
}
