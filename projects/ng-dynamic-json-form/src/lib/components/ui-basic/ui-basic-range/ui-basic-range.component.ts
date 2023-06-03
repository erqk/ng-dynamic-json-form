import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { startWith, tap } from 'rxjs/operators';
import { NgDynamicJsonFormCustomComponent } from '../../custom-component-base/custom-component-base.component';

@Component({
  selector: 'ui-basic-range',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ui-basic-range.component.html',
  styles: [],
})
export class UiBasicRangeComponent extends NgDynamicJsonFormCustomComponent {
  private el = inject(ElementRef);
  private rangeInput?: HTMLInputElement;
  ngOnInit(): void {
    this.getTickMarksCount();
  }

  tickMarks: any[] = [];

  ngAfterViewInit(): void {
    this.updateSlider();
    this.control?.valueChanges
      .pipe(
        startWith(this.control.value),
        tap(() => this.updateSlider())
      )
      .subscribe();
  }

  get valuePosition(): string {
    const min = this.data?.extra?.range?.min;
    const max = this.data?.extra?.range?.max;

    if (
      this.control?.value === undefined ||
      min === undefined ||
      max === undefined
    ) {
      return '0%';
    }

    return `${(this.control.value / (max - min)) * 100}%`;
  }

  private getTickMarksCount(): void {
    if (!this.data?.extra?.range || !this.data.extra.range.showTickMarks) {
      return;
    }

    const diff =
      (this.data.extra.range.max ?? 1) - (this.data.extra.range.min ?? 1);
    const steps = this.data.extra.range.step ?? 1;
    if (diff === 0) return;

    this.tickMarks = Array.from(Array(Math.ceil(diff / steps) + 1).keys()).map(
      (x, i) => i
    );
  }

  private updateSlider(): void {
    if (!this.rangeInput) {
      this.rangeInput = this.el.nativeElement.querySelector(
        'input'
      ) as HTMLInputElement;
      return;
    }

    const min = parseFloat(this.rangeInput.min);
    const max = parseFloat(this.rangeInput.max);
    const value = parseFloat(this.rangeInput.value);
    this.rangeInput.style.backgroundSize = `${
      ((value - min) * 100) / (max - min)
    }% 100%`;
  }
}
