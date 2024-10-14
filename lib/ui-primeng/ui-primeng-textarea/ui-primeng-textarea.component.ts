import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  PropsBindingDirective,
  providePropsBinding,
} from 'ng-dynamic-json-form';
import { InputTextarea, InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'ui-primeng-textarea',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextareaModule,
    PropsBindingDirective,
  ],
  providers: [
    providePropsBinding([
      {
        key: 'p-input-textarea',
        token: InputTextarea,
      },
    ]),
  ],
  templateUrl: './ui-primeng-textarea.component.html',
  styles: [],
})
export class UiPrimengTextareaComponent extends CustomControlComponent {
  override control = new FormControl('');
  onChange?: any;

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  onInput(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this.onChange(value);
  }
}
