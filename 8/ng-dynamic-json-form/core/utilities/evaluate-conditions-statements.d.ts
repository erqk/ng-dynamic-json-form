import { ConditionsGroup, ConditionsStatementTuple } from '../models';
export declare function evaluateConditionsStatements(conditionsGroup: ConditionsGroup, mapTuppleFn: (tupple: ConditionsStatementTuple) => ConditionsStatementTuple): boolean | undefined;
