import { Component, computed, inject } from '@angular/core';
import { VersionService } from './version.service';

@Component({
  selector: 'version-selector',
  imports: [],
  template: `
    @if (versions().length > 1) {
      <select
        class="doc-form-element px-4!"
        [value]="currentVersion()"
        (change)="changeVersion($event)"
      >
        @for (item of versions(); track $index) {
          <option value="{{ item }}">{{ item.toUpperCase() }}</option>
        }
      </select>
    } @else if (versions().length === 1) {
      <span class="lg:text-lg font-light capitalize tracking-wider">{{
        versions()[0]
      }}</span>
    }
  `,
  styles: [],
})
export class VersionSelectorComponent {
  private versionService = inject(VersionService);

  versions = this.versionService.versions;
  currentVersion = computed(() => this.versions()[0]);

  changeVersion(e: Event): void {
    const select = e.target as HTMLSelectElement;
    const version = select.value;
    const newUrl = `${window.location.origin}/ng-dynamic-json-form/${version}`;

    window.location.href = newUrl;
  }
}
