import { ValidatorAndConditionEnum } from './validator-and-condition.enum';

export type FormControlConditionOperator =
  | '==='
  | '!=='
  | '>='
  | '>'
  | '<='
  | '<';

export type FormControlIfCondition = [
  string,
  FormControlConditionOperator,
  any
];

export type FormControlGroupCondition = {
  [key in '&&' | '||']?: (FormControlIfCondition | FormControlGroupCondition)[];
};

export type FormControlConditionType =
  | keyof typeof ValidatorAndConditionEnum
  | (string & {});

export type FormControlCondition = {
  [key in FormControlConditionType]?: FormControlGroupCondition;
};
