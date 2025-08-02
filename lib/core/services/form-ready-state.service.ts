import { Injectable, signal } from '@angular/core';
import { FormControlConfig } from '../models';

@Injectable()
export class FormReadyStateService {
  private optionsLoadingCount = signal<number>(0);

  optionsReady = signal<boolean>(false);

  optionsLoading(add: boolean): void {
    const ready = this.optionsReady();

    if (ready) {
      return;
    }

    this.optionsLoadingCount.update((x) => (x += add ? 1 : -1));

    if (this.optionsLoadingCount() === 0) {
      this.optionsReady.set(true);
    }
  }

  resetState(): void {
    this.optionsReady.set(false);
  }

  haveOptionsToWait(configs: FormControlConfig[]): boolean {
    if (!configs.length) return false;

    const result = configs.some((x) =>
      !x.children?.length
        ? Boolean(x.options) && Boolean(x.options!.src)
        : this.haveOptionsToWait(x.children),
    );

    return result;
  }
}
