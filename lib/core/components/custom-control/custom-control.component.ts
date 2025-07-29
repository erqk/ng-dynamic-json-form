import { Component, signal } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  UntypedFormGroup,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { FormControlConfig, OptionItem } from '../../models';
import { getControlErrors } from '../../utilities/get-control-errors';

@Component({
  selector: 'custom-control',
  template: ``,
  standalone: true,
})
export class CustomControlComponent implements ControlValueAccessor, Validator {
  /**
   * This control can be use to bind the UI of the custom component with the parent control.
   * Use this if you don't want to rewrite/override every methods in the CVA manually.
   *
   * Assign it with instance of `AbstractControl`
   *
   * ```
   * // FormControl
   * override control = new FormControl('');
   *
   * // FormGroup
   * override control = new FormGroup({
   *  controlA: new FormControl(...),
   *  controlB: new FormControl(...)
   * });
   * ```
   */
  control?: AbstractControl;

  hostForm = signal<UntypedFormGroup | undefined>(undefined);
  data = signal<FormControlConfig | undefined>(undefined);
  hideErrorMessage = signal<boolean | undefined>(undefined);

  writeValue(obj: any): void {
    this.control?.patchValue(obj);
  }

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control?.disable() : this.control?.enable();
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return getControlErrors(this.control);
  }

  markAsDirty(): void {}

  markAsPristine(): void {}

  markAsTouched(): void {}

  markAsUntouched(): void {}

  setErrors(errors: ValidationErrors | null): void {}

  onOptionsGet(options: OptionItem[]): void {
    const data = this.data();

    if (!data || !data.options) {
      return;
    }

    this.data.update((x) => {
      if (!x?.options) {
        return x;
      }

      x.options.data = [...options];

      return { ...x };
    });
  }
}
