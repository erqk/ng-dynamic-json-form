import { ConditionsOperator } from '../models/conditions-operator.type';

export function evaluateBooleanOperation([left, operator, right]: [
  any,
  ConditionsOperator,
  any
]): boolean {
  switch (operator) {
    case '===':
      return left === right;

    case '!==':
      return left !== right;

    case '>=':
      return left >= right;

    case '>':
      return left > right;

    case '<=':
      return left <= right;

    case '<':
      return left < right;

    case 'includes':
      return left.includes(right);

    case 'notIncludes':
      return !left.includes(right);
  }
}
