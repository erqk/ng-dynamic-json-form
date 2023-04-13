import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NgDynamicJsonFormValidatorConfig } from '../models/form-validator-config.model';

export function getValidators(
  input: NgDynamicJsonFormValidatorConfig[],
  customValidators: { [key: string]: ValidatorFn } = {}
): ValidatorFn[] {
  return input.map((item) => {
    let validator: ValidatorFn = Validators.nullValidator;

    switch (item.name) {
      case 'required':
        validator = Validators.required;
        break;

      case 'requiredTrue':
        validator = Validators.requiredTrue;
        break;

      case 'email':
        validator = emailValidator;
        break;

      case 'pattern':
        validator = Validators.pattern(item.value);
        break;

      case 'min':
        validator = Validators.min(item.value);
        break;

      case 'max':
        validator = Validators.max(item.value);
        break;

      case 'minLength':
        validator = Validators.minLength(item.value);
        break;

      case 'maxLength':
        validator = Validators.maxLength(item.value);
        break;

      case 'custom':
        validator = customValidators[item.value];
        break;
    }

    return validator;
  });
}

function emailValidator(control: AbstractControl): ValidationErrors | null {
  const emailValid = RegExp(/^[^@\s!(){}<>]+@[\w-]+(\.[A-Za-z]+)+$/).test(
    control.value
  );

  if (!control.value) {
    return null;
  }

  return emailValid ? null : { email: 'Invalid email format' };
}
