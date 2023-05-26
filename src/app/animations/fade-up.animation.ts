import { style } from '@angular/animations';
import { keyframes } from '@angular/animations';
import { animate } from '@angular/animations';
import { transition } from '@angular/animations';
import { trigger } from '@angular/animations';

const _fadeUp = animate(
  '0.35s ease',
  keyframes([
    style({
      opacity: 0,
      transform: 'translateY(0.5rem)',
    }),
    style({
      opacity: 1,
      transform: 'translateY(0)',
    }),
  ])
);

export const FADE_UP_ANIMATION = trigger('fade-up', [
  transition('void => *', _fadeUp),
  transition('* => true', _fadeUp),
]);
