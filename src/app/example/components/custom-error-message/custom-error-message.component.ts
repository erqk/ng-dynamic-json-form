
import { Component } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { CustomErrorMessage } from 'ng-dynamic-json-form';

@Component({
    selector: 'app-custom-error-message',
    imports: [],
    templateUrl: './custom-error-message.component.html'
})
export class CustomErrorMessageComponent implements CustomErrorMessage {
  control: AbstractControl<any, any> = new FormControl();
  errorMessages: string[] = [];
}
