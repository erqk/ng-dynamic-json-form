export function getStyleListFromString(styles: string | undefined): string[] {
  if (!styles) {
    return [];
  }

  try {
    return styles
      .split(';')
      .map((x) => x.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}
