import { Injectable } from '@angular/core';
import IMask, { FactoryArg, Masked } from 'imask/esm/index';
import { FormControlConfig } from '../models';

@Injectable()
export class ConfigMappingService {
  getCorrectedConfig(input: FormControlConfig): FormControlConfig {
    const config = structuredClone(input) as FormControlConfig;
    const { formControlName, props, inputMask, children = [] } = config;

    config.formControlName = this.getFormControlName(formControlName);
    config.value = config.value ?? this.getFallbackValue(config);

    if (props) {
      config.props = Object.keys(props).reduce((acc, key) => {
        if (typeof acc[key] === 'string') {
          acc[key] = this.parseStringValue(acc[key]);
        }

        return acc;
      }, props);
    }

    if (inputMask) {
      this.mapInputMask(inputMask);
    }

    if (children.length > 0) {
      config.children = children.map((x) => this.getCorrectedConfig(x));
    }

    return config;
  }

  private getFallbackValue(item: FormControlConfig): any {
    switch (item.type) {
      case 'checkbox': {
        const isBinary = !item.options?.src && item.options?.data?.length === 1;
        return isBinary ? false : [];
      }

      case 'switch':
        return false;

      default:
        return item.value;
    }
  }

  private getFormControlName(name: string): string {
    const replaceSpaces = (str: string) => str.replaceAll(/\s/g, '_');
    const removeSpecialCharacters = (str: string) =>
      str.replaceAll(/[.,]/g, '');

    const result = [replaceSpaces, removeSpecialCharacters].reduce(
      (acc, fn) => fn(acc),
      name,
    );

    return result;
  }

  private mapInputMask(val: FactoryArg): void {
    const mask = val as Masked;

    // Number, RangeMask, Regex or pattern
    if (typeof mask.mask === 'string') {
      const _mask = mask.mask.trim();

      if (_mask === 'Number') mask.mask = Number;
      if (_mask === 'Imask.MaskedRange') mask.mask = IMask.MaskedRange;
      if (new RegExp(/^\/.*\/\w*?$/).test(_mask)) {
        const array = _mask.split('/');
        const flags = array.concat().pop();
        mask.mask = new RegExp(array[1], flags);
      }
    }

    // Dynamic mask
    if (Array.isArray(mask.mask)) {
      mask.mask.forEach((x) => this.mapInputMask(x));
    }
  }

  private parseStringValue(input: string): any {
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
    if (this.isIsoDate(_input)) {
      return new Date(_input);
    }

    return _input;
  }

  /**https://stackoverflow.com/questions/52869695/check-if-a-date-string-is-in-iso-and-utc-format */
  private isIsoDate(str: string) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    const d = new Date(str);
    return d instanceof Date && !isNaN(d.getTime()) && d.toISOString() === str;
  }
}
