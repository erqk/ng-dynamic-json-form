import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioGroup, MatRadioModule } from '@angular/material/radio';
import {
  ControlValueService,
  CustomControlComponent,
  PropsBindingDirective,
  providePropsBinding
} from 'ng-dynamic-json-form';
import { map } from 'rxjs';

@Component({
  selector: 'ui-material-radio',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatInputModule,
    PropsBindingDirective,
  ],
  providers: [
    providePropsBinding([
      {
        key: 'mat-radio-group',
        token: MatRadioGroup,
      },
    ]),
  ],
  templateUrl: './ui-material-radio.component.html',
  styles: [],
})
export class UiMaterialRadioComponent extends CustomControlComponent {
  private _controlValueService = inject(ControlValueService);
  override control = new UntypedFormControl('');

  override writeValue(obj: any): void {
    const value = this._controlValueService.getOptionsValue('stringified', obj);
    this.control.setValue(value);
  }

  override registerOnChange(fn: any): void {
    this.control.valueChanges
      .pipe(map((x) => this._controlValueService.getOptionsValue('parsed', x)))
      .subscribe(fn);
  }
}
