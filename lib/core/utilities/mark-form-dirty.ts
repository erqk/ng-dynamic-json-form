import { AbstractControl, isFormArray, isFormGroup } from '@angular/forms';

export function markFormDirty(control: AbstractControl | undefined): void {
  if (!control) {
    return;
  }

  if (!control.dirty) {
    control.markAsDirty();
  }

  if (isFormGroup(control)) {
    Object.values(control.controls).forEach((c) => markFormDirty(c));
  }

  if (isFormArray(control)) {
    control.controls.forEach((c) => markFormDirty(c));
  }
}
