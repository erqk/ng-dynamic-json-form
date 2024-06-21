export function getHeaderHeight(): number {
  if (typeof window === 'undefined') return 0;

  const header = document.querySelector('app-header');
  if (!header) return 0;

  return Math.floor(header.clientHeight);
}
