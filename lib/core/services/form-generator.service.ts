import { Injectable, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  UntypedFormGroup,
  ValidatorFn,
} from '@angular/forms';
import { FormControlConfig } from '../models/form-control-config.interface';
import { FormValidationService } from './form-validation.service';
import { ValidatorConfig } from '../models';

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
        control = new FormControl(item.value ?? this._fallbackValue(item));
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

  private _fallbackValue(item: FormControlConfig): any {
    switch (item.type) {
      case 'checkbox':
      case 'switch':
        return false;

      default:
        return item.value;
    }
  }

  private _formControlName(item: FormControlConfig): string {
    const replaceSpaces = (str: string) => str.replaceAll(/\s/g, '_');
    const removeSpecialCharacters = (str: string) =>
      str.replaceAll(/[.,]/g, '');

    const result = [replaceSpaces, removeSpecialCharacters].reduce(
      (acc, fn) => fn(acc),
      item.formControlName
    );

    return result;
  }
}
