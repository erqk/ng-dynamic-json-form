import { Injectable } from '@angular/core';
import { GridLayoutService } from './grid-layout.service';
import { FormControlConfig } from '../models';
import { NgxMaskConfig } from '../models/ngx-mask-config.model';

@Injectable()
export class FormConfigInitService {
  private _maskDefaultSpecialCharacters: string[] = [
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

  private _maskDefaultPatterns: NgxMaskConfig['patterns'] = {
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

  constructor(private _gridLayoutService: GridLayoutService) {}

  init(config: FormControlConfig[]): void {
    this._gridLayoutService.setGridColumn(config);
    this._initNgxMaskPatterns(config);
  }

  private _initNgxMaskPatterns(config: FormControlConfig[]): void {
    for (const item of config) {
      const noChildren = !item.children?.length;
      const noFormArray = !item.formArray || !item.formArray.template.length;

      if (!item.ngxMaskConfig && noChildren && noFormArray) {
        continue;
      }

      // If one of the `specialCharacters` or `patterns` is provided in `ngxMaskConfig`,
      // we need to set all the default value because they will be overwritten by ngx-mask
      const specialCharacters = item?.ngxMaskConfig?.specialCharacters;
      const patterns = item?.ngxMaskConfig?.patterns;
      const patternsMapped = !patterns
        ? null
        : Object.keys(patterns).reduce((obj, key) => {
            // Type can be string if config is come from parsed JSON
            const patternRegex = obj[key].pattern as RegExp | string;

            obj[key].pattern =
              typeof patternRegex === 'string'
                ? new RegExp(patternRegex)
                : patternRegex;

            return obj;
          }, patterns);

      item.ngxMaskConfig = {
        ...item.ngxMaskConfig,
        specialCharacters:
          specialCharacters && Array.isArray(specialCharacters)
            ? specialCharacters
            : this._maskDefaultSpecialCharacters,
      };

      if (patterns) {
        item.ngxMaskConfig = {
          ...item.ngxMaskConfig,
          patterns: patternsMapped ?? this._maskDefaultPatterns,
        };
      }

      if (!!item.children?.length) {
        this._initNgxMaskPatterns(item.children);
      }

      if (!!item.formArray && !!item.formArray.template) {
        this._initNgxMaskPatterns(item.formArray.template);
      }
    }
  }
}
