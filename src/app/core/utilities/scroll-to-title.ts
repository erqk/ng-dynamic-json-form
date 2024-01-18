export function scrollToTitle(
  targetEl: Element | null,
  behavior: ScrollBehavior
): void {
  if (typeof window === 'undefined') return;

  const header = document.querySelector('app-header');

  if (!targetEl || !header) return;

  (targetEl as HTMLElement).style.scrollMargin = `${
    header.clientHeight + 50
  }px`;

  targetEl.scrollIntoView({
    behavior,
    block: 'start',
  });
}
