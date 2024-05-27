import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  PropsBindingDirective,
  providePropsBinding,
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
    providePropsBinding([
      {
        key: 'p-input-switch',
        token: InputSwitch,
      },
    ]),
  ],
  templateUrl: './ui-primeng-switch.component.html',
  styles: [],
})
export class UiPrimengSwitchComponent extends CustomControlComponent {
  override control = new FormControl(false);
}
