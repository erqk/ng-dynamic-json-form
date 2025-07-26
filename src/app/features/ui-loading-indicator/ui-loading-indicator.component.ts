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
        '--step-count': stepPercentage
      }"
    ></div>
  `,
  styleUrls: ['./ui-loading-indicator.component.scss'],
})
export class UiLoadingIndicatorComponent {
  private step = 0;
  private cancelTimer$ = new Subject<void>();
  private onDestroy$ = new Subject<void>();

  @Input() start = false;

  stepPercentage = '0%';

  ngOnChanges(simpleChanges: SimpleChanges): void {
    const { start } = simpleChanges;
    if (start) {
      if (start.currentValue === true) {
        this.addStep();
      } else {
        this.stepPercentage = '0%';
        this.cancelTimer$.next();
      }
    }
  }

  ngOnDestroy(): void {
    this.cancelTimer$.next();
    this.cancelTimer$.complete();
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private addStep(): void {
    timer(3000)
      .pipe(
        switchMap(() => interval(1000)),
        tap(() => {
          this.step += Math.round(Math.random());
          this.stepPercentage = `${this.step}%`;
        }),
        takeUntil(merge(this.onDestroy$, this.cancelTimer$)),
        takeWhile(() => this.step < 10)
      )
      .subscribe();
  }
}
