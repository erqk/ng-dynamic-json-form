import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IMaskDirective } from 'angular-imask';
import {
  CustomControlComponent,
  PropsBindingDirective,
  providePropsBinding,
} from 'ng-dynamic-json-form';
import { InputText, InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'ui-primeng-input-mask',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    IMaskDirective,
    PropsBindingDirective,
  ],
  templateUrl: './ui-primeng-input-mask.component.html',
  providers: [
    providePropsBinding([
      {
        key: 'p-input-text',
        token: InputText,
      },
    ]),
  ],
  styles: [],
})
export class UiPrimengInputMaskComponent extends CustomControlComponent {
  @ViewChild(InputText) target?: InputText;
  override control = new FormControl('');
}
