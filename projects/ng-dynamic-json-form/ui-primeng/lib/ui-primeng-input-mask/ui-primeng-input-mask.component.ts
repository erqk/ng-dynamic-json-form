import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  NgxMaskBindingDirective,
  PROPERTY_BINDING_INJECTOR,
  PropertyBindingDirective,
} from 'ng-dynamic-json-form';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { InputText, InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'ui-primeng-input-mask',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    NgxMaskDirective,
    NgxMaskBindingDirective,
    PropertyBindingDirective,
  ],
  providers: [
    provideNgxMask(),
    {
      provide: PROPERTY_BINDING_INJECTOR,
      useClass: InputText,
    },
  ],
  templateUrl: './ui-primeng-input-mask.component.html',
  styles: [],
})
export class UiPrimengInputMaskComponent extends CustomControlComponent {
  override control = new FormControl('');
}
