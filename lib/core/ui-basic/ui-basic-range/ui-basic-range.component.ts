import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import { PropsBindingDirective } from '../../directives';

@Component({
  selector: 'ui-basic-range',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective],
  templateUrl: './ui-basic-range.component.html',
  styles: [],
  host: {
    class: 'ui-basic',
  },
})
export class UiBasicRangeComponent extends CustomControlComponent {
  override control = new FormControl(0);
  tickMarks: any[] = [];

  onChange?: any;

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  ngOnInit(): void {
    this._getTickMarksCount();
  }

  get valuePosition(): string {
    const min = this.data?.props?.min ?? 0;
    const max = this.data?.props?.max ?? 0;

    return `${((this.control.value! - min) / (max - min)) * 100}%`;
  }

  private _getTickMarksCount(): void {
    if (!this.data?.props || !this.data.props.showTickMarks) {
      return;
    }

    const diff = (this.data.props.max ?? 1) - (this.data.props.min ?? 1);
    const steps = this.data.props.step ?? 1;
    if (diff === 0) return;

    this.tickMarks = Array.from(Array(Math.ceil(diff / steps) + 1).keys()).map(
      (x, i) => i
    );
  }
}
