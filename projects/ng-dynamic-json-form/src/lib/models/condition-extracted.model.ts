import { NgDynamicJsonFormControlCondition } from "./form-control-condition.model";

export interface NgDynamicJsonFormConditionExtracted {
  targetControlPath: string;
  conditions: NgDynamicJsonFormControlCondition[];
}
