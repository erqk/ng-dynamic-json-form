import { ConditionsStatementTupple, ConditionsOperator } from '../models';
import { evaluateBooleanOperation } from './get-boolean-operation-result';

/**
 * Get the value in an object located in a specific key.
 *
 * @param obj The object we want to get the value.
 * @param path The path to the target value, with period delimiter
 *
 * @description
 * If one of the path's value is array and the index needs to evaluate at runtime,
 * use the syntax same with `ConditionsIfTupple`.
 *
 * @example
 * ```
 * level1: {
 *  level2: {
 *    list: [
 *      {
 *        value: 0,
 *      },
 *      {
 *        value: 1,
 *      },
 *      ...
 *    ],
 *  },
 *}
 * ```
 * Orignal path: `level1.level2.list.["value", "===", 1].value`
 *
 * Resulting path: `level1.level2.list.1.value`
 *
 * If the array contains only primitive value, leave the first parameter of ConditionsIfTupple empty.
 * For example, change `["value", "===", 1]` to `[,"===", 1].
 */
export function getValueInObject(obj: any, path: string | undefined): any {
  if (!path || !obj || typeof obj !== 'object') {
    return obj;
  }

  // Store the array value, so that we can get the
  // target index in the next loop.
  let tempArray: any[] = [];

  try {
    return path
      .split('.')
      .map((x) => x.trim())
      .reduce((acc, key) => {
        const value = acc[key];
        const getKeyByIndex =
          key.startsWith('[') &&
          key.endsWith(']') &&
          key.split(',').length === 3;

        if (Array.isArray(value)) {
          tempArray = value;
        }

        return getKeyByIndex ? acc[getItemIndex(tempArray, key)] : value;
      }, obj);
  } catch (error) {
    console.error(error);
    return null;
  }
}

function getItemIndex(array: any[], path: string): string {
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
    .map((x) => x.trim()) as ConditionsStatementTupple;

  const _key = removeQuotes(key);
  const _operator = removeQuotes(operator) as ConditionsOperator;

  // The `path` is already a string, so we have to parse what is the type of the `value`.
  // If the `value` is wrapped with quotes then we take it as a string after removing the quotes.
  // Otherwise use JSON.parse() to get the value with correct type. (ex: number)
  const valueParsed = () => {
    if (typeof value !== 'string') return value;

    const isString = new RegExp(/^('|").*('|")$/).test(value);
    return isString ? removeQuotes(value) : JSON.parse(value);
  };

  const index = array.findIndex((item) => {
    const left = !_key ? item : getValueInObject(item, _key);
    const right = valueParsed();

    return evaluateBooleanOperation([left, _operator, right]);
  });

  return index < 0 ? '0' : index.toString();
}
