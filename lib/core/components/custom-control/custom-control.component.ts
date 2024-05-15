import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { map } from 'rxjs/operators';
import { FormControlConfig, OptionItem } from '../../models';
import { ControlValueService } from '../../services';

@Component({
  selector: 'custom-control',
  template: ``,
  standalone: true,
})
export class CustomControlComponent implements ControlValueAccessor, Validator {
  private _internal_controlValueService = inject(ControlValueService, {
    optional: true,
  });

  /**Must assign it with instance of `AbstractControl`
   * @example
   * override control = new FormControl() 'or' new UntypedFormControl();
   * override control = new FormGroup() 'or' new UntypedFormGroup();
   * override control = new FormArray() 'or' new UntypedFormArray();
   */
  public control?: AbstractControl;
  public data?: FormControlConfig;

  public onTouched = () => {};

  writeValue(obj: any): void {
    this._internal_control.patchValue(this._internal_mapData('input', obj));
  }

  registerOnChange(fn: any): void {
    this._internal_control.valueChanges
      .pipe(map((x) => this._internal_mapData('output', x)))
      .subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled
      ? this._internal_control.disable()
      : this._internal_control.enable();
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this._internal_control?.errors;
  }

  onOptionsGet(data: OptionItem[]): void {
    if (!this.data || !this.data.options) {
      return;
    }

    this.data.options.data = data;
  }

  /**@internal */
  private _internal_mapData(type: 'input' | 'output', data: unknown) {
    const service = this._internal_controlValueService;
    if (!service) return data;

    return service.mapData(type, data, this.data);
  }

  /**@internal */
  private get _internal_control(): AbstractControl {
    if (!this.control || !(this.control instanceof AbstractControl)) {
      throw {
        message: `The component extends CustomControlComponent but control is not defined`,
        component: this,
      };
    }

    return this.control;
  }
}
