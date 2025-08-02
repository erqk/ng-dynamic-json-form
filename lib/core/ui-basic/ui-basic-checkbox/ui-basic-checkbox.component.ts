import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import { PropsBindingDirective } from '../../directives';

@Component({
  selector: 'ui-basic-checkbox',
  imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective],
  templateUrl: './ui-basic-checkbox.component.html',
  styles: [],
  host: {
    class: 'ui-basic',
  },
})
export class UiBasicCheckboxComponent extends CustomControlComponent {
  private onChange?: any;

  override control = new FormArray<FormControl>([]);

  groupButtonsStyles = computed(() => {
    const { layout, containerStyles } = this.data()?.options ?? {};

    return `
      flex-direction: ${layout ?? 'row'};
      align-items: flex-start;
      ${containerStyles ?? ''}
    `.replace(/\s{2,}/g, '');
  });

  override writeValue(obj: any): void {
    this.control.clear();

    if (Array.isArray(obj)) {
      obj.forEach((x) => this.addItem(x));
    } else {
      this.addItem(obj);
    }
  }

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  toggle(e: Event): void {
    const checked = (e.target as HTMLInputElement).checked;
    this.onChange(checked);
  }

  onCheckboxChange(e: Event, index: number): void {
    const data = this.data();
    const input = e.target as HTMLInputElement;
    const checked = input.checked;

    const value = data?.options?.data
      ?.map((x) => x.value)
      .filter((val, i) => (i === index ? checked : this.isChecked(val)));

    this.control.clear();
    value?.forEach((x) => this.addItem(x));
    this.onChange(this.control.value);
  }

  isChecked(val: any): boolean {
    return this.control.value.some(
      (x) => JSON.stringify(x) === JSON.stringify(val),
    );
  }

  private addItem(val?: any): void {
    const control = new FormControl(val);
    this.control.push(control);
  }
}
