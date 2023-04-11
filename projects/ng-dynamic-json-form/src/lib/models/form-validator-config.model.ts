import { ValidatorFn } from '@angular/forms';

export interface NgDynamicJsonFormValidatorConfig {
  name: string;
  value?: any;
  customValidator?: {
    name: string;
    value: ValidatorFn;
  };
}
