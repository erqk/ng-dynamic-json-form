import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  PROPS_BINDING_INJECTORS,
  PropsBindingDirective,
} from 'ng-dynamic-json-form';
import { InputTextarea, InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'ui-primeng-textarea',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextareaModule,
    PropsBindingDirective,
  ],
  providers: [
    {
      provide: PROPS_BINDING_INJECTORS,
      useValue: [
        {
          key: 'p-input-textarea',
          token: InputTextarea,
        },
      ],
    },
  ],
  templateUrl: './ui-primeng-textarea.component.html',
  styles: [],
})
export class UiPrimengTextareaComponent extends CustomControlComponent {
  override control = new FormControl('');
}
