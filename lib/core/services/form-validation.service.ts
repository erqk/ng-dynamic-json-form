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
} =>
  ({
    [ValidatorsEnum.required]: Validators.required,
    [ValidatorsEnum.requiredTrue]: Validators.requiredTrue,
    [ValidatorsEnum.email]: emailValidator,
    [ValidatorsEnum.pattern]: Validators.pattern(value),
    [ValidatorsEnum.min]: Validators.min(value),
    [ValidatorsEnum.max]: Validators.max(value),
    [ValidatorsEnum.minLength]: Validators.minLength(value),
    [ValidatorsEnum.maxLength]: Validators.maxLength(value),
  } as const);

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
    const customValidators = this._globalVariableService.customValidators;
    const getCustomValidator = (config: ValidatorConfig) => {
      const { name, value } = config;
      const validator = customValidators?.[name];

      if (!validator) {
        return null;
      }

      if (value === null || value === undefined) {
        return validator;
      }

      return validator(value) as ValidatorFn;
    };

    return input.map((item) => {
      const { name } = item;
      const value = this._getValidatorValue(item);
      const builtInValidator = builtInValidators(value)[name as ValidatorsEnum];
      const customValidator = getCustomValidator(item);

      const result =
        builtInValidator ?? customValidator ?? Validators.nullValidator;

      return result;
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
    if (!controlErrors) {
      return [];
    }

    const errorMessage = (error: any) => {
      return typeof error === 'string' ? error : JSON.stringify(error);
    };

    return Object.keys(controlErrors).reduce((acc, key) => {
      const error = controlErrors[key];
      const config = this._getConfigFromErrorKey(
        { [key]: error },
        validatorConfigs
      );

      const customMessage = config?.message?.replace(
        /{{value}}/g,
        controlValue || ''
      );

      acc.push(customMessage || errorMessage(error));
      return acc;
    }, [] as string[]);
  }

  private _getConfigFromErrorKey(
    error: { [key: string]: any },
    configs: ValidatorConfig[]
  ): ValidatorConfig | undefined {
    // The key mapping of the `ValidationErrors` with the `ValidatorConfig`,
    // to let us get the correct message by using `name` of `ValidatorConfig`.
    const valueKeyMapping: { [key in ValidatorsEnum]?: string } = {
      pattern: 'requiredPattern',
      min: 'min',
      max: 'max',
      minLength: 'requiredLength',
      maxLength: 'requiredLength',
    };

    const getValidatorValue = (v: any) => {
      return typeof v !== 'number' && !isNaN(v) ? parseFloat(v) : v;
    };

    const [errorKey, errorValue] = Object.entries(error)[0];
    const result = configs.find((item) => {
      const { name, value } = item;

      if (errorKey !== name.toLowerCase()) {
        return false;
      }

      if (value === undefined) {
        return true;
      }

      const targetKey = valueKeyMapping[name as ValidatorsEnum] ?? '';
      const requiredValue = errorValue[targetKey];
      const validatorValue = getValidatorValue(value);

      return requiredValue && name === 'pattern'
        ? requiredValue.includes(validatorValue)
        : requiredValue === validatorValue;
    });

    return result;
  }

  private _getValidatorValue(validatorConfig: ValidatorConfig) {
    const { name, value, flags } = validatorConfig;

    switch (name) {
      case ValidatorsEnum.pattern:
        return value instanceof RegExp ? value : new RegExp(value, flags);

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
  }
}
