import { Injectable, inject } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  isFormArray,
  isFormControl,
  isFormGroup,
} from '@angular/forms';
import { FormArrayConfig, FormControlConfig } from '../models';
import { FormGeneratorService } from './form-generator.service';

@Injectable()
export class FormPatcherService {
  private readonly _formGeneratorService = inject(FormGeneratorService);

  config: FormControlConfig[] = [];

  patchForm(
    form: UntypedFormGroup | undefined,
    value: any
  ): void {
    if (!form) return;

    for (const key in value) {
      const _value = value[key];
      const control = form.get(key);

      if (!control) continue;

      if (isFormControl(control)) {
        control.patchValue(_value);
      }

      if (isFormGroup(control)) {
        this.patchForm(control, _value);
      }

      if (isFormArray(control)) {
        this._patchFormArray(control, key, _value);
      }
    }
  }

  private _patchFormArray(
    formArray: UntypedFormArray,
    key: string,
    value: any[]
  ): void {
    const config = this._formArrayConfig(this.config, key);
    if (!config) return;

    formArray.clear();

    if (!value.length) return;

    for (let i = 0; i < value.length; i++) {
      const group = this._formGeneratorService.generateFormGroup(
        config.template
      );

      group.patchValue(value[i]);
      formArray.push(group);
    }
  }

  private _formArrayConfig(
    config: FormControlConfig[],
    key: string
  ): FormArrayConfig | undefined {
    if (!this.config.length || !key) {
      return undefined;
    }

    const target = config.find((x) => x.formArray)?.formArray;
    if (target) return target;

    const rest = config.filter((x) => !x.formArray && !!x.children?.length);
    const result = this._formArrayConfig(rest, key);

    return result;
  }
}
