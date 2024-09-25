import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import {
  ControlValueService,
  CustomControlComponent,
  PropsBindingDirective,
  providePropsBinding,
} from 'ng-dynamic-json-form';
import { RadioButton, RadioButtonModule } from 'primeng/radiobutton';
import { filter, map } from 'rxjs';

@Component({
  selector: 'ui-primeng-radio',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RadioButtonModule,
    PropsBindingDirective,
  ],
  providers: [
    providePropsBinding([
      {
        key: 'p-radio-button',
        token: RadioButton,
      },
    ]),
  ],
  templateUrl: './ui-primeng-radio.component.html',
  styles: [],
})
export class UiPrimengRadioComponent extends CustomControlComponent {
  private _controlValueService = inject(ControlValueService);
  override control = new UntypedFormControl('');

  override writeValue(obj: any): void {
    const value = this._controlValueService.getOptionsValue('stringified', obj);
    this.control.setValue(value);
  }

  override registerOnChange(fn: any): void {
    this.control.valueChanges
      .pipe(
        filter(() => this.userInteracted),
        map((x) => this._controlValueService.getOptionsValue('parsed', x))
      )
      .subscribe(fn);
  }
}
