import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function firstUppercaseValidator(): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    if (typeof c.value !== 'string') return null;
    if (!c.value.length) return null;

    return RegExp(/[A-Z]/).test(c.value[0])
      ? null
      : { uppercase: 'Make sure your first letter is uppercase' };
  };
}
