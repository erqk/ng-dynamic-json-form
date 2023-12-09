import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CustomControlComponent,
  NgxMaskConfigBindingDirective,
} from 'ng-dynamic-json-form';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'ui-primeng-input-mask',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    NgxMaskDirective,
    NgxMaskConfigBindingDirective,
  ],
  templateUrl: './ui-primeng-input-mask.component.html',
  styles: [],
  providers: [provideNgxMask()],
})
export class UiPrimengInputMaskComponent extends CustomControlComponent {
  override control = new FormControl('');
}
