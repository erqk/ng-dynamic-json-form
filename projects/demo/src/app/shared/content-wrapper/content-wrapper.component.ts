import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { FadeUpAnimation } from '../../animations/fade-up.animation';

@Component({
  selector: 'app-content-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: ` <ng-content></ng-content> `,
  animations: [FadeUpAnimation],
  styles: [
    ':host {display: flex; flex-direction: column; width: 100%; max-width: 60rem; margin: 0 auto}',
  ],
})
export class ContentWrapperComponent {
  @HostBinding('@fade-up') fadeUp = true;
}
