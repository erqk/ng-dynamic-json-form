import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import {
  ControlValueService,
  CustomControlComponent,
  PROPS_BINDING_INJECTORS,
  PropsBindingDirective,
} from 'ng-dynamic-json-form';
import { map } from 'rxjs';

@Component({
  selector: 'ui-material-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    PropsBindingDirective,
  ],
  providers: [
    {
      provide: PROPS_BINDING_INJECTORS,
      useValue: [MatSelect],
    },
  ],
  templateUrl: './ui-material-select.component.html',
  styles: [],
})
export class UiMaterialSelectComponent extends CustomControlComponent {
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
