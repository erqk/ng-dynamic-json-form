import { Injectable } from '@angular/core';
import { UntypedFormGroup, isFormControl, isFormGroup } from '@angular/forms';
import { FormControlConfig, OptionSourceConfig } from '../models';
import { FormDisplayValue } from '../models/form-display-value.interface';

@Injectable()
export class FormValueService {
  patchForm(form: UntypedFormGroup | undefined, value: any): void {
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
    }
  }

  getFormDisplayValue(
    value: any,
    configs: FormControlConfig[]
  ): FormDisplayValue {
    const keyPreserved = this._getKeyPreservedDisplayValue(value, configs);

    return {
      keyMapped: this._getKeyMappedFormDisplayValue(keyPreserved, configs),
      keyPreserved,
    };
  }

  private _getKeyPreservedDisplayValue(
    formValue: any,
    configs: FormControlConfig[]
  ): any {
    const result = structuredClone(formValue);

    if (typeof result === null || typeof result !== 'object') {
      return result;
    }

    for (const item of configs) {
      const value = result?.[item.formControlName];

      if (item.options) {
        const isDynamicOptions = Boolean(
          item.options.src && typeof item.options.src !== 'string'
        );

        const labelKey = isDynamicOptions
          ? (item.options.src as OptionSourceConfig).mapData?.labelKey ??
            'label'
          : 'label';

        const getLabel = (val: any) => {
          if (typeof val === 'object') return val?.[labelKey];
          return item.options?.data?.find((x) => x.value === val)?.label;
        };

        result[item.formControlName] = Array.isArray(value)
          ? value.map((x) => getLabel(x))
          : getLabel(value);
      }

      if (!!item.children?.length) {
        result[item.formControlName] = this._getKeyPreservedDisplayValue(
          value,
          item.children
        );
      }
    }

    return result;
  }

  private _getKeyMappedFormDisplayValue(
    value: any,
    configs: FormControlConfig[]
  ): any {
    const newResult: any = {};

    if (value === null || typeof value !== 'object') {
      return value;
    }

    for (const item of configs) {
      const _value = value[item.formControlName];
      const key = item.label ?? item.formControlName;

      newResult[key] = _value;

      if (!!item.children?.length) {
        newResult[key] = this._getKeyMappedFormDisplayValue(
          _value,
          item.children
        );
      }
    }

    return newResult;
  }
}
