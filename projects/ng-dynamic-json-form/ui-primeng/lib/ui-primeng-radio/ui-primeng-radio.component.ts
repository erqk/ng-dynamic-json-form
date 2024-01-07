import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import {
  CustomControlComponent,
  PROPERTY_BINDING_INJECTOR,
  PropertyBindingDirective,
} from 'ng-dynamic-json-form';
import { RadioButton, RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'ui-primeng-radio',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RadioButtonModule,
    PropertyBindingDirective,
  ],
  providers: [
    {
      provide: PROPERTY_BINDING_INJECTOR,
      useValue: RadioButton,
    },
  ],
  templateUrl: './ui-primeng-radio.component.html',
  styles: [],
})
export class UiPrimengRadioComponent extends CustomControlComponent {
  override control = new UntypedFormControl('');
}
