import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  interval,
  Subject,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
  timer,
} from 'rxjs';

@Component({
  selector: 'ui-loading-indicator',
  imports: [CommonModule],
  template: `
    <div
      class="loading-bar"
      [ngClass]="{ start: start() }"
      [ngStyle]="{
        '--step-count': stepPercentage,
      }"
    ></div>
  `,
  styleUrls: ['./ui-loading-indicator.component.scss'],
})
export class UiLoadingIndicatorComponent {
  private destroyRef = inject(DestroyRef);
  private cancelTimer$ = new Subject<void>();
  private step = signal<number>(0);

  start = input<boolean>(false);

  stepPercentage = computed(() => `${this.step}%`);

  constructor() {
    effect(() => {
      const start = this.start();

      untracked(() => {
        if (start) {
          this.addStep();
        } else {
          this.step.set(0);
          this.cancelTimer$.next();
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.cancelTimer$.next();
    this.cancelTimer$.complete();
  }

  private addStep(): void {
    timer(3000)
      .pipe(
        switchMap(() => interval(1000)),
        tap(() => {
          this.step.update((x) => (x += Math.round(Math.random())));
        }),
        takeWhile(() => this.step() < 10),
        takeUntil(this.cancelTimer$),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
