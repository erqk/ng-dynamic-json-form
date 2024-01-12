import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  PROPS_BINDING_INJECTORS,
  PropsBindingDirective,
} from 'ng-dynamic-json-form';
import {
  Checkbox,
  CheckboxChangeEvent,
  CheckboxModule,
} from 'primeng/checkbox';

@Component({
  selector: 'ui-primeng-checkbox',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    PropsBindingDirective,
  ],
  providers: [
    {
      provide: PROPS_BINDING_INJECTORS,
      useValue: [Checkbox],
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
