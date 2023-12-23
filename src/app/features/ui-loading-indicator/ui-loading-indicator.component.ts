import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Subject,
  filter,
  interval,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
  timer,
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
  private readonly _onDestroy$ = new Subject();

  @Input() start = false;

  step = '0%';

  ngOnChanges(simpleChanges: SimpleChanges): void {
    const { start } = simpleChanges;
    if (start) {
      this._addStep();
    }
  }

  private _addStep(): void {
    timer(3000)
      .pipe(
        switchMap(() => interval(1000)),
        tap(() => {
          this._step += Math.round(Math.random());
          this.step = `${this._step}%`;
        }),
        takeUntil(this._onDestroy$),
        takeWhile(() => this._step < 10)
      )
      .subscribe();
  }
}
