import { Injectable, inject } from '@angular/core';
import { AbstractControl, FormControl, UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { FormControlConfig } from '../models/form-control-config.interface';
import { FormValidationService } from './form-validation.service';

@Injectable()
export class FormGeneratorService {
  reset$ = new Subject<void>();
  private _formValidationService = inject(FormValidationService);

  generateFormGroup(data: FormControlConfig[]): UntypedFormGroup {
    const formGroup = new UntypedFormGroup({});

    for (const item of data) {
      const isFormControl = !item.children?.length;
      const isFormGroup = !!item.children?.length;

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

      if (!control) {
        throw 'failed to generate form control!';
      }

      item.formControlName = item.formControlName.replaceAll(/\s/g, '_');
      control.setValidators(validators);
      formGroup.addControl(item.formControlName, control);
    }

    return formGroup;
  }

  // TODO: Get fallback value based on the `type` given.
  private _fallbackValue(): void {}
}
