import { Injectable } from '@angular/core';
import { UntypedFormGroup, isFormControl, isFormGroup } from '@angular/forms';

@Injectable()
export class FormPatcherService {
  patchForm(form: UntypedFormGroup | undefined, value: any): void {
    if (!form) return;

    for (const key in value) {
      const _value = value[key];
      const control = form.get(key);

      if (!control) continue;

      if (isFormControl(control)) {
        control.patchValue(_value);
      }

      if (isFormGroup(control)) {
        this.patchForm(control, _value);
      }
    }
  }
}
