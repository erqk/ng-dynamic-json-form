import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { startWith, tap } from 'rxjs/operators';
import { CustomControlComponent } from '../../custom-control/custom-control.component';
import { PropsBindingDirective } from '../../../directives';

@Component({
  selector: 'ui-basic-range',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective],
  templateUrl: './ui-basic-range.component.html',
  styles: [],
})
export class UiBasicRangeComponent extends CustomControlComponent {
  private _el = inject(ElementRef);
  private _rangeInput?: HTMLInputElement;

  override control = new FormControl(0);
  tickMarks: any[] = [];

  ngOnInit(): void {
    this._getTickMarksCount();
  }

  ngAfterViewInit(): void {
    this._updateSlider();
    // this.control?.valueChanges
    //   .pipe(
    //     startWith(this.control.value),
    //     tap(() => this._updateSlider())
    //   )
    //   .subscribe();
  }

  get valuePosition(): string {
    const min = this.data?.extra?.min ?? 0;
    const max = this.data?.extra?.max ?? 0;

    // console.log(min, max);
    return `${((this.control.value! - min) / (max - min)) * 100}%`;
  }

  get controlValue(): any {
    // console.log('control value...');
    return this.control.value;
  }

  private _getTickMarksCount(): void {
    if (!this.data?.extra || !this.data.extra.showTickMarks) {
      return;
    }

    const diff = (this.data.extra.max ?? 1) - (this.data.extra.min ?? 1);
    const steps = this.data.extra.step ?? 1;
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
    const value = this.control.value ?? 0;
    this._rangeInput.style.backgroundSize = `${
      ((value - min) * 100) / (max - min)
    }% 100%`;
  }
}
