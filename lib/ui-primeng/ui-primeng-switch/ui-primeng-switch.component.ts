import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  PROPS_BINDING_INJECTORS,
  PropsBindingDirective,
} from 'ng-dynamic-json-form';
import { InputSwitch, InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'ui-primeng-switch',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputSwitchModule,
    PropsBindingDirective,
  ],
  providers: [
    {
      provide: PROPS_BINDING_INJECTORS,
      useValue: [
        {
          key: 'p-input-switch',
          token: InputSwitch,
        },
      ],
    },
  ],
  templateUrl: './ui-primeng-switch.component.html',
  styles: [],
})
export class UiPrimengSwitchComponent extends CustomControlComponent {
  override control = new FormControl(false);
}
