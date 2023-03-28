import { FormControl, UntypedFormGroup } from '@angular/forms';
import { JsonFormControlData } from '../core/models/json-form-control-data.model';

export function generateFormGroup(
  data: JsonFormControlData[]
): UntypedFormGroup {
  const formGroup = new UntypedFormGroup({});
  for (const item of data) {
    const value = !!item.children
      ? generateFormGroup(item.children).value
      : item.value;

    formGroup.addControl(item.formControlName, new FormControl(value));
  }

  return formGroup;
}
