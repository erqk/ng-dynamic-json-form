import { ConditionsIfTupple } from './conditions-if-tupple.type';

export type ConditionsGroup = {
  [key in '&&' | '||']?: (ConditionsIfTupple | ConditionsGroup)[];
};
