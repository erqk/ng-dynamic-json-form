import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatCheckbox,
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import {
  ControlValueService,
  CustomControlComponent,
  PropsBindingDirective,
  providePropsBinding,
} from 'ng-dynamic-json-form';
import { map } from 'rxjs';

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
  private _controlValueService = inject(ControlValueService);
  override control = new FormControl<any | any[]>('');

  override writeValue(obj: any): void {
    const value =
      this.data?.options?.data?.length === 1
        ? obj
        : this._controlValueService.getOptionsValue('stringified', obj);

    this.control.setValue(value);
  }

  override registerOnChange(fn: any): void {
    this.control.valueChanges
      .pipe(map((x) => this._controlValueService.getOptionsValue('parsed', x)))
      .subscribe(fn);
  }

  onCheckboxChange(e: MatCheckboxChange): void {
    const oldValue = Array.isArray(this.control.value)
      ? this.control.value || []
      : [];

    const removeItem = !e.checked || oldValue.includes(e.source.value);
    const newValue = removeItem
      ? oldValue.filter((x: any) => x !== e.source.value)
      : [...oldValue, e.source.value];

    this.control?.setValue(newValue);
  }
}
