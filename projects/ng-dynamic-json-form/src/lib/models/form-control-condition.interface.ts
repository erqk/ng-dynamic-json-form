import { ValidatorAndConditionEnum } from './validator-and-condition.enum';

export interface FormControlCondition {
  name?: keyof typeof ValidatorAndConditionEnum;
  control: string;
  controlValue: any;
  operator: '===' | '!==' | '>=' | '>' | '<=' | '<';
  groupOperator?: '||' | '&&';
  groupWith?: FormControlCondition[];
}
