import { FormControlCondition } from './form-control-condition.model';
import { ValidatorConfig } from './form-validator-config.model';
import { AbstractControl } from '@angular/forms';

export interface ConditionExtracted {
  /**`AbstractControl` that you need to toggle it's status */
  targetControl: AbstractControl;

  /**Path to the `AbstractControl` that you need to toggle it's status */
  targetControlPath: string;

  /**A list of `AbstractControl` where their valueChanges will affect `targetControl` */
  controlsToListen: AbstractControl[];

  conditions: FormControlCondition[];
  validators: ValidatorConfig[];
}
