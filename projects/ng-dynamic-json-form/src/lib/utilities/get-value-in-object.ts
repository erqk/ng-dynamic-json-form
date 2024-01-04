export function getValueInObject(obj: any, path: string): any {
  if (!path || !obj || typeof obj !== 'object') {
    return obj;
  }

  try {
    return path
      .split('.')
      .map((x) => x.trim())
      .reduce((acc, key) => acc[key], obj);
  } catch (error) {
    throw error;
  }
}
