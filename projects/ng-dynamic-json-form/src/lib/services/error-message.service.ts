import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { map, startWith } from 'rxjs/operators';
import { ValidatorAndConditionTypes } from '../enums/validator-and-condition-types.enum';
import { ValidatorConfig } from '../models';

@Injectable()
export class ErrorMessageService {
  getErrors$(
    control: AbstractControl,
    validatorConfigs: ValidatorConfig[]
  ): Observable<string[]> {
    if (!control) return of([]);

    return control.valueChanges.pipe(
      startWith(control.value),
      map(() => this.parseErrorMessage(control, validatorConfigs))
    );
  }

  private parseErrorMessage(
    control: AbstractControl,
    validatorConfigs: ValidatorConfig[]
  ): string[] {
    const errors = control.errors;
    if (!errors) return [];

    return Object.keys(errors!).reduce((acc, key) => {
      switch (key.toLowerCase()) {
        case ValidatorAndConditionTypes.REQUIRED.toLowerCase():
        case ValidatorAndConditionTypes.REQUIRED_TRUE.toLowerCase():
        case ValidatorAndConditionTypes.MIN.toLowerCase():
        case ValidatorAndConditionTypes.MAX.toLowerCase():
        case ValidatorAndConditionTypes.MIN_LENGTH.toLowerCase():
        case ValidatorAndConditionTypes.MAX_LENGTH.toLowerCase():
        case ValidatorAndConditionTypes.PATTERN.toLowerCase():
        case ValidatorAndConditionTypes.EMAIL.toLowerCase():
          const customErrorMessage = validatorConfigs
            ?.find((x) => x.name.toLowerCase() === key)
            ?.message?.replace(/{{value}}/g, control.value || '');

          acc.push(
            customErrorMessage ?? JSON.stringify({ [key]: errors![key] })
          );
          break;

        // The validator name is outside the range above, meaning this is a custom validator
        // So we extract the message from ValidatorErrors keyValue pair
        default:
          acc.push(errors![key]);
          break;
      }

      return acc;
    }, [] as string[]);
  }
}
