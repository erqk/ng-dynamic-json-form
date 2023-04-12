import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { NgDynamicJsonFormConfig } from '../../models/form-control-config.model';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styles: [],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class FormControlComponent {
  @Input() data: NgDynamicJsonFormConfig | null = null;
  @Input() control: UntypedFormControl | null = null;

  checkboxValues: any[] = [];

  ngOnInit(): void {}

  onCheckboxChange(e: Event): void {
    const input = e.target as HTMLInputElement;

    if (!input.checked || this.control?.value.includes(input.value)) {
      this.control?.setValue(
        this.control.value.filter((x: any) => x !== input.value)
      );
    } else {
      this.control?.setValue([...this.control.value, input.value]);
    }
  }
}
