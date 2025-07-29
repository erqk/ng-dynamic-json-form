import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';

@Pipe({
  name: 'isControlRequired',
  standalone: true,
})
export class IsControlRequiredPipe implements PipeTransform {
  transform(value: AbstractControl | undefined): boolean {
    if (!value) {
      return false;
    }

    return value.hasValidator(Validators.required);
  }
}
