import { Component, HostListener } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  UntypedFormGroup,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { filter } from 'rxjs';
import { FormControlConfig, OptionItem } from '../../models';
import { getControlErrors } from '../../utilities/get-control-errors';

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
  public hostForm?: UntypedFormGroup;
  public data?: FormControlConfig;
  public hideErrorMessage?: boolean;
  public userInteracted = false;

  @HostListener('click', ['$event'])
  onClick(): void {
    this.userInteracted = true;
  }

  @HostListener('keydown', ['$event'])
  onKeydown(): void {
    this.userInteracted = true;
  }

  writeValue(obj: any): void {
    this.control?.patchValue(obj);
  }

  registerOnChange(fn: any): void {
    this.control?.valueChanges
      .pipe(filter(() => this.userInteracted || !!this.control?.dirty))
      .subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    return;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control?.disable() : this.control?.enable();
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return getControlErrors(this.control);
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
