import { AbstractControl, ValidationErrors } from '@angular/forms';

export function firstUppercaseValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (typeof control.value !== 'string') return null;
  if (!control.value.length) return null;

  return RegExp(/[A-Z]/).test(control.value[0])
    ? null
    : { errors: 'Make sure your first letter is uppercase' };
}
