import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  PROPS_BINDING_INJECTORS,
  PropsBindingDirective,
} from 'ng-dynamic-json-form';
import { Checkbox, CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'ui-primeng-checkbox',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckboxModule,
    PropsBindingDirective,
  ],
  providers: [
    {
      provide: PROPS_BINDING_INJECTORS,
      useValue: [
        {
          key: 'p-checkbox',
          token: Checkbox,
        },
      ],
    },
  ],
  templateUrl: './ui-primeng-checkbox.component.html',
  styles: [],
})
export class UiPrimengCheckboxComponent extends CustomControlComponent {
  override control = new FormControl<any | any[]>('');
}
