import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styles: [
    ':host {display: flex; flex-direction: column; width: 100%; max-width: 60rem; margin: auto}',
  ],
})
export class ContentWrapperComponent {}
