import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import { PropsBindingDirective } from '../../directives';

@Component({
  selector: 'ui-basic-select',
  imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective],
  templateUrl: './ui-basic-select.component.html',
  styles: [],
  host: {
    class: 'ui-basic',
  },
})
export class UiBasicSelectComponent extends CustomControlComponent {
  override control = new FormControl(-1);

  options = computed(() => this.data()?.options?.data ?? []);

  onTouched = () => {};
  onChange = (_: any) => {};

  override writeValue(obj: any): void {
    const index = this.options().findIndex(
      (x) => JSON.stringify(x.value) === JSON.stringify(obj),
    );

    if (index !== undefined) {
      this.control.setValue(index);
    }
  }

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  override registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  emitValue(e: Event): void {
    const index = (e.target as HTMLSelectElement).value;

    if (index) {
      const value = this.options().map((x) => x.value)?.[parseInt(index)];
      this.onChange(value);
    }
  }
}
