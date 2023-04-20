import { NgDynamicJsonFormControlCondition } from './form-control-condition.model';
import { NgDynamicJsonFormValidatorConfig } from './form-validator-config.model';

export interface NgDynamicJsonFormConditionExtracted {
  targetControlPath: string;
  conditions: NgDynamicJsonFormControlCondition[];
  validators: NgDynamicJsonFormValidatorConfig[];
}
