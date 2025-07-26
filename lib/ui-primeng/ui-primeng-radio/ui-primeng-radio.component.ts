import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
    styles: []
})
export class UiPrimengRadioComponent extends CustomControlComponent {
  private _onChange?: any;
  override control = new FormControl(-1);

  override writeValue(obj: any): void {
    const index = this.data?.options?.data?.findIndex(
      (x) => JSON.stringify(x.value) === JSON.stringify(obj)
    );

    if (index !== undefined) {
      this.control.setValue(index);
    }
  }

  override registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  updateControl(): void {
    const index = this.control.value ?? -1;

    if (index > -1) {
      const value = this.data?.options?.data?.[index].value;
      this._onChange(value);
    }
  }
}
