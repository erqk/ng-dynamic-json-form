import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  UntypedFormArray,
  UntypedFormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { NgDynamicJsonFormControlConfig } from '../models/form-control-config.model';
import { getValidators } from '../utils/validator-generator';

@Injectable({
  providedIn: 'root',
})
export class FormGeneratorService {
  reset$ = new Subject();

  customValidators: { [key: string]: ValidatorFn } = {};

  generateFormGroup(data: NgDynamicJsonFormControlConfig[]): UntypedFormGroup {
    const formGroup = new UntypedFormGroup({});
    for (const item of data) {
      let control: AbstractControl | null = null;
      const validators = getValidators(
        item.validators ?? [],
        this.customValidators
      );

      // form control
      if (!item.children && !item.formArray) {
        control = new FormControl(item.value, {
          validators,
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

        control = this.generateFormArray(
          item.formArray.template,
          arrayLength,
          validators
        );
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
    data: NgDynamicJsonFormControlConfig[],
    count: number,
    validators: ValidatorFn[]
  ): UntypedFormArray {
    const formArray = new UntypedFormArray([], {
      validators,
    });

    for (let i = 0; i < count; i++) {
      const formGroup = this.generateFormGroup(data);
      formArray.push(formGroup);
    }

    return formArray;
  }
}
