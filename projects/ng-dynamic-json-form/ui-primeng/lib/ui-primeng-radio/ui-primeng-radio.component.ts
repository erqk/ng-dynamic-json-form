import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import {
  CustomControlComponent,
  PROPS_BINDING_INJECTORS,
  PropsBindingDirective,
} from 'ng-dynamic-json-form';
import { RadioButton, RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'ui-primeng-radio',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RadioButtonModule,
    PropsBindingDirective,
  ],
  providers: [
    {
      provide: PROPS_BINDING_INJECTORS,
      useValue: [RadioButton],
    },
  ],
  templateUrl: './ui-primeng-radio.component.html',
  styles: [],
})
export class UiPrimengRadioComponent extends CustomControlComponent {
  override control = new UntypedFormControl('');
}
