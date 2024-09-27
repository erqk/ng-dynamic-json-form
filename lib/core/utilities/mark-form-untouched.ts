import { AbstractControl, isFormArray, isFormGroup } from '@angular/forms';

export function markFormUntouched(control: AbstractControl | undefined): void {
  if (!control) {
    return;
  }

  if (!control.untouched) {
    control.markAsUntouched();
  }

  if (isFormGroup(control)) {
    Object.values(control.controls).forEach((c) => markFormUntouched(c));
  }

  if (isFormArray(control)) {
    control.controls.forEach((c) => markFormUntouched(c));
  }
}
