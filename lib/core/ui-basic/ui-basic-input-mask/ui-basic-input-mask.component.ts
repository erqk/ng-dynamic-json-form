import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import {
  CustomControlComponent,
  PROPS_BINDING_INJECTORS,
  PropsBindingDirective,
} from '../../../public-api';

@Component({
  selector: 'ui-basic-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    PropsBindingDirective,
  ],
  templateUrl: './ui-basic-input-mask.component.html',
  providers: [
    provideNgxMask(),
    {
      provide: PROPS_BINDING_INJECTORS,
      useValue: [NgxMaskDirective],
    },
  ],
  styles: [],
})
export class UiBasicInputMaskComponent extends CustomControlComponent {
  @HostBinding('class') hostClass = 'ui-basic';
  override control = new FormControl('');
}
