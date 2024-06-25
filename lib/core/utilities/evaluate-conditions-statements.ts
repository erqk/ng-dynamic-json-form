import { ConditionsGroup, ConditionsStatementTupple } from '../models';
import { evaluateBooleanOperation } from './get-boolean-operation-result';

export function evaluateConditionsStatements(
  conditionsGroup: ConditionsGroup,
  mapTuppleFn: (tupple: ConditionsStatementTupple) => ConditionsStatementTupple
): boolean | undefined {
  if (!conditionsGroup['&&'] && !conditionsGroup['||']) {
    return undefined;
  }

  const groupOperator = conditionsGroup['&&'] ? '&&' : '||';
  const conditionsGroupItems = conditionsGroup[groupOperator]!;

  const childrenStatementsResult = conditionsGroupItems
    .filter((x) => !Array.isArray(x))
    .map((x) => x as ConditionsGroup)
    .map((x) => evaluateConditionsStatements(x, mapTuppleFn));

  const statementsResult = conditionsGroupItems
    .filter((x) => Array.isArray(x))
    .map((x) => x as ConditionsStatementTupple)
    .map((x) => {
      const [left, operator, right] = mapTuppleFn(x);
      const result = evaluateBooleanOperation([left, operator, right]);

      return result;
    });

  const bools = childrenStatementsResult
    .concat(statementsResult)
    .filter((x) => x !== undefined);

  return groupOperator === '&&' ? bools.every(Boolean) : bools.some(Boolean);
}
