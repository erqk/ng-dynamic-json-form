import { ConditionsStatementTuple } from './conditions-statement-tupple.type';

export type ConditionsGroup = {
  [key in '&&' | '||']?: (ConditionsStatementTuple | ConditionsGroup)[];
};
