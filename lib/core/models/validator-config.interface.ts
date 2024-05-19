import { ValidatorsEnum } from './validators.enum';

export interface ValidatorConfig {
  name: keyof typeof ValidatorsEnum | (string & {});
  value?: any;

  /**Use {{value}} placeholder to display current value */
  message?: string;

  /**Flags for `pattern` validator. */
  flags?: string;
}
