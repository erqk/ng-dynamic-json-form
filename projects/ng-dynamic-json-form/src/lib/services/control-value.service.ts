import { Injectable } from '@angular/core';
import { FormControlConfig } from '../models';

@Injectable()
export class ControlValueService {
  mapData(
    type: 'input' | 'output',
    data: unknown,
    config: FormControlConfig | undefined
  ): unknown {
    if (!config) return data;

    switch (config.type) {
      case 'date':
        return type === 'input' ? this._getInputDate(data) : data;

      default:
        return data;
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
    if (!input || input instanceof Date) return input;

    try {
      return new Date(input);
    } catch (e) {
      throw 'Invalid Date string or number!';
    }
  }
}
