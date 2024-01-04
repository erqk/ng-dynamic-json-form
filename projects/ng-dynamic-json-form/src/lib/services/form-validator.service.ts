import { Injectable } from '@angular/core';
import {
  ValidatorFn,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ValidatorAndConditionEnum } from '../models/validator-and-condition.enum';
import { ValidatorConfig } from '../models';

@Injectable()
export class FormValidatorService {
  customValidators?: { [key: string]: ValidatorFn };

  getValidators(input: ValidatorConfig[]): ValidatorFn[] {
    if (!this.customValidators) return [];

    return input.map((item) => {
      let validator: ValidatorFn = Validators.nullValidator;

      switch (item.name) {
        case ValidatorAndConditionEnum.required:
          validator = Validators.required;
          break;

        case ValidatorAndConditionEnum.requiredTrue:
          validator = Validators.requiredTrue;
          break;

        case ValidatorAndConditionEnum.email:
          validator = CustomValidators.emailValidator;
          break;

        case ValidatorAndConditionEnum.pattern:
          validator = Validators.pattern(item.value);
          break;

        case ValidatorAndConditionEnum.min:
          validator = Validators.min(item.value);
          break;

        case ValidatorAndConditionEnum.max:
          validator = Validators.max(item.value);
          break;

        case ValidatorAndConditionEnum.minLength:
          validator = Validators.minLength(item.value);
          break;

        case ValidatorAndConditionEnum.maxLength:
          validator = Validators.maxLength(item.value);
          break;

        case ValidatorAndConditionEnum.custom:
          validator =
            this.customValidators?.[item.value] || Validators.nullValidator;
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
