import { Injectable } from '@angular/core';
import Ajv, { ValidateFunction } from 'ajv';
import * as schema from '../config-schema.json';
import { FormControlConfig } from '../models';

@Injectable()
export class ConfigValidationService {
  validateAndGetConfig(configs: string | FormControlConfig[] | undefined): {
    configs: FormControlConfig[] | null;
    configValidationErrors: string[];
  } {
    if (!configs)
      return {
        configs: null,
        configValidationErrors: ['No configs found'],
      };

    const win = window as any;
    const ajv: Ajv = win.ajv || new Ajv({ allErrors: true });
    const validate: ValidateFunction<unknown> =
      win.ngDynamiJsonFormValidateFn || ajv.compile(schema);

    if (!win.ajv) {
      win.ajv = ajv;
    }

    if (!win.ngDynamiJsonFormValidateFn) {
      win.ngDynamiJsonFormValidateFn = validate;
    }

    try {
      const data = Array.isArray(configs)
        ? { configs }
        : JSON.parse(configs.replaceAll('\\n', '').replaceAll('\\', ''));

      const valid = validate(data);

      if (!valid) {
        return {
          configs: null,
          configValidationErrors: [
            ...(validate.errors ?? []).map((x) =>
              JSON.stringify(x, undefined, 4)
            ),
          ],
        };
      }

      return {
        configs: (data as any)['configs'] ?? null,
        configValidationErrors: [],
      };
    } catch (err: any) {
      return {
        configs: null,
        configValidationErrors: [
          // https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify
          JSON.stringify(err, Object.getOwnPropertyNames(err), 4),
        ],
      };
    }
  }
}
