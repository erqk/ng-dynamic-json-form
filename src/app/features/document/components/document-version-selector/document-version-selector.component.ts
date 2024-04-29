import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { delay } from 'rxjs/operators';
import { DocumentVersionService } from '../../services/document-version.service';

@Component({
  selector: 'app-document-version-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <select [value]="currentVersion$ | async" (change)="changeVersion($event)">
      <ng-container *ngFor="let item of versions$ | async">
        <option value="{{ item.value }}">{{ item.label }}</option>
      </ng-container>
    </select>
  `,
  styles: [],
})
export class DocumentVersionSelectorComponent {
  private _docVersionService = inject(DocumentVersionService);

  versions$ = this._docVersionService.versions$;
  currentVersion$ = this._docVersionService.currentVersion$.pipe(delay(0));

  changeVersion(e: Event): void {
    const select = e.target as HTMLSelectElement;
    const version = select.value;

    window.location.href = `${window.location.origin}/ng-dynamic-json-form/${version}`;
  }
}
