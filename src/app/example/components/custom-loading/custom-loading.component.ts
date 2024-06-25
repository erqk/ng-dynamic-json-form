import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-loading',
  standalone: true,
  imports: [CommonModule],
  template: ` <span class="loader mx-4 my-2"></span> `,
  styles: [
    `
      .loader {
        width: 1.25em;
        height: 1.25em;
        border: 3px solid var(--primary-500);
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
      }

      @keyframes rotation {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class CustomLoadingComponent {}
