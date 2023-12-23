import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { FADE_UP_ANIMATION } from '../../animations/fade-up.animation';

@Component({
  selector: 'ui-content-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: ` <ng-content></ng-content> `,
  animations: [FADE_UP_ANIMATION],
  styles: [
    ':host {display: flex; flex-direction: column; width: 100%; margin-left: auto; margin-right: auto;}',
  ],
})
export class UiContentWrapperComponent {
  @Input() maxWidth = '80rem';
  @HostBinding('@fade-up') fadeUp = true;
  @HostBinding('style.max-width')
  get _maxWidth() {
    return this.maxWidth;
  }
}
