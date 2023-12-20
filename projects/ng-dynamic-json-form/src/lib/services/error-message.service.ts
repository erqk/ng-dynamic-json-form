import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ValidatorConfig } from '../models';
import { ValidatorAndConditionEnum } from '../models/validator-and-condition.enum';

@Injectable()
export class ErrorMessageService {
  getErrorMessages(
    errors: ValidationErrors | null,
    currentValue: any,
    validatorConfigs: ValidatorConfig[]
  ): string[] {
    if (!errors) return [];

    const validationTypes = Object.values(ValidatorAndConditionEnum)
      .filter(
        (x) =>
          x !== ValidatorAndConditionEnum.custom &&
          x !== ValidatorAndConditionEnum.disabled
      )
      .map((x) => x.toLowerCase());

    return Object.keys(errors).reduce((acc, key) => {
      const targetConfig = validatorConfigs.find(
        (x) => x.name.toLowerCase() === key
      );

      const isCustomValidation = validationTypes.every((x) => x !== key);

      const messageRaw = isCustomValidation
        ? errors[key]
        : { [key]: errors[key] };

      const messageReplaced = targetConfig?.message?.replace(
        /{{value}}/g,
        currentValue || ''
      );

      const messageGet = messageReplaced ?? messageRaw;

      const result =
        typeof messageGet === 'string'
          ? messageGet
          : JSON.stringify(messageGet);

      acc.push(result);
      return acc;
    }, [] as string[]);
  }
}
