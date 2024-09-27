import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioGroup, MatRadioModule } from '@angular/material/radio';
import {
  CustomControlComponent,
  PropsBindingDirective,
  providePropsBinding,
} from 'ng-dynamic-json-form';

@Component({
  selector: 'ui-material-radio',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatInputModule,
    PropsBindingDirective,
  ],
  providers: [
    providePropsBinding([
      {
        key: 'mat-radio-group',
        token: MatRadioGroup,
      },
    ]),
  ],
  templateUrl: './ui-material-radio.component.html',
  styles: [],
})
export class UiMaterialRadioComponent extends CustomControlComponent {
  private _onChange?: any;

  override control = new UntypedFormControl('');
  selectedIndex = -1;

  override writeValue(obj: any): void {
    this.selectedIndex =
      this.data?.options?.data
        ?.map((x) => x.value)
        .findIndex((x) => JSON.stringify(x) === JSON.stringify(obj)) ?? -1;
  }

  override registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  onChange(i: number): void {
    const value = this.data?.options?.data?.[i].value;
    this._onChange(value);
  }
}
