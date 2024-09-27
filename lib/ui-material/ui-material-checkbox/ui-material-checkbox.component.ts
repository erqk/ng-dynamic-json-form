import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatCheckbox,
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import {
  CustomControlComponent,
  PropsBindingDirective,
  providePropsBinding,
} from 'ng-dynamic-json-form';

@Component({
  selector: 'ui-material-checkbox',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    PropsBindingDirective,
  ],
  providers: [
    providePropsBinding([
      {
        key: 'mat-checkbox',
        token: MatCheckbox,
      },
    ]),
  ],
  templateUrl: './ui-material-checkbox.component.html',
  styles: [],
})
export class UiMaterialCheckboxComponent extends CustomControlComponent {
  private _onChange?: any;

  override control = new FormArray<FormControl>([]);

  override writeValue(obj: any): void {
    this.control.clear();

    if (Array.isArray(obj)) {
      obj.forEach((x) => this._addItem(x));
    }
  }

  override registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  toggle(e: MatCheckboxChange): void {
    const checked = e.checked;
    this._onChange(checked);
  }

  onCheckboxChange(e: MatCheckboxChange, index: number): void {
    const checked = e.checked;
    const value = this.data?.options?.data
      ?.map((x) => x.value)
      .filter((val, i) => (i === index ? checked : this.isChecked(val)));

    this.control.clear();
    value?.forEach((x) => this._addItem(x));
    this._onChange(this.control.value);
  }

  isChecked(val: any): boolean {
    return this.control.value.some(
      (x) => JSON.stringify(x) === JSON.stringify(val)
    );
  }

  get groupButtonsStyles(): string {
    return `
      flex-direction: ${this.data?.options?.layout ?? 'row'};
      align-items: flex-start;
      ${this.data?.options?.containerStyles ?? ''}
    `.replace(/\s{2,}/g, '');
  }

  private _addItem(val?: any): void {
    const control = new FormControl(val);
    this.control.push(control);
  }
}
