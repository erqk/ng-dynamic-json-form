import { Injectable } from '@angular/core';
import {
  ValidatorFn,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ValidatorAndConditionTypes } from '../enums/validator-and-condition-types.enum';
import { ValidatorConfig } from '../models';

@Injectable()
export class FormValidatorService {
  customValidators: { [key: string]: ValidatorFn } = {};

  getValidators(input: ValidatorConfig[]): ValidatorFn[] {
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
          validator = CustomValidators.emailValidator;
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

class CustomValidators {
  static emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailValid = RegExp(/^[^@\s!(){}<>]+@[\w-]+(\.[A-Za-z]+)+$/).test(
      control.value
    );

    if (!control.value) {
      return null;
    }

    return emailValid ? null : { email: 'Invalid email format' };
  }

  static minValidator(value: number): ValidatorFn {
    return (control: AbstractControl) =>
      CustomValidators.minMaxValidator(value, 'min', control);
  }

  static maxValidator(value: number): ValidatorFn {
    return (control: AbstractControl) =>
      CustomValidators.minMaxValidator(value, 'max', control);
  }

  static minMaxValidator(
    value: any,
    type: 'min' | 'max',
    control: AbstractControl
  ): ValidationErrors | null {
    const valueParsed =
      typeof control.value === 'number'
        ? control.value
        : parseFloat(control.value);

    if (!valueParsed) return null;

    const condition =
      type === 'min' ? valueParsed >= value : valueParsed <= value;

    return condition
      ? null
      : {
          [type]: {
            actual: valueParsed,
            [type]: value,
          },
        };
  }
}
