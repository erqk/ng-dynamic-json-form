import { Injectable, RendererFactory2, inject } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
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
  ConditionType,
  ConditionsExtracted,
  ConditionsGroup,
  ConditionsIfTupple,
  FormControlConfig,
  ValidatorConfig,
} from '../models';
import { getBooleanOperationResult } from '../utilities/get-boolean-operation-result';
import { getControlAndValuePath } from '../utilities/get-control-and-value-path';
import { getValueInObject } from '../utilities/get-value-in-object';
import { FormValidationService } from './form-validation.service';
import { GlobalVariableService } from './global-variable.service';

@Injectable()
export class FormConditionsService {
  /**https://github.com/angular/angular/issues/17824#issuecomment-353239017 */
  private _renderer2 = inject(RendererFactory2).createRenderer(null, null);
  private _globalVariableService = inject(GlobalVariableService);
  private _formValidationService = inject(FormValidationService);
  private _controlStatusUpdating = false;

  /**Listen to the controls that specified in `conditions` to trigger the `targetControl` status and validators
   * @param form The root form
   * @param configs The JSON data
   */
  formConditionsEvent$(
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

  private _updateControlStatus(
    form: FormGroup,
    data: ConditionsExtracted[]
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
        }, {} as { [key in ConditionType]?: boolean });

        this._toggleValidators(targetControl, boolResults, validators);
      }
    }
  }

  /**Get the target element by using `id` on each `div` inside current NgDynamicJsonForm instance */
  private _getTargetEl$(controlPath: string): Observable<HTMLElement | null> {
    return new Observable((subscriber) => {
      window.requestAnimationFrame(() => {
        // Must escape the "." character so that querySelector will work correctly
        const element = this._globalVariableService.hostElement?.querySelector(
          `#${controlPath.replaceAll('.', '\\.')}`
        );

        subscriber.next(!element ? null : (element as HTMLElement));
        subscriber.complete();
        subscriber.unsubscribe();
      });
    });
  }

  private _toggleElementVisibility(
    hidden: boolean,
    data: ConditionsExtracted
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
    boolResults: { [key in ConditionType]?: boolean },
    validatorConfig: ValidatorConfig[]
  ): void {
    if (!Object.keys(boolResults).length) return;

    const configFilterd = validatorConfig.filter(({ name }) => {
      const bool = boolResults[name];
      // Let `undefined` pass the filter because this validator is not under control of conditions.
      return bool === undefined ? true : bool;
    });

    const validators = this._formValidationService.getValidators(configFilterd);

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
          .map((x) => form.get(getControlAndValuePath(x[0]).controlPath))
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
    input: ConditionsGroup
  ): ConditionsIfTupple[] {
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
    result: ConditionsExtracted[] = []
  ): ConditionsExtracted[] {
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
          // Filter the duplicated conditions,
          // to make sure `valueChanges` will trigger only once for each control
          return !result.some(({ targetControlPath: right }) => left === right);
        });

        result.push(...childConditions);
      }
    }

    return result;
  }

  /**Evaluate the boolean result from the condition. */
  private _getConditionsResult(
    form: FormGroup,
    conditions: ConditionsGroup
  ): boolean | undefined {
    let result: boolean | undefined = undefined;
    const _conditions = conditions['&&'] || conditions['||'] || [];
    if (!_conditions.length) return result;

    const groupOperator = Object.keys(conditions)[0];

    const ifConditions = _conditions.filter((x) =>
      Array.isArray(x)
    ) as ConditionsIfTupple[];

    const childConditions = _conditions.find((x) => '&&' in x || '||' in x) as
      | ConditionsGroup
      | undefined;

    const childResult = !childConditions
      ? result
      : this._getConditionsResult(form, childConditions);

    const predicateFn = (value: ConditionsIfTupple) => {
      const [controlPath, operator, controlValue] = value;
      const control = form.get(getControlAndValuePath(controlPath).controlPath);

      if (!control) return undefined;

      const valuePath = getControlAndValuePath(controlPath).valuePath;

      // Get the value for the specific property if valuePath is provided
      const currentValue = !valuePath
        ? control.value
        : getValueInObject(control.value, valuePath);

      return getBooleanOperationResult(currentValue, controlValue, operator);
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
}
