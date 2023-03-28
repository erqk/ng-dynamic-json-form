import { UntypedFormGroup, FormControl } from '@angular/forms';
import { JsonFormControlData } from '../core/models/json-form-control-data.model';
import { getValidators } from './validator-generator';

export function generateFormGroup(
  data: JsonFormControlData[]
): UntypedFormGroup {
  const formGroup = new UntypedFormGroup({});
  for (const item of data) {
    const value = !!item.children
      ? generateFormGroup(item.children).value
      : item.value;

    formGroup.addControl(
      item.formControlName,
      new FormControl(value, {
        validators: getValidators(item.validators ?? []),
      })
    );
  }

  console.log(formGroup);
  return formGroup;
}
