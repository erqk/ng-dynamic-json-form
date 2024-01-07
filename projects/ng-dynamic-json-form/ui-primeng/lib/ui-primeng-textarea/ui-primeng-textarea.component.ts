import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  PROPERTY_BINDING_INJECTOR,
  PropertyBindingDirective,
} from 'ng-dynamic-json-form';
import { InputTextarea, InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'ui-primeng-textarea',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextareaModule,
    PropertyBindingDirective,
  ],
  providers: [
    {
      provide: PROPERTY_BINDING_INJECTOR,
      useValue: InputTextarea,
    },
  ],
  templateUrl: './ui-primeng-textarea.component.html',
  styles: [],
})
export class UiPrimengTextareaComponent extends CustomControlComponent {
  override control = new FormControl('');
}
