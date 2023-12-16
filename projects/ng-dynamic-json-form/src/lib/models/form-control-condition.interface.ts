import { ValidatorAndConditionEnum } from './validator-and-condition.enum';

export interface FormControlCondition {
  name?: keyof typeof ValidatorAndConditionEnum;
  operation: [string, '===' | '!==' | '>=' | '>' | '<=' | '<', any];
  groupOperator?: '||' | '&&';
  groupWith?: FormControlCondition[];
}
