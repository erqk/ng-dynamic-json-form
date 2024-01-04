import { formatDate } from '@angular/common';
import { Injectable, LOCALE_ID, inject } from '@angular/core';
import { FormControlConfig } from '../models';

@Injectable()
export class FormDataTransformService {
  private _localeId = inject(LOCALE_ID);

  inputData(input: unknown, config?: FormControlConfig): unknown {
    if (!config) return input;

    switch (config.type) {
      case 'date':
        return this._getInputDate(input);

      default:
        return input;
    }
  }

  outputData(input: unknown, config?: FormControlConfig): unknown {
    if (!config) return input;

    switch (config.type) {
      case 'date':
        return this._getOutputDate(input, config.extra?.date?.outputFormat);

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

  private _getOutputDate(input: any, format?: string): Date | string {
    if (!(input instanceof Date)) return '';
    return format ? formatDate(input, format, this._localeId) : input;
  }
}
