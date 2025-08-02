import { Injectable, inject } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { FormControlConfig } from '../models/form-control-config.interface';
import { FormValidationService } from './form-validation.service';

@Injectable()
export class FormGeneratorService {
  private formValidationService = inject(FormValidationService);

  generateFormGroup(data: FormControlConfig[]): UntypedFormGroup {
    const formGroup = new UntypedFormGroup({});

    for (const item of data) {
      const control = !item.children?.length
        ? new FormControl(item.value)
        : this.generateFormGroup(item.children);

      const validators = this.formValidationService.getValidators(
        item.validators
      );

      const asyncValidators = this.formValidationService.getAsyncValidators(
        item.asyncValidators
      );

      control.setValidators(validators);
      control.setAsyncValidators(asyncValidators);

      formGroup.addControl(item.formControlName, control);

      // Runs the validation manually after async validators are initialized,
      // to prevent the initial status stuck at "PENDING".
      if (asyncValidators.length > 0) {
        queueMicrotask(() => control.updateValueAndValidity());
      }
    }

    return formGroup;
  }
}
