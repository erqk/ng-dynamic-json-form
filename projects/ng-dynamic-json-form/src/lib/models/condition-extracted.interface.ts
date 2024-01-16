import { FormControlCondition } from './form-control-condition.type';
import { ValidatorConfig } from './form-validator-config.interface';
import { AbstractControl } from '@angular/forms';

export interface ConditionExtracted {
  conditions: FormControlCondition;

  /**`AbstractControl` that needs to toggle it's status */
  targetControl: AbstractControl;

  /**Path to the `AbstractControl` that needs to toggle it's status */
  targetControlPath: string;

  validators: ValidatorConfig[];
}
