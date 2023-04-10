import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { getValidators } from '../utils/validator-generator';
import { NgDynamicJsonFormConfig } from '../models/form-control-config.model';
import { clearEmpties } from '../utils/clear-empties';
import { Subject, debounceTime, takeUntil, tap } from 'rxjs';

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

    this.listenFormChanges(formGroup);
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

  private listenFormChanges(form: FormGroup): void {
    this.reset$.next(null);

    form.valueChanges
      .pipe(
        debounceTime(0),
        tap((x) => this.updateFormStatus(form)),
        takeUntil(this.reset$)
      )
      .subscribe();
  }

  private updateFormStatus(form: FormGroup): void {
    const getFormErrors = (input: UntypedFormControl | UntypedFormGroup) => {
      const isFormGroup = 'controls' in input;

      if (!isFormGroup) {
        return JSON.parse(JSON.stringify(input.errors));
      }

      const errors = Object.keys(input.controls).reduce((acc, key) => {
        const formControlErrors = getFormErrors(
          input.controls[key] as UntypedFormControl
        );

        if (!!formControlErrors) {
          acc = {
            ...acc,
            [key]: formControlErrors,
          };
        }

        return acc;
      }, {});

      return JSON.parse(JSON.stringify(errors));
    };

    const errors = clearEmpties(getFormErrors(form));
    form.setErrors(!Object.keys(errors).length ? null : errors);
  }
}
