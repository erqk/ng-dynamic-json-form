import { Injectable, inject } from '@angular/core';
import { ErrorObject, ValidateFunction } from 'ajv';
import { FormControlConfig } from '../models';
import { ConfigValidationErrors } from '../models/config-validation-errors.interface';
import { getValueInObject } from '../utilities/get-value-in-object';
import { ConfigMainSchema } from '../utilities/schema-validator';
import { ConfigMappingService } from './config-mapping.service';

const validate = ConfigMainSchema as ValidateFunction;
@Injectable()
export class ConfigValidationService {
  private _configMappingService = inject(ConfigMappingService);

  validateAndGetConfig(input: string | FormControlConfig[] | undefined): {
    configs: FormControlConfig[] | null;
    errors?: ConfigValidationErrors[];
  } {
    const failedResult = {
      configs: null,
      errors: [{ errors: 'No configs found' }],
    };

    if (!input) {
      return failedResult;
    }

    if (Array.isArray(input)) {
      if (!input.length) {
        return failedResult;
      }

      if (!validate(input)) {
        failedResult.errors = (validate.errors || []).map((x) =>
          this._getBeautifyErrors(x, input)
        );

        return failedResult;
      }

      const configsGet = input
        .filter(Boolean)
        .map((x) => this._configMappingService.getCorrectedConfig(x));

      return { configs: configsGet };
    }

    if (typeof input === 'string') {
      try {
        const data = JSON.parse(input);
        return this.validateAndGetConfig(data);
      } catch (err: any) {
        failedResult.errors = [
          {
            // https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify
            errors: JSON.stringify(err, Object.getOwnPropertyNames(err), 4),
          },
        ];

        return failedResult;
      }
    }

    return failedResult;
  }

  private _getBeautifyErrors(
    err: ErrorObject,
    configs: FormControlConfig[]
  ): ConfigValidationErrors {
    const paths = err.instancePath.substring(1).split('/');
    const lastSegment = paths[paths.length - 1];
    const isObject = new RegExp(/^\d+$/).test(lastSegment);
    const configPath = isObject ? paths.join('.') : paths[paths.length - 2];
    const config = getValueInObject(configs, configPath);
    const errorMessage = isObject
      ? err.message ?? ''
      : `"${lastSegment}" ${err.message}`;

    return {
      errors: errorMessage,
      config,
    };
  }
}
