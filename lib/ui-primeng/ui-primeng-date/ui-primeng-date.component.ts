import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  PropsBindingDirective,
  providePropsBinding,
} from 'ng-dynamic-json-form';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'ui-primeng-date',
  imports: [
    DatePickerModule,
    FormsModule,
    PropsBindingDirective,
    ReactiveFormsModule,
  ],
  providers: [
    providePropsBinding([
      {
        key: 'p-datepicker',
        token: DatePicker,
      },
    ]),
  ],
  templateUrl: './ui-primeng-date.component.html',
  styles: [],
})
export class UiPrimengDateComponent extends CustomControlComponent {
  private onChange?: any;

  override control = new FormControl(new Date());

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  updateControl(): void {
    this.onChange(this.control.value);
  }
}
