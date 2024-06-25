import { Component } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { FormControlConfig, OptionItem } from '../../models';

@Component({
  selector: 'custom-control',
  template: ``,
  standalone: true,
})
export class CustomControlComponent implements ControlValueAccessor, Validator {
  /**Must assign it with instance of `AbstractControl`
   * @example
   * override control = new FormControl() 'or' new UntypedFormControl();
   * override control = new FormGroup() 'or' new UntypedFormGroup();
   * override control = new FormArray() 'or' new UntypedFormArray();
   */
  public control?: AbstractControl;
  public data?: FormControlConfig;

  writeValue(obj: any): void {
    this.control?.patchValue(obj);
  }

  registerOnChange(fn: any): void {
    this.control?.valueChanges.subscribe(fn);
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

  markAsDirty(): void {}

  markAsTouched(): void {}

  setErrors(errors: ValidationErrors | null): void {}

  onOptionsGet(data: OptionItem[]): void {
    if (!this.data || !this.data.options) {
      return;
    }

    this.data.options.data = data;
  }
}
