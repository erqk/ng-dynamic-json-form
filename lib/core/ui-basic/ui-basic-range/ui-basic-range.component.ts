import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import { PropsBindingDirective } from '../../directives';

@Component({
  selector: 'ui-basic-range',
  imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective],
  templateUrl: './ui-basic-range.component.html',
  styles: [],
  host: {
    class: 'ui-basic',
  },
})
export class UiBasicRangeComponent extends CustomControlComponent {
  override control = new FormControl(0);

  onChange?: any;

  controlValue = toSignal(this.control.valueChanges, {
    initialValue: this.control.value,
  });

  valuePosition = computed(() => {
    const controlValue = this.controlValue() ?? 0;
    const props = this.data()?.props;
    const min = props?.min ?? 0;
    const max = props?.max ?? 0;

    return `${((controlValue - min) / (max - min)) * 100}%`;
  });

  tickMarks = computed(() => {
    const { min, max, showTickMarks, step } = this.data()?.props ?? {};

    const diff = (max ?? 1) - (min ?? 1);
    const steps = step ?? 1;

    if (diff === 0) {
      return [];
    }

    return Array.from(Array(Math.ceil(diff / steps) + 1).keys()).map(
      (x, i) => i,
    );
  });

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }
}
