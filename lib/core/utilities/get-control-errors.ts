import {
  AbstractControl,
  ValidationErrors,
  isFormControl,
  isFormGroup,
} from '@angular/forms';

/**Get all the errors in the AbstractControl recursively
 * @example
 * root: {
 *  control1: ValidationErrors,
 *  control2: {
 *    childA: ValidationErrors
 *  }
 * }
 */
export function getControlErrors(
  control: AbstractControl | undefined
): ValidationErrors | null {
  if (!control) {
    return null;
  }

  if (isFormControl(control)) {
    return control.errors;
  }

  if (isFormGroup(control)) {
    const result = Object.keys(control.controls).reduce((acc, key) => {
      const childControl = control.controls[key];
      const err = getControlErrors(childControl);

      return err ? { ...acc, [key]: err } : acc;
    }, {});

    return !Object.keys(result).length ? null : result;
  }

  return null;
}
