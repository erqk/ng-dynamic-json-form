import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  PROPERTY_BINDING_INJECTOR,
  PropertyBindingDirective,
} from 'ng-dynamic-json-form';
import { InputSwitch, InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'ui-primeng-switch',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputSwitchModule,
    PropertyBindingDirective,
  ],
  providers: [
    {
      provide: PROPERTY_BINDING_INJECTOR,
      useValue: InputSwitch,
    },
  ],
  templateUrl: './ui-primeng-switch.component.html',
  styles: [],
})
export class UiPrimengSwitchComponent extends CustomControlComponent {
  override control = new FormControl(false);
}
