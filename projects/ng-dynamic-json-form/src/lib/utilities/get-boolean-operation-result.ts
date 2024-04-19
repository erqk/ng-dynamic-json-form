import { FormControlConditionOperator } from '../models';

export function getBooleanOperationResult(
  left: any,
  right: any,
  operator: FormControlConditionOperator
): boolean {
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
