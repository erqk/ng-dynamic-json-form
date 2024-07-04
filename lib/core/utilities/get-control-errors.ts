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
  control: AbstractControl | undefined,
  parentErrors?: ValidationErrors | null
): ValidationErrors | null {
  if (!control) {
    return null;
  }

  if (isFormControl(control)) {
    return control.errors;
  }

  if (isFormGroup(control)) {
    const _parentErrors = parentErrors
      ? window.structuredClone(parentErrors)
      : null;

    const result = Object.keys(control.controls).reduce((acc, key) => {
      const err = getControlErrors(control.controls[key], _parentErrors);
      return err ? { ...acc, [key]: err } : acc;
    }, {});

    return !Object.keys(result).length ? null : result;
  }

  return null;
}
