export function getValueInObject(obj: any, path: string): any {
  if (!path || !obj || typeof obj !== 'object') {
    return obj;
  }

  const _obj = JSON.parse(JSON.stringify(obj));

  try {
    return path
      .split('.')
      .map((x) => x.trim())
      .reduce((acc, key) => acc[key], _obj);
  } catch (error) {
    throw error;
  }
}
