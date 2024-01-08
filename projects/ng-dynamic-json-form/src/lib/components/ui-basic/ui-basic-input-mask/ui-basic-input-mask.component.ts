import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import {
  NgxMaskBindingDirective,
  PropertyBindingDirective,
} from '../../../directives';
import { CustomControlComponent } from '../../custom-control/custom-control.component';

@Component({
  selector: 'ui-basic-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskBindingDirective,
    PropertyBindingDirective,
  ],
  templateUrl: './ui-basic-input-mask.component.html',
  providers: [provideNgxMask()],
  styles: [],
})
export class UiBasicInputMaskComponent extends CustomControlComponent {
  override control = new FormControl('');
}
