import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgDynamicJsonFormCustomComponent } from '../../custom-component-base/custom-component-base.component';

@Component({
  selector: 'ui-basic-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ui-basic-checkbox.component.html',
  styles: [],
})
export class UiBasicCheckboxComponent extends NgDynamicJsonFormCustomComponent {
  onCheckboxChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    let currentValue = (this.control?.value as any[]) || [];

    if (!input.checked || currentValue.includes(input.value)) {
      currentValue = currentValue.filter((x) => x !== input.value);
    } else {
      currentValue.push(input.value);
    }

    this.control?.setValue(currentValue);
  }
}
