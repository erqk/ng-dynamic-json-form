import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  PropsBindingDirective,
  providePropsBinding,
} from 'ng-dynamic-json-form';
import { RadioButton, RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'ui-primeng-radio',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RadioButtonModule,
    PropsBindingDirective,
  ],
  providers: [
    providePropsBinding([
      {
        key: 'p-radio-button',
        token: RadioButton,
      },
    ]),
  ],
  templateUrl: './ui-primeng-radio.component.html',
  styles: [],
})
export class UiPrimengRadioComponent extends CustomControlComponent {
  private onChange?: any;
  override control = new FormControl('');

  options = computed(() => this.data()?.options?.data ?? []);

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  emitValue(): void {
    this.onChange(this.control.value);
  }
}
