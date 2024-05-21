import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormReadyState } from '../models';

@Injectable()
export class FormReadyStateService {
  private _ready$ = new BehaviorSubject<FormReadyState>({
    options: false,
    form: false,
  });

  private _optionsLoadingCount = 0;

  optionsLoading(add: boolean): void {
    if (add) {
      this._optionsLoadingCount++;
    } else {
      this._optionsLoadingCount--;

      if (this._optionsLoadingCount <= 0) {
        this._optionsLoadingCount = 0;

        if (this._ready$.value.options !== true) {
          this.updateReadyState({ options: true });
        }
      }
    }
  }

  updateReadyState(e: Partial<FormReadyState>): void {
    this._ready$.next({
      ...this._ready$.value,
      ...e,
    });
  }

  resetState(): void {
    const state = Object.keys(this._ready$.value).reduce((acc, key) => {
      (acc as any)[key] = false;
      return acc;
    }, this._ready$.value);
  }

  get readyState$(): Observable<FormReadyState> {
    return this._ready$.asObservable();
  }
}
