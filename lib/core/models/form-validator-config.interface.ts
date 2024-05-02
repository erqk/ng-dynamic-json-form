import { FormControlConditionType } from './form-control-condition.type';

export interface ValidatorConfig {
  name: FormControlConditionType;
  value?: any;

  /**Use {{value}} placeholder to display current value */
  message?: string;

  /**Flags for `pattern` validator. */
  flags?: string;
}
