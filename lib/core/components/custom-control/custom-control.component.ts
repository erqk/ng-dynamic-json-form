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

  writeValue(obj: any): void {
    this.control?.patchValue(this._internal_mapData('input', obj));
  }

  registerOnChange(fn: any): void {
    this.control?.valueChanges
      .pipe(map((x) => this._internal_mapData('output', x)))
      .subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    return;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control?.disable() : this.control?.enable();
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.control?.errors ?? null;
  }

  markAsDirty: AbstractControl['markAsDirty'] = (args) => {
    this.control?.markAsDirty(args);
  };

  markAsTouched: AbstractControl['markAsTouched'] = (args) => {
    this.control?.markAsTouched(args);
  };

  setErrors: AbstractControl['setErrors'] = (args) => {
    this.control?.setErrors(args);
  };

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
}
