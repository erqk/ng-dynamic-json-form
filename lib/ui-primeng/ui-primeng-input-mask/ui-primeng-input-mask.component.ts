import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IMaskDirective } from 'angular-imask';
import {
  CustomControlComponent,
  ImaskValuePatchDirective,
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
    ImaskValuePatchDirective,
    PropsBindingDirective,
  ],
  templateUrl: './ui-primeng-input-mask.component.html',
  providers: [
    providePropsBinding([
      {
        key: 'p-input-text',
        token: InputText,
      },
      {
        key: 'imask',
        token: IMaskDirective,
      },
    ]),
  ],
  styles: [],
})
export class UiPrimengInputMaskComponent extends CustomControlComponent {
  @ViewChild(InputText) target?: InputText;
  override control = new FormControl('');
  onChange?: any;

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }
}
