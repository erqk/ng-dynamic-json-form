import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomControlComponent } from '../../custom-control/custom-control.component';

@Component({
  selector: 'ui-basic-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ui-basic-checkbox.component.html',
  styles: [],
})
export class UiBasicCheckboxComponent extends CustomControlComponent {
  override control = new FormControl<any | any[]>('');

  onCheckboxChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    const oldValue = Array.isArray(this.control.value)
      ? this.control.value || []
      : [];
    const removeItem = !input.checked || oldValue.includes(input.value);
    const newValue = removeItem
      ? oldValue.filter((x: any) => x !== input.value)
      : [...oldValue, input.value];

    this.control.setValue(newValue);
  }
}
