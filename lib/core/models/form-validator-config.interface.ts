import { ConditionType } from './conditions.type';

export interface ValidatorConfig {
  name: ConditionType;
  value?: any;

  /**Use {{value}} placeholder to display current value */
  message?: string;

  /**Flags for `pattern` validator. */
  flags?: string;
}
