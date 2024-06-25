import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FormReadyStateService {
  optionsReady$ = new BehaviorSubject<boolean>(false);

  private _optionsLoadingCount = 0;

  optionsLoading(add: boolean): void {
    if (add) {
      this._optionsLoadingCount++;
    } else {
      this._optionsLoadingCount--;

      if (this._optionsLoadingCount <= 0) {
        this._optionsLoadingCount = 0;

        if (this.optionsReady$.value !== true) {
          this.optionsReady$.next(true);
        }
      }
    }
  }

  resetState(): void {
    this.optionsReady$.next(false);
  }
}
