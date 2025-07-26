import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import {
  CustomControlComponent,
  PropsBindingDirective,
  providePropsBinding,
} from 'ng-dynamic-json-form';
import { Select, SelectModule } from 'primeng/select';

@Component({
  selector: 'ui-primeng-select',
  imports: [ReactiveFormsModule, SelectModule, PropsBindingDirective],
  providers: [
    providePropsBinding([
      {
        key: 'p-selects',
        token: Select,
      },
    ]),
  ],
  templateUrl: './ui-primeng-select.component.html',
  styles: [],
})
export class UiPrimengSelectComponent extends CustomControlComponent {
  override control = new UntypedFormControl('');

  onTouched = () => {};
  onChange = (_: any) => {};

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  override registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
