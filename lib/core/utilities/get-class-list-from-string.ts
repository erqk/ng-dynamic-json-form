export function getClassListFromString(
  classNames: string | undefined
): string[] {
  if (!classNames) {
    return [];
  }

  try {
    return classNames
      .split(/\s{1,}/)
      .map((x) => x.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}
