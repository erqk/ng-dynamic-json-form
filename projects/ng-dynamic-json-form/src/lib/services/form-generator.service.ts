import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  UntypedFormArray,
  UntypedFormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { FormControlConfig } from '../models/form-control-config.interface';
import { FormConditionsService } from './form-conditions.service';
import { FormValidationService } from './form-validation.service';

@Injectable()
export class FormGeneratorService {
  private _reset$ = new Subject();

  constructor(
    private _formConditionsService: FormConditionsService,
    private _formValidationService: FormValidationService
  ) {}

  generateFormGroup(data: FormControlConfig[]): UntypedFormGroup {
    const formGroup = new UntypedFormGroup({});

    for (const item of data) {
      const isFormControl = !item.children && !item.formArray;
      const isFormGroup = !!item.children && !item.formArray;
      const isFormArray =
        !!item.formArray && !!item.formArray.template.length && !item.children;

      let control: AbstractControl | null = null;
      const validators = this._formValidationService.getValidators(
        item.validators ?? []
      );

      if (isFormControl) {
        control = new FormControl(item.value ?? '', {
          validators,
        });
      }

      if (isFormGroup) {
        control = this.generateFormGroup(item.children!);
      }

      if (isFormArray) {
        const arrayLength =
          Array.isArray(item.value) && !!item.value.length
            ? item.value.length
            : item.formArray!.length || 0;

        control = this._generateFormArray(
          item.formArray!.template,
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

  private _generateFormArray(
    data: FormControlConfig[],
    count: number,
    validators: ValidatorFn[]
  ): UntypedFormArray {
    const formArray = new UntypedFormArray([], {
      validators,
    });

    if (!count) formArray;

    this._reset$.next(null);
    for (let i = 0; i < count; i++) {
      const formGroup = this.generateFormGroup(data);
      formArray.push(formGroup);

      this._formConditionsService
        .formControlConditonsEvent$(formGroup, data)
        .pipe(takeUntil(this._reset$))
        .subscribe();
    }

    return formArray;
  }
}
