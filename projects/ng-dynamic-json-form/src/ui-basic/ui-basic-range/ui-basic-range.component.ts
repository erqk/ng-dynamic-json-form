import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  PropsBindingDirective,
} from '../../public-api';

@Component({
  selector: 'ui-basic-range',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective],
  templateUrl: './ui-basic-range.component.html',
  styles: [],
})
export class UiBasicRangeComponent extends CustomControlComponent {
  override control = new FormControl(0);
  tickMarks: any[] = [];

  ngOnInit(): void {
    this._getTickMarksCount();
  }

  get valuePosition(): string {
    const min = this.data?.extra?.min ?? 0;
    const max = this.data?.extra?.max ?? 0;

    return `${((this.control.value! - min) / (max - min)) * 100}%`;
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
}
