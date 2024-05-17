import { ConditionsGroup } from './conditions-group.type';
import { ValidatorAndConditionEnum } from './validator-and-condition.enum';

export type ConditionType =
  | keyof typeof ValidatorAndConditionEnum
  | (string & {});

export type Conditions = {
  [key in ConditionType]?: ConditionsGroup;
};
