import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { delay } from 'rxjs/operators';
import { DocumentVersionService } from '../../services/document-version.service';

@Component({
  selector: 'app-document-version-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <select [value]="version$ | async" (change)="changeVersion($event)">
      <ng-container *ngFor="let item of versions">
        <option value="{{ item }}">{{ item }}</option>
      </ng-container>
    </select>
  `,
  styles: [],
})
export class DocumentVersionSelectorComponent {
  versionService = inject(DocumentVersionService);

  versions = this.versionService.versions;
  version$ = this.versionService.currentVersion$.pipe(delay(0));

  ngAfterViewInit(): void {
    this.versionService.setVersion(
      window.localStorage.getItem('docs-version') ||
        this.versionService.versions[0]
    );
  }

  changeVersion(e: Event): void {
    const select = e.target as HTMLSelectElement;
    const version = select.value;

    this.versionService.setVersion(version);
  }
}
