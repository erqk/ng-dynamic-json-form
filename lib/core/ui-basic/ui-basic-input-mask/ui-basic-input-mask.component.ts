import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IMaskDirective } from 'angular-imask';
import { CustomControlComponent } from '../../components/custom-control/custom-control.component';
import {
  ImaskValuePatchDirective,
  PropsBindingDirective,
} from '../../directives';
import { providePropsBinding } from '../../providers/props-binding.provider';
@Component({
    selector: 'ui-basic-input-mask',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IMaskDirective,
        ImaskValuePatchDirective,
        PropsBindingDirective,
    ],
    providers: [
        providePropsBinding([
            {
                key: 'imask',
                token: IMaskDirective,
            },
        ]),
    ],
    templateUrl: './ui-basic-input-mask.component.html',
    styles: [],
    host: {
        class: 'ui-basic',
    }
})
export class UiBasicInputMaskComponent extends CustomControlComponent {
  override control = new FormControl('');

  onChange?: any;

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }
}
