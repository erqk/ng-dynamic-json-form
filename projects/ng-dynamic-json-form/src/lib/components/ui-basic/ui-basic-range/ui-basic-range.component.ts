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
  private _el = inject(ElementRef);
  private _rangeInput?: HTMLInputElement;

  tickMarks: any[] = [];

  override ngOnInit(): void {
    super.ngOnInit();
    this._getTickMarksCount();
  }

  ngAfterViewInit(): void {
    this._updateSlider();
    this.control?.valueChanges
      .pipe(
        startWith(this.control.value),
        tap(() => this._updateSlider())
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

    return `${((this.control.value - min) / (max - min)) * 100}%`;
  }

  private _getTickMarksCount(): void {
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

  private _updateSlider(): void {
    if (!this._rangeInput) {
      this._rangeInput = this._el.nativeElement.querySelector(
        'input'
      ) as HTMLInputElement;
      return;
    }

    const min = parseFloat(this._rangeInput.min);
    const max = parseFloat(this._rangeInput.max);
    const value = parseFloat(this._rangeInput.value);
    this._rangeInput.style.backgroundSize = `${
      ((value - min) * 100) / (max - min)
    }% 100%`;
  }
}
