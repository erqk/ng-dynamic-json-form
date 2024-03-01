import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  UntypedFormArray,
  UntypedFormGroup,
  ValidatorFn,
  isFormArray,
  isFormControl,
  isFormGroup,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { FormControlConfig } from '../models/form-control-config.interface';
import { FormConditionsService } from './form-conditions.service';
import { FormValidationService } from './form-validation.service';

@Injectable()
export class FormGeneratorService {
  readonly reset$ = new Subject<void>();

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

  // TODO: Make generated form pristine
  // The workaround below is not working currently
  markFormPristine(control: AbstractControl): void {
    control.markAsPristine();

    if (isFormGroup(control)) {
      Object.values(control.controls).forEach((c) => this.markFormPristine(c));
    }

    if (isFormArray(control)) {
      control.controls.forEach((c) => this.markFormPristine(c));
    }
  }

  private _generateFormArray(
    data: FormControlConfig[],
    count: number,
    validators: ValidatorFn[]
  ): UntypedFormArray {
    const formArray = new UntypedFormArray([], {
      validators,
    });

    if (!count) {
      return formArray;
    }

    for (let i = 0; i < count; i++) {
      const formGroup = this.generateFormGroup(data);
      formArray.push(formGroup);

      // FormGroup inside FormArray will be harder to track the control because we have to take care of index.
      // So we just create a new listener for each FormGroup.
      this._formConditionsService
        .formConditionsEvent$(formGroup, data)
        .pipe(takeUntil(this.reset$))
        .subscribe();
    }

    return formArray;
  }
}
