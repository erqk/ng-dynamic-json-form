import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import {
  CustomControlComponent,
  PROPERTY_BINDING_INJECTOR,
  PropertyBindingDirective,
} from 'ng-dynamic-json-form';
import { Dropdown, DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'ui-primeng-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    PropertyBindingDirective,
  ],
  providers: [
    {
      provide: PROPERTY_BINDING_INJECTOR,
      useValue: Dropdown,
    },
  ],
  templateUrl: './ui-primeng-select.component.html',
  styles: [],
})
export class UiPrimengSelectComponent extends CustomControlComponent {
  override control = new UntypedFormControl('');
}
