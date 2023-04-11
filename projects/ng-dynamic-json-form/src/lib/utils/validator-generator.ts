import { ValidatorFn, Validators } from '@angular/forms';
import { NgDynamicJsonFormValidatorConfig } from '../models/form-validator-config.model';

export function getValidators(
  input: NgDynamicJsonFormValidatorConfig[]
): ValidatorFn[] {
  return input.map((item) => {
    let result: ValidatorFn = Validators.nullValidator;

    switch (item.name) {
      case 'required':
        result = Validators.required;
        break;

      case 'email':
        result = Validators.pattern(/^[^@\s!(){}<>]+@[\w-]+(\.[A-Za-z]+)+$/);
        break;

      case 'regex':
        result = Validators.pattern(item.value);
        break;

      case 'min':
        result = Validators.min(item.value);
        break;

      case 'max':
        result = Validators.max(item.value);
        break;

      case 'minLength':
        result = Validators.minLength(item.value);
        break;

      case 'maxLength':
        result = Validators.maxLength(item.value);
        break;
    }

    return result;
  });
}
