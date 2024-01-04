import { getValueInObject } from './get-value-in-object';

export function trimObjectByKeys(obj: any, keys: string[]): any {
  if (typeof obj !== 'object') {
    return obj;
  }

  if (keys.length === 1) {
    return getValueInObject(obj, keys[0]);
  }

  return keys.reduce((acc, key) => {
    const _keys = key.split('.').map((x) => x.trim());
    const newKey = _keys.length > 1 ? _keys[_keys.length - 1] : key;

    acc[newKey] = getValueInObject(obj, key);
    return acc;
  }, {} as any);
}
