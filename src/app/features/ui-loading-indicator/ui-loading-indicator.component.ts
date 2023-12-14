import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-loading-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  `,
  styleUrls: ['./ui-loading-indicator.component.scss'],
})
export class LoadingIndicatorComponent {}
