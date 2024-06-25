import { getValueInObject } from './get-value-in-object';

/**
 * Return the new object with only the keys provided.
 * If any of the data is nested, the final object will be flatten out.
 *
 * @param obj The original object
 * @param keys The keys to use as new object
 * @returns New object contains only specific keys.
 *
 * The following example shows what happened if there is nested data.
 * @example
 * from:
 * {
 *    A: {
 *      childA: ...
 *    },
 *    B: ...,
 *    C: ...
 * }
 *
 * to:
 * {
 *    childA: ...,
 *    B: ...,
 *    C: ...
 * }
 */
export function trimObjectByKeys(obj: any, keys: string[]): any {
  if (typeof obj !== 'object') {
    return obj;
  }

  if (keys.length === 1) {
    return getValueInObject(obj, keys[0]);
  }

  return keys.reduce((acc, key) => {
    // If any of the data is nested.
    const _keys = key.split('.').map((x) => x.trim());

    // We get the last key as new key if the data is nested.
    const newKey = _keys.length > 1 ? _keys[_keys.length - 1] : key;

    // Finally, we export the new object that's flatten.
    acc[newKey] = getValueInObject(obj, key);
    return acc;
  }, {} as any);
}
