import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControlConfig } from '../models';

@Injectable()
export class FormReadyStateService {
  optionsReady$ = new BehaviorSubject<boolean>(false);

  private optionsLoadingCount = 0;

  optionsLoading(add: boolean): void {
    if (add) {
      this.optionsLoadingCount++;
    } else {
      this.optionsLoadingCount--;

      if (this.optionsLoadingCount <= 0) {
        this.optionsLoadingCount = 0;

        if (this.optionsReady$.value !== true) {
          this.optionsReady$.next(true);
        }
      }
    }
  }

  resetState(): void {
    this.optionsReady$.next(false);
  }

  haveOptionsToWait(configs: FormControlConfig[]): boolean {
    if (!configs.length) return false;

    const result = configs.some((x) =>
      !x.children?.length
        ? Boolean(x.options) && Boolean(x.options!.src)
        : this.haveOptionsToWait(x.children)
    );

    return result;
  }
}
