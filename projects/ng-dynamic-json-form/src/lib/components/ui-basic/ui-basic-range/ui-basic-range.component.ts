import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgDynamicJsonFormCustomComponent } from '../../custom-component-base/custom-component-base.component';
import { debounceTime, startWith, tap } from 'rxjs/operators';

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
    this.control?.valueChanges
      .pipe(
        startWith(this.control.value),
        debounceTime(0),
        tap(() => this.updateSlider())
      )
      .subscribe();
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
