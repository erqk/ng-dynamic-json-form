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

  getOptionsValue(type: 'stringified' | 'parsed', input: any): any {
    const parsed = (_input: any) => {
      try {
        return JSON.parse(_input);
      } catch {
        return _input;
      }
    };

    const stringified = (_input: any) => {
      // Use same parameters with Angular's built-in JSON pipe
      // https://github.com/angular/angular/blob/17.1.0-rc.0/packages/common/src/pipes/json_pipe.ts
      return JSON.stringify(_input, null, 2);
    };

    if (type === 'parsed') {
      return Array.isArray(input) ? input.map(parsed) : parsed(input);
    }

    if (type === 'stringified') {
      return Array.isArray(input) ? input.map(stringified) : stringified(input);
    }
  }

  private _getInputDate(input: any): Date {
    if (!input || !(input instanceof Date)) return input;

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
