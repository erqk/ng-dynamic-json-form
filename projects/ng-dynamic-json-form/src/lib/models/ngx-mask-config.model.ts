import { EventEmitter } from '@angular/core';

// https://github.com/JsDaddy/ngx-mask/blob/develop/projects/ngx-mask-lib/src/lib/ngx-mask.config.ts
export interface NgxMaskConfig {
  mask: string;
  suffix: string;
  prefix: string;
  thousandSeparator: string;
  decimalMarker: '.' | ',' | ['.', ','];
  clearIfNotMatch: boolean;
  showTemplate: boolean;
  showMaskTyped: boolean;
  placeHolderCharacter: string;
  shownMaskExpression: string;
  dropSpecialCharacters: boolean | string[];
  specialCharacters: string[];
  hiddenInput: boolean | undefined;
  validation: boolean;
  separatorLimit: string;
  allowNegativeNumbers: boolean;
  leadZeroDateTime: boolean;
  triggerOnMaskChange: boolean;
  maskFilled: EventEmitter<void>;
  patterns: {
    [character: string]: {
      pattern: RegExp;
      optional?: boolean;
      symbol?: string;
    };
  };
}
