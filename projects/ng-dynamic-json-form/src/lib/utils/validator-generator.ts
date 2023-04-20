import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NgDynamicJsonFormValidatorConfig } from '../models/form-validator-config.model';
import { ValidatorAndConditionTypes } from '../enums/validator-and-condition-types.enum';

export function getValidators(
  input: NgDynamicJsonFormValidatorConfig[],
  customValidators: { [key: string]: ValidatorFn } = {}
): ValidatorFn[] {
  return input.map((item) => {
    let validator: ValidatorFn = Validators.nullValidator;

    switch (item.name) {
      case ValidatorAndConditionTypes.REQUIRED:
        validator = Validators.required;
        break;

      case ValidatorAndConditionTypes.REQUIRED_TRUE:
        validator = Validators.requiredTrue;
        break;

      case ValidatorAndConditionTypes.EMAIL:
        validator = emailValidator;
        break;

      case ValidatorAndConditionTypes.PATTERN:
        validator = Validators.pattern(item.value);
        break;

      case ValidatorAndConditionTypes.MIN:
        validator = Validators.min(item.value);
        break;

      case ValidatorAndConditionTypes.MAX:
        validator = Validators.max(item.value);
        break;

      case ValidatorAndConditionTypes.MIN_LENGTH:
        validator = Validators.minLength(item.value);
        break;

      case ValidatorAndConditionTypes.MAX_LENGTH:
        validator = Validators.maxLength(item.value);
        break;

      case ValidatorAndConditionTypes.CUSTOM:
        validator = customValidators[item.value] || Validators.nullValidator;
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
