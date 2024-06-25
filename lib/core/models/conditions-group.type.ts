import { ConditionsStatementTupple } from './conditions-statement-tupple.type';

export type ConditionsGroup = {
  [key in '&&' | '||']?: (ConditionsStatementTupple | ConditionsGroup)[];
};
