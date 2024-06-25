import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';

@Pipe({
  name: 'isControlRequired',
  standalone: true,
})
export class IsControlRequiredPipe implements PipeTransform {
  transform(value: AbstractControl): boolean {
    return value.hasValidator(Validators.required);
  }
}
