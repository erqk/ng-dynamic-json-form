import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  PropsBindingDirective,
  providePropsBinding,
} from 'ng-dynamic-json-form';
import { Textarea, TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'ui-primeng-textarea',
  imports: [ReactiveFormsModule, TextareaModule, PropsBindingDirective],
  providers: [
    providePropsBinding([
      {
        key: 'p-textarea',
        token: Textarea,
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

    this.control.setValue(value);
    this.onChange(value);
  }
}
