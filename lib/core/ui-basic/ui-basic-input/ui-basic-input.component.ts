import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import { PropsBindingDirective } from '../../directives';

@Component({
  selector: 'ui-basic-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PropsBindingDirective],
  templateUrl: './ui-basic-input.component.html',
  styles: [],
  host: {
    class: 'ui-basic',
  },
})
export class UiBasicInputComponent extends CustomControlComponent {
  override control = new UntypedFormControl('');

  onChange?: any;

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  onInput(e: Event): void {
    const value = (e.target as HTMLInputElement).value;

    this.control.setValue(value);
    this.onChange(value);
  }
}
