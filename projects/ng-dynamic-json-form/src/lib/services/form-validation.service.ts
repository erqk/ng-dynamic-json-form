import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
  isFormArray,
  isFormControl,
  isFormGroup,
} from '@angular/forms';
import { Observable, debounceTime, startWith, tap } from 'rxjs';
import { ValidatorConfig } from '../models';
import { ValidatorAndConditionEnum } from '../models/validator-and-condition.enum';
import { clearEmpties } from '../utilities/clear-empties';

function emailValidator(control: AbstractControl): ValidationErrors | null {
  const emailValid = RegExp(/^[^@\s!(){}<>]+@[\w-]+(\.[A-Za-z]+)+$/).test(
    control.value
  );

  if (!control.value) {
    return null;
  }

  return emailValid ? null : { email: 'Invalid email format' };
}

@Injectable()
export class FormValidationService {
  customValidators?: { [key: string]: ValidatorFn };

  formErrorEvent$(form: FormGroup): Observable<any> {
    return form.statusChanges.pipe(
      startWith(form.status),
      debounceTime(0),
      tap(() => {
        const errors = this._getFormErrors(form);
        form.setErrors(errors);
      })
    );
  }

  /**Get the error messages of the control */
  getErrorMessages(
    controlErrors: ValidationErrors | null,
    controlValue: any,
    validatorConfigs: ValidatorConfig[]
  ): string[] {
    if (!controlErrors) return [];

    return Object.keys(controlErrors).reduce((acc, key) => {
      const config = validatorConfigs.find((x) => x.name.toLowerCase() === key);
      const error = controlErrors[key];
      const errorStringified =
        typeof error === 'string' ? error : JSON.stringify(error);
      const customMessage = config?.message?.replace(
        /{{value}}/g,
        controlValue || ''
      );

      acc.push(customMessage || errorStringified);
      return acc;
    }, [] as string[]);
  }

  getValidators(input: ValidatorConfig[]): ValidatorFn[] {
    if (!this.customValidators) return [];

    return input.map((item) => {
      const { name, value } = item;
      let validator: ValidatorFn = Validators.nullValidator;

      switch (item.name) {
        case ValidatorAndConditionEnum.required:
          validator = Validators.required;
          break;

        case ValidatorAndConditionEnum.requiredTrue:
          validator = Validators.requiredTrue;
          break;

        case ValidatorAndConditionEnum.email:
          validator = emailValidator;
          break;

        case ValidatorAndConditionEnum.pattern:
          validator = Validators.pattern(value);
          break;

        case ValidatorAndConditionEnum.min:
          validator = Validators.min(value);
          break;

        case ValidatorAndConditionEnum.max:
          validator = Validators.max(value);
          break;

        case ValidatorAndConditionEnum.minLength:
          validator = Validators.minLength(value);
          break;

        case ValidatorAndConditionEnum.maxLength:
          validator = Validators.maxLength(value);
          break;

        default:
          validator = this.customValidators?.[name] || Validators.nullValidator;
          break;
      }

      return validator;
    });
  }

  /**Get all the errors under this `FormGroup` following the hierachy
   * @example
   * root: {
   *  control1: ValidationErrors,
   *  control2: {
   *    childA: ValidationErrors
   *  }
   * }
   */
  private _getFormErrors(
    control: AbstractControl,
    prevResult?: ValidationErrors | null
  ): ValidationErrors | null {
    const controlErrors = control.errors;
    let result = prevResult ? { ...prevResult } : null;
    let errorsGet = null;

    if (isFormControl(control)) {
      errorsGet = controlErrors;
    }

    if (isFormGroup(control)) {
      errorsGet = Object.keys(control.controls).reduce((acc, key) => {
        const err = this._getFormErrors(control.controls[key], result);
        return err ? { ...acc, [key]: err } : acc;
      }, {});
    }

    if (isFormArray(control)) {
      const childrenErrors = control.controls
        .map((x) => this._getFormErrors(x, result))
        .filter((x) => !!x);

      errorsGet = {
        ...controlErrors,
        ...childrenErrors,
      };
    }

    result = clearEmpties({ ...result, ...errorsGet });

    const noErrors = !result || !Object.keys(result).length;
    return noErrors ? null : result;
  }
}
