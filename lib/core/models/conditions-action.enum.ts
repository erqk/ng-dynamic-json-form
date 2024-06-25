import { ValidatorsEnum } from './validators.enum';

export enum ConditionsActionEnum {
  'control.hidden' = 'control.hidden',
  'control.disabled' = 'control.disabled',
  'validator.required' = `validator.${ValidatorsEnum.required}`,
  'validator.requiredTrue' = `validator.${ValidatorsEnum.requiredTrue}`,
  'validator.min' = `validator.${ValidatorsEnum.min}`,
  'validator.max' = `validator.${ValidatorsEnum.max}`,
  'validator.minLength' = `validator.${ValidatorsEnum.minLength}`,
  'validator.maxLength' = `validator.${ValidatorsEnum.maxLength}`,
  'validator.email' = `validator.${ValidatorsEnum.email}`,
  'validator.pattern' = `validator.${ValidatorsEnum.pattern}`,
}
