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
          acc[key] = this._getDate(acc[key]);
        }

        return acc;
      }, extra);
    }

    if (inputMask) {
      input.inputMask = this._maskConfigInitService.getConfig(input);
    }

    return input;
  }

  /**Get Date item from string "Date(xxx)" */
  private _getDate(input: string): Date | string {
    const _input = input.trim();

    if (!_input.startsWith('Date(') || !_input.endsWith(')')) {
      return input;
    }

    const dateString = _input.replace('Date(', '').replace(')', '').trim();

    try {
      return new Date(dateString);
    } catch {
      return input;
    }
  }
}
