import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { delay } from 'rxjs/operators';
import { VersionService } from './version.service';

@Component({
  selector: 'app-version-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <select [value]="currentVersion" (change)="changeVersion($event)">
      <ng-container *ngFor="let item of versions$ | async">
        <option value="{{ item.value }}">{{ item.label }}</option>
      </ng-container>
    </select>
  `,
  styles: [],
})
export class VersionSelectorComponent {
  private _versionService = inject(VersionService);

  versions$ = this._versionService.versions$;
  currentVersion = this._versionService.currentVersion;

  changeVersion(e: Event): void {
    const select = e.target as HTMLSelectElement;
    const version = select.value;

    window.location.href = `${window.location.origin}/ng-dynamic-json-form/${version}`;
  }
}
