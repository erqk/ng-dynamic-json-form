import { Injectable, inject } from '@angular/core';
import { AbstractControl, FormControl, UntypedFormGroup } from '@angular/forms';
import { ValidatorConfig } from '../models';
import { FormControlConfig } from '../models/form-control-config.interface';
import { FormValidationService } from './form-validation.service';

@Injectable()
export class FormGeneratorService {
  private _formValidationService = inject(FormValidationService);

  generateFormGroup(data: FormControlConfig[]): UntypedFormGroup {
    const formGroup = new UntypedFormGroup({});

    for (const item of data) {
      const isFormControl = !item.children?.length;
      const isFormGroup = !!item.children?.length;

      let control: AbstractControl | null = null;

      const validatorConfigs = (item.validators ?? []).reduce((acc, curr) => {
        if (!acc.find((x) => x.name === curr.name)) acc.push(curr);
        return acc;
      }, [] as ValidatorConfig[]);

      const validators =
        this._formValidationService.getValidators(validatorConfigs);

      if (isFormControl) {
        control = new FormControl(item.value);
      }

      if (isFormGroup) {
        control = this.generateFormGroup(item.children!);
      }

      if (!control) {
        throw 'failed to generate form control!';
      }

      control.setValidators(validators);
      formGroup.addControl(item.formControlName, control);
    }

    return formGroup;
  }
}
