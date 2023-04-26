import { NgDynamicJsonFormControlCondition } from './form-control-condition.model';
import { NgDynamicJsonFormValidatorConfig } from './form-validator-config.model';
import { AbstractControl } from '@angular/forms';

export interface NgDynamicJsonFormConditionExtracted {
  /**`AbstractControl` that you need to toggle it's status */
  targetControl: AbstractControl;

  /**Path to the `AbstractControl` that you need to toggle it's status */
  targetControlPath: string;

  /**A list of `AbstractControl` where their valueChanges will affect `targetControl` */
  controlsToListen: AbstractControl[];

  conditions: NgDynamicJsonFormControlCondition[];
  validators: NgDynamicJsonFormValidatorConfig[];
}
