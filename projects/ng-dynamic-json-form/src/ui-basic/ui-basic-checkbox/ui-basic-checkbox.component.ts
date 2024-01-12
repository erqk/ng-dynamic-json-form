import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  PropsBindingDirective,
} from '../../public-api';

@Component({
  selector: 'ui-basic-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective],
  templateUrl: './ui-basic-checkbox.component.html',
  styles: [],
})
export class UiBasicCheckboxComponent extends CustomControlComponent {
  override control = new FormControl<any | any[]>('');

  get controlValue(): any {
    // console.log('control value...Checkbox');
    return this.control.value;
  }

  onCheckboxChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    const inputValue = () => {
      try {
        return JSON.parse(input.value);
      } catch {
        return input.value;
      }
    };
    const oldValue = Array.isArray(this.control.value)
      ? this.control.value || []
      : [];
    const removeItem = !input.checked || oldValue.includes(inputValue());
    const newValue = removeItem
      ? oldValue.filter((x: any) => x !== inputValue())
      : [...oldValue, inputValue()];

    this.control.setValue(newValue);
  }
}
