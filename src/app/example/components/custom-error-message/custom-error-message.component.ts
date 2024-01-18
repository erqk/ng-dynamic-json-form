import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ErrorMessageComponent } from 'ng-dynamic-json-form';

@Component({
  selector: 'app-custom-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-error-message.component.html',
})
export class CustomErrorMessageComponent extends ErrorMessageComponent {}
