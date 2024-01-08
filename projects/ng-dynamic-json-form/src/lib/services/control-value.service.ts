import { formatDate } from '@angular/common';
import { Injectable, LOCALE_ID, inject } from '@angular/core';
import { FormControlConfig } from '../models';
import { NG_DYNAMIC_JSON_FORM_CONFIG } from '../ng-dynamic-json-form.config';

@Injectable()
export class ControlValueService {
  private _localeId = inject(LOCALE_ID);
  private _config = inject(NG_DYNAMIC_JSON_FORM_CONFIG, { optional: true });

  mapInputData(input: unknown, config?: FormControlConfig): unknown {
    if (!config) return input;

    switch (config.type) {
      case 'date':
        return this._getInputDate(input);

      default:
        return input;
    }
  }

  mapOutputData(input: unknown, config?: FormControlConfig): unknown {
    if (!config) return input;

    switch (config.type) {
      case 'date':
        return this._getOutputDate(input);

      default:
        return input;
    }
  }

  private _getInputDate(input: any): Date {
    if (input instanceof Date) return input;

    try {
      return new Date(input);
    } catch (e) {
      throw 'Invalid Date string or number!';
    }
  }

  private _getOutputDate(input: any): Date | string {
    if (!(input instanceof Date)) return '';
    const format = this._config?.outputDateFormat;
    return format ? formatDate(input, format, this._localeId) : input;
  }
}
