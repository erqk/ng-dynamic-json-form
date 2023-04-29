import { style } from '@angular/animations';
import { keyframes } from '@angular/animations';
import { animate } from '@angular/animations';
import { transition } from '@angular/animations';
import { trigger } from '@angular/animations';

export const FadeUpAnimation = trigger('fade-up', [
  transition(
    'void => *',
    animate(
      '0.35s ease',
      keyframes([
        style({
          opacity: 0,
          transform: 'translateY(0.5rem)'
        }),
        style({
          opacity: 1,
          transform: 'translateY(0)'
        }),
      ])
    )
  )
]);
