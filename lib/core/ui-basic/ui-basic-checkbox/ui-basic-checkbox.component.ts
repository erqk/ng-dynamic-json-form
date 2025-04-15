import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import { PropsBindingDirective } from '../../directives';

@Component({
  selector: 'ui-basic-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective],
  templateUrl: './ui-basic-checkbox.component.html',
  styles: [],
  host: {
    class: 'ui-basic',
  },
})
export class UiBasicCheckboxComponent extends CustomControlComponent {
  private _onChange?: any;

  override control = new FormArray<FormControl>([]);

  override writeValue(obj: any): void {
    this.control.clear();

    if (Array.isArray(obj)) {
      obj.forEach((x) => this._addItem(x));
    }
  }

  override registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  toggle(e: Event): void {
    const checked = (e.target as HTMLInputElement).checked;
    this._onChange(checked);
  }

  onCheckboxChange(e: Event, index: number): void {
    const input = e.target as HTMLInputElement;
    const checked = input.checked;

    const value = this.data?.options?.data
      ?.map((x) => x.value)
      .filter((val, i) => (i === index ? checked : this.isChecked(val)));

    this.control.clear();
    value?.forEach((x) => this._addItem(x));
    this._onChange(this.control.value);
  }

  isChecked(val: any): boolean {
    return this.control.value.some(
      (x) => JSON.stringify(x) === JSON.stringify(val)
    );
  }

  get groupButtonsStyles(): string {
    return `
      flex-direction: ${this.data?.options?.layout ?? 'row'};
      align-items: flex-start;
      ${this.data?.options?.containerStyles ?? ''}
    `.replace(/\s{2,}/g, '');
  }

  private _addItem(val?: any): void {
    const control = new FormControl(val);
    this.control.push(control);
  }
}
