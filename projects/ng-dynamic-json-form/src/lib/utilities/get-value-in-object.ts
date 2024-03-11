import { getItemKeyInArray } from './get-item-key-in-array';

/**
 * Get the value in an object located in a specific key.
 *
 * @param obj The object we want to get the value.
 * @param path The path to the target value, with period delimiter
 */
export function getValueInObject(obj: any, path: string): any {
  if (!path || !obj || typeof obj !== 'object') {
    return obj;
  }

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

        return getKeyByIndex ? acc[getItemKeyInArray(tempArray, key)] : value;
      }, obj);
  } catch (error) {
    throw error;
  }
}
