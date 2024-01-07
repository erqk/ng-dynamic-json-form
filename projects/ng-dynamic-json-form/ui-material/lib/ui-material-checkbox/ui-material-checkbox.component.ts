import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatCheckbox,
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import {
  CustomControlComponent,
  PROPERTY_BINDING_INJECTOR,
  PropertyBindingDirective,
} from 'ng-dynamic-json-form';

@Component({
  selector: 'ui-material-checkbox',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    PropertyBindingDirective,
  ],
  providers: [
    {
      provide: PROPERTY_BINDING_INJECTOR,
      useValue: MatCheckbox,
    },
  ],
  templateUrl: './ui-material-checkbox.component.html',
  styles: [],
})
export class UiMaterialCheckboxComponent extends CustomControlComponent {
  override control = new FormControl<any | any[]>('');

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
