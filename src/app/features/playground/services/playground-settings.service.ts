import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlaygroundSettingsService {
  readonly defaultAsSplitSizes = [60, 40];

  get formUi(): string {
    return window.localStorage.getItem('form-ui') || '';
  }

  set formUi(value: string) {
    window.localStorage.setItem('form-ui', value);
  }

  get asSplitSizes(): number[] {
    const data = window.localStorage.getItem('as-split-sizes');
    if (!data) {
      return this.defaultAsSplitSizes;
    }

    try {
      return JSON.parse(data);
    } catch {
      return this.defaultAsSplitSizes;
    }
  }

  set asSplitSizes(value: number[]) {
    window.localStorage.setItem('as-split-sizes', JSON.stringify(value));
  }
}
