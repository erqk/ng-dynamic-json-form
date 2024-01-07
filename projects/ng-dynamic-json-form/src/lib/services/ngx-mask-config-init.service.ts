import { Injectable } from '@angular/core';
import { FormControlConfig } from '../models';
import { NgxMaskConfig } from '../models/ngx-mask-config.interface';

@Injectable()
export class NgxMaskConfigInitService {
  private _defaultSpecialCharacters: string[] = [
    '-',
    '/',
    '(',
    ')',
    '.',
    ':',
    ' ',
    '+',
    ',',
    '@',
    '[',
    ']',
    '"',
    "'",
  ];

  private _defaultPatterns: NgxMaskConfig['patterns'] = {
    '0': {
      pattern: new RegExp('\\d'),
    },
    '9': {
      pattern: new RegExp('\\d'),
      optional: true,
    },
    X: {
      pattern: new RegExp('\\d'),
      symbol: '*',
    },
    A: {
      pattern: new RegExp('[a-zA-Z0-9]'),
    },
    S: {
      pattern: new RegExp('[a-zA-Z]'),
    },
    U: {
      pattern: new RegExp('[A-Z]'),
    },
    L: {
      pattern: new RegExp('[a-z]'),
    },
    d: {
      pattern: new RegExp('\\d'),
    },
    m: {
      pattern: new RegExp('\\d'),
    },
    M: {
      pattern: new RegExp('\\d'),
    },
    H: {
      pattern: new RegExp('\\d'),
    },
    h: {
      pattern: new RegExp('\\d'),
    },
    s: {
      pattern: new RegExp('\\d'),
    },
  };

  /**
   * @description Init `ngxMaskConfig` before bind it to the `mask` directive.
   *
   * **Why ?**
   *
   * If one of the `specialCharacters` or `patterns` is provided in `ngxMaskConfig`,
   * we need to set all the default value because they will be overwritten by ngx-mask
   */
  getConfig(input: FormControlConfig): Partial<NgxMaskConfig> | undefined {
    const { ngxMaskConfig } = input;
    if (!ngxMaskConfig) return undefined;

    const { specialCharacters, patterns } = ngxMaskConfig;

    const result = {
      ...ngxMaskConfig,
      specialCharacters: Array.isArray(specialCharacters)
        ? specialCharacters
        : this._defaultSpecialCharacters,
      patterns: !patterns
        ? this._defaultPatterns
        : this._getMappedPatterns(patterns),
    };

    return result;
  }

  private _getMappedPatterns(
    patterns: NgxMaskConfig['patterns'] | undefined
  ): NgxMaskConfig['patterns'] | undefined {
    if (!patterns) {
      return undefined;
    }

    return Object.keys(patterns).reduce((obj, key) => {
      // Type can be string if config is come from parsed JSON
      const patternRegex = obj[key].pattern as RegExp | string;

      obj[key].pattern =
        typeof patternRegex === 'string'
          ? new RegExp(patternRegex)
          : patternRegex;

      return obj;
    }, patterns);
  }
}
