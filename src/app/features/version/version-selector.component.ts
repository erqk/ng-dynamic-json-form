import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { VersionService } from './version.service';

@Component({
    selector: 'version-selector',
    imports: [CommonModule],
    template: `
    <!-- <select [value]="currentVersion" (change)="changeVersion($event)">
      <ng-container *ngFor="let item of versions">
        <option value="{{ item }}">{{ item }}</option>
      </ng-container>
    </select> -->
    <ng-container *ngIf="versions.length === 1">
      <span class="lg:text-lg font-light capitalize tracking-wider">{{
        versions[0]
      }}</span>
    </ng-container>
  `,
    styles: []
})
export class VersionSelectorComponent {
  private versionService = inject(VersionService);

  versions = this.versionService.versions;

  changeVersion(e: Event): void {
    const select = e.target as HTMLSelectElement;
    const version = select.value;

    window.location.href = `${window.location.origin}/ng-dynamic-json-form/${version}`;
  }
}
