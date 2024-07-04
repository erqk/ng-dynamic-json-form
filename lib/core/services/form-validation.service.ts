import { Injectable, inject } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { EMPTY, Observable, map, startWith } from 'rxjs';
import { ValidatorConfig, ValidatorsEnum } from '../models';
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
  [key in ValidatorsEnum]?: ValidatorFn;
} => ({
  [ValidatorsEnum.required]: Validators.required,
  [ValidatorsEnum.requiredTrue]: Validators.requiredTrue,
  [ValidatorsEnum.email]: emailValidator,
  [ValidatorsEnum.pattern]: Validators.pattern(value),
  [ValidatorsEnum.min]: Validators.min(value),
  [ValidatorsEnum.max]: Validators.max(value),
  [ValidatorsEnum.minLength]: Validators.minLength(value),
  [ValidatorsEnum.maxLength]: Validators.maxLength(value),
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
          case ValidatorsEnum.pattern:
            return value instanceof RegExp
              ? value
              : new RegExp(value, item.flags);

          case ValidatorsEnum.min:
          case ValidatorsEnum.max:
          case ValidatorsEnum.minLength:
          case ValidatorsEnum.maxLength:
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
        builtInValidators(_value())[name as ValidatorsEnum] ??
        this._globalVariableService.customValidators?.[name] ??
        Validators.nullValidator;

      return validator;
    });
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
    const valueKey: { [key in ValidatorsEnum]?: string } = {
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

        const targetKey = valueKey[x.name as ValidatorsEnum] ?? '';
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
