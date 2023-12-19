import { Injectable, RendererFactory2, inject } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  isFormArray,
  isFormControl,
  isFormGroup,
} from '@angular/forms';
import {
  Observable,
  debounceTime,
  filter,
  from,
  mergeMap,
  of,
  startWith,
  tap,
} from 'rxjs';
import {
  FormControlConditionOperator,
  FormControlConditionType,
  FormControlConfig,
  FormControlGroupCondition,
  FormControlIfCondition,
  ValidatorConfig,
} from '../models';
import { ConditionExtracted } from '../models/condition-extracted.interface';
import { clearEmpties } from '../utils/clear-empties';
import { FormValidatorService } from './form-validator.service';

@Injectable()
export class FormStatusService {
  /**https://github.com/angular/angular/issues/17824#issuecomment-353239017 */
  private _renderer2 = inject(RendererFactory2).createRenderer(null, null);
  private _formValidatorService = inject(FormValidatorService);
  private _controlStatusUpdating = false;

  /**To differentiate the host element from multiple ng-dynamic-json-form instances */
  hostIndex = 0;

  formErrorEvent$(form: FormGroup): Observable<any> {
    return form.statusChanges.pipe(
      startWith(form.status),
      debounceTime(0),
      tap(() => {
        const errors = this._getFormErrors(form);
        form.setErrors(errors);
      })
    );
  }

  /**Listen to the controls that specified in `conditions` to trigger the `targetControl` status and validators
   * @param form The root form
   * @param configs The JSON data
   */
  formControlConditonsEvent$(
    form: FormGroup,
    configs: FormControlConfig[]
  ): Observable<any> {
    if (!configs.length) return of(null);

    const controls = this._getControlsToListen(form, configs);
    const conditionsExtracted = this._extractConditions(form, configs);

    return from(controls).pipe(
      mergeMap((x) => x.valueChanges.pipe(startWith(x.value))),
      filter(() => !this._controlStatusUpdating),
      debounceTime(0),
      tap(() => {
        this._controlStatusUpdating = true;
        this._updateControlStatus(form, conditionsExtracted);
        this._controlStatusUpdating = false;
      })
    );
  }

  /**Get all the errors under this `FormGroup` following the hierachy
   * @example
   * root: {
   *  control1: ValidationErrors,
   *  control2: {
   *    childA: ValidationErrors
   *  }
   * }
   */
  private _getFormErrors(
    control: AbstractControl,
    prevResult?: ValidationErrors | null
  ): ValidationErrors | null {
    const controlErrors = control.errors;
    let result = prevResult ? { ...prevResult } : null;
    let errorsGet = null;

    if (isFormControl(control)) {
      errorsGet = controlErrors;
    }

    if (isFormGroup(control)) {
      errorsGet = Object.keys(control.controls).reduce((acc, key) => {
        const err = this._getFormErrors(control.controls[key], result);
        return err ? { ...acc, [key]: err } : acc;
      }, {});
    }

    if (isFormArray(control)) {
      const childrenErrors = control.controls
        .map((x) => this._getFormErrors(x, result))
        .filter((x) => !!x);

      errorsGet = {
        ...controlErrors,
        ...childrenErrors,
      };
    }

    result = clearEmpties({ ...result, ...errorsGet });

    const noErrors = !result || !Object.keys(result).length;
    return noErrors ? null : result;
  }

  private _updateControlStatus(
    form: FormGroup,
    data: ConditionExtracted[]
  ): void {
    for (const item of data) {
      const { conditions, targetControl, validators } = item;
      const { disabled, hidden, ...rest } = conditions;

      if (disabled) {
        const bool = this._getConditionsResult(form, disabled);
        if (bool === undefined) continue;

        bool ? targetControl.disable() : targetControl.enable();
      }

      if (hidden) {
        const bool = this._getConditionsResult(form, hidden);
        if (bool === undefined) continue;

        this._toggleElementVisibility(bool, item);
      }

      if (rest) {
        const boolResults = Object.keys(rest).reduce((acc, key) => {
          const group = rest[key];
          if (!group) return acc;

          const bool = this._getConditionsResult(form, group);
          if (bool === undefined) return acc;

          acc[key] = bool;
          return acc;
        }, {} as { [key in FormControlConditionType]?: boolean });

        this._toggleValidators(targetControl, boolResults, validators);
      }
    }
  }

  /**Get the target element by using:
   * - `hostIndex` on each `ng-dynamic-json-form`
   * - `id` on each `grid-item-wrapper`
   */
  private _getTargetEl$(controlPath: string): Observable<HTMLElement | null> {
    const promise$ = new Promise<HTMLElement | null>((resolve) => {
      requestAnimationFrame(() => {
        const hostClass = `ng-dynamic-json-form.index-${this.hostIndex}`;

        // Must escape the "." character so that querySelector will work correctly
        const element = document.querySelector(
          `${hostClass} grid-item-wrapper#${controlPath.replace('.', '\\.')}`
        ) as HTMLElement | null;

        resolve(element);
      });
    });

    return from(promise$);
  }

  private _toggleElementVisibility(
    hidden: boolean,
    data: ConditionExtracted
  ): void {
    const { targetControl, targetControlPath } = data;

    this._getTargetEl$(targetControlPath)
      .pipe(
        tap((x) => {
          if (!x) return;
          this._controlStatusUpdating = true;
          this._renderer2.setStyle(x, 'display', hidden ? 'none' : null);
          hidden ? targetControl.disable() : targetControl.enable();
          this._controlStatusUpdating = false;
        })
      )
      .subscribe();
  }

  private _toggleValidators(
    control: AbstractControl,
    boolResults: { [key in FormControlConditionType]?: boolean },
    validatorConfig: ValidatorConfig[]
  ): void {
    if (!Object.keys(boolResults).length) return;

    const configFilterd = validatorConfig.filter(({ name, value }) => {
      const bool = name === 'custom' ? boolResults[value] : boolResults[name];
      // Let `undefined` pass the filter because this validator it's not under control of conditions.
      return bool === undefined ? true : bool;
    });
    
    const validators = this._formValidatorService.getValidators(configFilterd);

    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  /**Get all the `AbstractControl` to listen from conditions
   */
  private _getControlsToListen(
    form: FormGroup,
    configs: FormControlConfig[] = [],
    result: AbstractControl[] = []
  ): AbstractControl[] {
    if (!configs.length) return [];

    for (const item of configs) {
      const { conditions, children = [] } = item;

      if (conditions) {
        const controls = Object.values(conditions)
          .filter((x) => !!x)
          .flatMap((x) => this._getFlattenIfConditions(x!))
          .map((x) => form.get(x[0]))
          .filter((x) => !!x) as AbstractControl[];

        result.push(...controls);
      }

      if (children.length > 0) {
        result.push(...this._getControlsToListen(form, item.children, result));
      }
    }

    return [...new Set(result)];
  }

  private _getFlattenIfConditions(
    input: FormControlGroupCondition
  ): FormControlIfCondition[] {
    const conditions = input['&&'] || input['||'] || [];
    const result = conditions
      .map((x) => (!Array.isArray(x) ? this._getFlattenIfConditions(x) : [x]))
      .flat();

    return result;
  }

  /**Extract all the conditions from JSON data and flatten them,
   * then output to an array of `ConditionExtracted`
   */
  private _extractConditions(
    form: FormGroup,
    configs: FormControlConfig[],
    prevControlPath = '',
    result: ConditionExtracted[] = []
  ): ConditionExtracted[] {
    for (const item of configs) {
      const {
        formControlName,
        conditions,
        children = [],
        validators = [],
      } = item;

      const targetControlPath = prevControlPath
        ? `${prevControlPath}.${formControlName}`
        : formControlName;

      if (conditions) {
        const targetControl = form.get(targetControlPath);
        if (!targetControl) continue;

        result.push({
          targetControl,
          targetControlPath,
          conditions,
          validators,
        });
      }

      if (children.length > 0) {
        const childConditions = this._extractConditions(
          form,
          children,
          targetControlPath,
          result
        ).filter(({ targetControlPath: left }) => {
          return !result.some(({ targetControlPath: right }) => left === right);
        });

        result.push(...childConditions);
      }
    }

    return result;
  }

  /**Evaluate the boolean result from the condition given. */
  private _getConditionsResult(
    form: FormGroup,
    conditions: FormControlGroupCondition
  ): boolean | undefined {
    let result: boolean | undefined = undefined;
    const _conditions = conditions['&&'] || conditions['||'] || [];
    if (!_conditions.length) return result;

    const groupOperator = Object.keys(conditions)[0];

    const ifConditions = _conditions.filter((x) =>
      Array.isArray(x)
    ) as FormControlIfCondition[];

    const childConditions = _conditions.find((x) => '&&' in x || '||' in x) as
      | FormControlGroupCondition
      | undefined;

    const childResult = !childConditions
      ? result
      : this._getConditionsResult(form, childConditions);

    const predicateFn = (value: FormControlIfCondition) => {
      const [controlPath, operator, controlValue] = value;
      const control = form.get(controlPath);

      if (!control) return undefined;
      return this._booleanResult(control.value, controlValue, operator);
    };

    switch (groupOperator) {
      case '&&':
        result = [ifConditions.every(predicateFn), childResult]
          .filter((x) => x !== undefined)
          .every((x) => x);
        break;

      case '||':
        result = [ifConditions.some(predicateFn), childResult]
          .filter((x) => x !== undefined)
          .some((x) => x);
        break;
    }

    return result;
  }

  private _booleanResult(
    left: any,
    right: any,
    operator: FormControlConditionOperator
  ): boolean {
    switch (operator) {
      case '===':
        return left === right;

      case '!==':
        return left !== right;

      case '>=':
        return left >= right;

      case '>':
        return left > right;

      case '<=':
        return left <= right;

      case '<':
        return left < right;
    }
  }
}
