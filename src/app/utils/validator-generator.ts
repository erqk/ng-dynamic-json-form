import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';

export function getValidators(input: string[]): ValidatorFn[] {
  const rangeValidator = (input: string): ValidatorFn => {
    const splitted = input.split(':');
    if (!splitted.length) return Validators.nullValidator;

    const key = splitted[0];
    const value = parseInt(splitted[1]);

    switch (key) {
      case 'min':
        return Validators.min(value);

      case 'max':
        return Validators.max(value);

      case 'minLength':
        return Validators.minLength(value);

      case 'maxLength':
        return Validators.maxLength(value);

      default:
        return Validators.nullValidator;
    }
  };

  return input.map((item) => {
    let result: any = Validators.nullValidator;

    switch (item) {
      case 'required':
        result = Validators.required;
        break;

      case 'email':
        result = Validators.pattern(/^[^@\s!(){}<>]+@[\w-]+(\.[A-Za-z]+)+$/);
        break;

      default:
        if (item.includes('regex:')) {
          result = Validators.pattern(item.replace('regex:', ''));
        } else if (item.includes(':')) {
          result = rangeValidator(item);
        } else {
          result = Validators.nullValidator;
        }
        break;
    }

    return result;
  });
}
