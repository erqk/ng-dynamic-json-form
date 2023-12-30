import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import {
  Subject,
  interval,
  merge,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
  timer
} from 'rxjs';

@Component({
  selector: 'ui-loading-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="loading-bar"
      [ngClass]="{start}"
      [ngStyle]="{
        '--step-count': step
      }"
    ></div>
  `,
  styleUrls: ['./ui-loading-indicator.component.scss'],
})
export class UiLoadingIndicatorComponent {
  private _step = 0;
  private readonly _cancelTimer$ = new Subject<void>();
  private readonly _onDestroy$ = new Subject<void>();

  @Input() start = false;

  step = '0%';

  ngOnChanges(simpleChanges: SimpleChanges): void {
    const { start } = simpleChanges;
    if (start) {
      if (this.start) {
        this._addStep();
      } else {
        this.step = '0%';
        this._cancelTimer$.next();
      }
    }
  }

  ngOnDestroy(): void {
    this._cancelTimer$.next();
    this._cancelTimer$.complete();
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  private _addStep(): void {
    timer(3000)
      .pipe(
        switchMap(() => interval(1000)),
        tap(() => {
          this._step += Math.round(Math.random());
          this.step = `${this._step}%`;
        }),
        takeUntil(merge(this._onDestroy$, this._cancelTimer$)),
        takeWhile(() => this._step < 10)
      )
      .subscribe();
  }
}
