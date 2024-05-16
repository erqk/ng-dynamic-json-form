import { Injectable, inject } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
  isFormControl,
  isFormGroup,
} from '@angular/forms';
import { EMPTY, Observable, map, startWith } from 'rxjs';
import { ValidatorConfig } from '../models';
import { ValidatorAndConditionEnum } from '../models/validator-and-condition.enum';
import { clearEmpties } from '../utilities/clear-empties';
import { GlobalVariableService } from './global-variable.service';

function emailValidator(control: AbstractControl): ValidationErrors | null {
  const emailValid = RegExp(/^[^@\s!(){}<>]+@[\w-]+(\.[A-Za-z]+)+$/).test(
    control.value
  );

  if (!control.value) {
    return null;
  }

  return emailValid ? null : { email: 'Invalid email format' };
}

const builtInValidators = (
  value?: any
): {
  [key in ValidatorAndConditionEnum]?: ValidatorFn;
} => ({
  [ValidatorAndConditionEnum.required]: Validators.required,
  [ValidatorAndConditionEnum.requiredTrue]: Validators.requiredTrue,
  [ValidatorAndConditionEnum.email]: emailValidator,
  [ValidatorAndConditionEnum.pattern]: Validators.pattern(value),
  [ValidatorAndConditionEnum.min]: Validators.min(value),
  [ValidatorAndConditionEnum.max]: Validators.max(value),
  [ValidatorAndConditionEnum.minLength]: Validators.minLength(value),
  [ValidatorAndConditionEnum.maxLength]: Validators.maxLength(value),
});

@Injectable()
export class FormValidationService {
  private _globalVariableService = inject(GlobalVariableService);

  getErrorMessages$(
    control: AbstractControl | null | undefined,
    validators?: ValidatorConfig[]
  ): Observable<string[]> {
    if (!control || !validators?.length) {
      return EMPTY;
    }

    return control.statusChanges.pipe(
      startWith(control.status),
      map(() =>
        this._getErrorMessages(control.errors, control.value, validators)
      )
    );
  }

  getValidators(input: ValidatorConfig[]): ValidatorFn[] {
    return input.map((item) => {
      const { name, value } = item;
      const _value = () => {
        switch (name) {
          case ValidatorAndConditionEnum.pattern:
            return value instanceof RegExp
              ? value
              : new RegExp(value, item.flags);

          case ValidatorAndConditionEnum.min:
          case ValidatorAndConditionEnum.max:
          case ValidatorAndConditionEnum.minLength:
          case ValidatorAndConditionEnum.maxLength:
            try {
              return typeof value !== 'number' ? parseFloat(value) : value;
            } catch {
              break;
            }

          default:
            return value;
        }
      };

      const validator =
        builtInValidators(_value())[name as ValidatorAndConditionEnum] ??
        this._globalVariableService.customValidators?.[name] ??
        Validators.nullValidator;

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
  getFormErrors(
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
        const err = this.getFormErrors(control.controls[key], result);
        return err ? { ...acc, [key]: err } : acc;
      }, {});
    }

    result = clearEmpties({ ...result, ...errorsGet });

    const noErrors = !result || !Object.keys(result).length;
    return noErrors ? null : result;
  }

  /**Get the error messages of the control
   *
   * @description
   * Try to get the custom error message specified in the config first,
   * else use the error message in the `VadliationErrors`.
   *
   * To use custom message when using custom validator, match the key inside
   * `ValidationErrors` with the `name` inside config.
   */
  private _getErrorMessages(
    controlErrors: ValidationErrors | null,
    controlValue: any,
    validatorConfigs: ValidatorConfig[]
  ): string[] {
    if (!controlErrors) return [];

    // The key mapping of the `ValidationErrors` with the `ValidatorConfig`,
    // to let us get the correct message by using `name` of `ValidatorConfig`.
    const valueKey: { [key in ValidatorAndConditionEnum]?: string } = {
      pattern: 'requiredPattern',
      min: 'min',
      max: 'max',
      minLength: 'requiredLength',
      maxLength: 'requiredLength',
    };

    return Object.keys(controlErrors).reduce((acc, key) => {
      const config = validatorConfigs.find((x) => {
        const errorKey = x.name.toLowerCase();

        if (x.value === undefined) {
          return key === errorKey;
        }

        const targetKey = valueKey[x.name as ValidatorAndConditionEnum] ?? '';
        const requiredValue = controlErrors[key][targetKey];
        const requiredValueMatch =
          requiredValue && x.name === 'pattern'
            ? requiredValue.includes(x.value)
            : requiredValue === x.value;

        return requiredValueMatch && key === errorKey;
      });

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
}
