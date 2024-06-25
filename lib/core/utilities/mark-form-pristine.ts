import { AbstractControl, isFormArray, isFormGroup } from '@angular/forms';

export function markFormPristine(control: AbstractControl): void {
  if (!control.pristine) control.markAsPristine();

  if (isFormGroup(control)) {
    Object.values(control.controls).forEach((c) => markFormPristine(c));
  }

  if (isFormArray(control)) {
    control.controls.forEach((c) => markFormPristine(c));
  }
}
