import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  Checkbox,
  CheckboxChangeEvent,
  CheckboxModule,
} from 'primeng/checkbox';
import {
  CustomControlComponent,
  PROPERTY_BINDING_INJECTOR,
  PropertyBindingDirective,
} from 'ng-dynamic-json-form';

@Component({
  selector: 'ui-primeng-checkbox',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    PropertyBindingDirective,
  ],
  providers: [
    {
      provide: PROPERTY_BINDING_INJECTOR,
      useValue: Checkbox,
    },
  ],
  templateUrl: './ui-primeng-checkbox.component.html',
  styles: [],
})
export class UiPrimengCheckboxComponent extends CustomControlComponent {
  override control = new FormControl<any | any[]>('');
  selectedItems: any[] = [];

  override writeValue(obj: any): void {
    if (Array.isArray(obj)) this.selectedItems = [...obj];
    this.control.setValue(obj);
  }

  onChanged(e: CheckboxChangeEvent): void {
    const selectedItems: any[] = e.checked;
    this.control.setValue(selectedItems);
  }
}
