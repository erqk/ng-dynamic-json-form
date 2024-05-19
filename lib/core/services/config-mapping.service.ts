import { Injectable, inject } from '@angular/core';
import { FormControlConfig } from '../models';
import { NgxMaskConfigInitService } from './ngx-mask-config-init.service';

@Injectable()
export class ConfigMappingService {
  private _maskConfigInitService = inject(NgxMaskConfigInitService);

  mapCorrectConfig(input?: FormControlConfig): FormControlConfig | undefined {
    if (!input) return undefined;

    const { extra, inputMask } = input;

    if (extra) {
      input.extra = Object.keys(extra).reduce((acc, key) => {
        if (typeof acc[key] === 'string') {
          acc[key] = this._parseStringValue(acc[key]);
        }

        return acc;
      }, extra);
    }

    if (inputMask) {
      input.inputMask = this._maskConfigInitService.getConfig(input);
    }

    return input;
  }

  private _parseStringValue(input: string): any {
    const _input = input.trim();

    // Get Date from "Date(xxx)"
    if (_input.startsWith('Date(') && _input.endsWith(')')) {
      const dateString = _input.replace('Date(', '').replace(')', '').trim();

      try {
        return new Date(dateString);
      } catch {
        return input;
      }
    }

    // Get Date from ISO 8601 string
    if (this._isIsoDate(_input)) {
      return new Date(_input);
    }

    return _input;
  }

  /**https://stackoverflow.com/questions/52869695/check-if-a-date-string-is-in-iso-and-utc-format */
  private _isIsoDate(str: string) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    const d = new Date(str);
    return d instanceof Date && !isNaN(d.getTime()) && d.toISOString() === str;
  }
}
