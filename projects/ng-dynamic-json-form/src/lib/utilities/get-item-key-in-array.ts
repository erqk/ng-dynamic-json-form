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

  const removeQuotes = (str: string) =>
    str.replaceAll('"', '').replaceAll("'", '');

  const [key, operator, value] = path
    .replace('[', '')
    .replace(']', '')
    .split(',')
    .map((x) => x.trim()) as FormControlIfCondition;

  const _key = removeQuotes(key);
  const _operator = removeQuotes(operator);

  // Because we have `path` that is a string, but we want number to be used.
  // So we have to check whether the 'real' type of the value.
  // If the value is wrapped with quotes, we don't parse it but remove the quotes.
  const valueParsed = () => {
    if (typeof value !== 'string') return value;

    const isString = new RegExp(/^('|").*('|")$/).test(value);
    return isString ? removeQuotes(value) : JSON.parse(value);
  };

  const index = array.findIndex((item) => {
    const left = !_key ? item : getValueInObject(item, _key);
    const right = valueParsed();

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
