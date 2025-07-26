
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import {
  CustomControlComponent,
  PropsBindingDirective,
  providePropsBinding
} from 'ng-dynamic-json-form';

@Component({
    selector: 'ui-material-select',
    imports: [
    ReactiveFormsModule,
    MatSelectModule,
    PropsBindingDirective
],
    providers: [
        providePropsBinding([
            {
                key: 'mat-select',
                token: MatSelect,
            },
        ]),
    ],
    templateUrl: './ui-material-select.component.html',
    styles: []
})
export class UiMaterialSelectComponent extends CustomControlComponent {
  private _onChange?: any;

  override control = new FormControl(-1);

  onTouched = () => {};

  override writeValue(obj: any): void {
    const index =
      this.data?.options?.data
        ?.map((x) => x.value)
        .findIndex((x) => JSON.stringify(x) === JSON.stringify(obj)) ?? -1;

    this.control.setValue(index);
  }

  override registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  override registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  updateControl(): void {
    const index = this.control.value ?? -1;

    if (index > -1) {
      const value = this.data?.options?.data?.map((x) => x.value)?.[index];
      this._onChange(value);
    }
  }
}
