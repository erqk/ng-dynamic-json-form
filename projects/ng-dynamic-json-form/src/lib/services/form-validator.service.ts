import { Injectable } from '@angular/core';
import {
  ValidatorFn,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ValidatorAndConditionTypes } from '../enums/validator-and-condition-types.enum';
import { NgDynamicJsonFormValidatorConfig } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FormValidatorService {
  customValidators: { [key: string]: ValidatorFn } = {};

  getValidators(input: NgDynamicJsonFormValidatorConfig[]): ValidatorFn[] {
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
          validator =
            this.customValidators[item.value] || Validators.nullValidator;
          break;
      }

      return validator;
    });
  }
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
