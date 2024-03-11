import { FormControlIfCondition } from '../models';
import { getValueInObject } from './get-value-in-object';

/**
 * Get the key of target item if the value is an array.
 * Use syntax same with `FormControlIfCondition` to find the target item.
 *
 * @param array The array value
 * @param path [path, operator, value]
 * @returns key
 */
export function getItemKeyInArray(array: any[], path: string): string {
  const validSyntax =
    path.startsWith('[') && path.endsWith(']') && path.split(',').length === 3;

  if (!validSyntax || !Array.isArray(array)) {
    return path;
  }

  const [key, operator, value] = path
    .replace('[', '')
    .replace(']', '')
    .trim()
    .split(',')
    .map((x) => x.trim()) as FormControlIfCondition;

  const _key = key.replaceAll('"', '').replaceAll("'", '');
  const _operator = operator.replaceAll('"', '').replaceAll("'", '');

  const index = array.findIndex((item) => {
    const left = !_key ? item : getValueInObject(item, _key);
    const right = JSON.parse(value);

    switch (_operator) {
      case '!==':
        return left !== right;

      case '===':
        return left === right;

      case '<':
        return left < right;

      case '>':
        return left > right;

      case '<=':
        return left <= right;

      case '>=':
        return left >= right;

      case 'includes':
        return left.includes(right);

      case 'notIncludes':
        return !left.includes(right);
    }
  });

  return index < 0 ? '0' : index.toString();
}
