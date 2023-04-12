import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  UntypedFormArray,
  UntypedFormGroup
} from '@angular/forms';
import { Subject } from 'rxjs';
import { NgDynamicJsonFormConfig } from '../models/form-control-config.model';
import { getValidators } from '../utils/validator-generator';

@Injectable({
  providedIn: 'root',
})
export class FormGeneratorService {
  reset$ = new Subject();

  generateFormGroup(data: NgDynamicJsonFormConfig[]): UntypedFormGroup {
    const formGroup = new UntypedFormGroup({});
    for (const item of data) {
      let control: AbstractControl | null = null;

      // form control
      if (!item.children && !item.formArray) {
        control = new FormControl(item.value, {
          validators: getValidators(item.validators ?? []),
        });
      }

      // form group
      if (!!item.children && !item.formArray) {
        control = this.generateFormGroup(item.children);
      }

      // form array
      if (
        !!item.formArray &&
        !!item.formArray.template.length &&
        !item.children
      ) {
        const arrayLength =
          Array.isArray(item.value) && !!item.value.length
            ? item.value.length
            : item.formArray.length;

        control = this.generateFormArray(item.formArray.template, arrayLength);
        control.patchValue(item.value ?? []);
      }

      if (!control) {
        throw 'failed to generate form control!';
      }

      formGroup.addControl(item.formControlName, control);
    }

    return formGroup;
  }

  private generateFormArray(
    data: NgDynamicJsonFormConfig[],
    count: number
  ): UntypedFormArray {
    const formArray = new UntypedFormArray([]);

    for (let i = 0; i < count; i++) {
      const formGroup = this.generateFormGroup(data);
      formArray.push(formGroup);
    }

    return formArray;
  }
}
