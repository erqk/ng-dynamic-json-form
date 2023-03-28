import { Injectable } from '@angular/core';
import {
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { JsonFormControlData } from '../core/models/json-form-control-data.model';
import { JsonFormGroupData } from '../core/models/json-form-group-data.model';
import { getValidators } from '../utils/validator-generator';

@Injectable({
  providedIn: 'root',
})
export class FormGeneratorService {
  constructor() {}

  generateFormGroup(data: JsonFormControlData[]): UntypedFormGroup {
    const formGroup = new UntypedFormGroup({});
    for (const item of data) {
      const value = !!item.children
        ? this.generateFormGroup(item.children).value
        : item.value;

      formGroup.addControl(item.formControlName, new FormControl(value));
    }

    return formGroup;
  }
}
