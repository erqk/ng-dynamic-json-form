import { Conditions } from './conditions.type';
import { ValidatorConfig } from './form-validator-config.interface';
import { AbstractControl } from '@angular/forms';

export interface ConditionsExtracted {
  conditions: Conditions;

  /**`AbstractControl` that needs to toggle it's status */
  targetControl: AbstractControl;

  /**Path to the `AbstractControl` that needs to toggle it's status */
  targetControlPath: string;

  validators: ValidatorConfig[];
}
