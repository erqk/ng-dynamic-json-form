import { FormControlConditionType } from './form-control-condition.type';

export interface ValidatorConfig {
  name: FormControlConditionType;
  value?: any;

  /**Use {{value}} placeholder if you need to display current value */
  message?: string;
}
