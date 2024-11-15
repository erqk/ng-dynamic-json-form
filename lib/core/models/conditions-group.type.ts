import { ConditionsStatementTuple } from './conditions-statement-tuple.type';

export type ConditionsGroup = {
  [key in '&&' | '||']?: (ConditionsStatementTuple | ConditionsGroup)[];
};
