import { AbstractControl, isFormArray, isFormGroup } from '@angular/forms';

export function markFormTouched(control: AbstractControl | undefined): void {
  if (!control) {
    return;
  }

  if (!control.touched) {
    control.markAsTouched();
  }

  if (isFormGroup(control)) {
    Object.values(control.controls).forEach((c) => markFormTouched(c));
  }

  if (isFormArray(control)) {
    control.controls.forEach((c) => markFormTouched(c));
  }
}
