import { getHeaderHeight } from './get-header-height';

export function scrollToTitle(
  targetEl: Element | null,
  behavior: ScrollBehavior
): void {
  if (typeof window === 'undefined' || !targetEl) {
    return;
  }

  (targetEl as HTMLElement).style.scrollMargin = `${getHeaderHeight() + 50}px`;

  targetEl.scrollIntoView({
    behavior,
    block: 'start',
  });
}
