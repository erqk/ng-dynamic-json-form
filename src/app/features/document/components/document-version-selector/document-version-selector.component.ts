import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentLoaderService } from '../../services/document-loader.service';
import { DocumentVersionService } from '../../services/document-version.service';

@Component({
  selector: 'app-document-version-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <select
      [value]="version$.value"
      (change)="changeVersion($event)"
    >
      <ng-container *ngFor="let item of versions">
        <option value="{{ item }}">v{{ item }}</option>
      </ng-container>
    </select>
  `,
  styles: [],
})
export class DocumentVersionSelectorComponent {
  versionService = inject(DocumentVersionService);
  
  versions = this.versionService.versions;
  version$ = this.versionService.currentVersion$;

  changeVersion(e: Event): void {
    const select = e.target as HTMLSelectElement;
    const version = select.value;

    this.versionService.currentVersion$.next(version);
  }
}
