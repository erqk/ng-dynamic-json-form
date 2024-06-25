import { AbstractControl, FormControl } from '@angular/forms';

export abstract class CustomErrorMessage {
  control: AbstractControl = new FormControl();
  errorMessages: string[] = [];
}
