import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  PROPS_BINDING_INJECTORS,
  PropsBindingDirective,
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
    PropsBindingDirective,
  ],
  providers: [
    provideNgxMask(),
    {
      provide: PROPS_BINDING_INJECTORS,
      useValue: [InputText, NgxMaskDirective],
    },
  ],
  templateUrl: './ui-primeng-input-mask.component.html',
  styles: [],
})
export class UiPrimengInputMaskComponent extends CustomControlComponent {
  @ViewChild(InputText) target?: InputText;
  override control = new FormControl('');
}
