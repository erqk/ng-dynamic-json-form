
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { IMaskDirective } from 'angular-imask';
import {
  CustomControlComponent,
  ImaskValuePatchDirective,
  PropsBindingDirective,
  providePropsBinding,
} from 'ng-dynamic-json-form';

@Component({
    selector: 'ui-material-input-mask',
    imports: [
    ReactiveFormsModule,
    MatInputModule,
    IMaskDirective,
    ImaskValuePatchDirective,
    PropsBindingDirective
],
    templateUrl: './ui-material-input-mask.component.html',
    providers: [
        providePropsBinding([
            {
                key: 'mat-input',
                token: MatInput,
            },
            {
                key: 'imask',
                token: IMaskDirective,
            },
        ]),
    ],
    styles: []
})
export class UiMaterialInputMaskComponent extends CustomControlComponent {
  override control = new FormControl('');
  onChange?: any;

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }
}
