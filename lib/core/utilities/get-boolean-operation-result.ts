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
      return Array.isArray(left) ? left.includes(right) : false;

    case 'notIncludes':
      return Array.isArray(left) ? !left.includes(right) : false;
  }
}
