import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function textareaMaxLengthValidator(maxLength: number): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    const value = c.value;
    if (typeof value !== 'string' || !value) {
      return null;
    }

    const valueNoLineBreak = value.replaceAll(/\n/g, '');
    if (valueNoLineBreak.length <= maxLength) {
      return null;
    }

    return {
      maxLength: `The characters should not exceeds ${maxLength}.`,
    };
  };
}
