import { FormControlCondition } from './form-control-condition.interface';
import { ValidatorConfig } from './form-validator-config.interface';
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
