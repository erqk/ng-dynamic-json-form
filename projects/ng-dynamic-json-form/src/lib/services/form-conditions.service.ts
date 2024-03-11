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
  FormControlConditionOperator,
  FormControlConditionType,
  FormControlConfig,
  FormControlGroupCondition,
  FormControlIfCondition,
  ValidatorConfig,
} from '../models';
import { ConditionExtracted } from '../models/condition-extracted.interface';
import { getValueInObject } from '../utilities/get-value-in-object';
import { FormValidationService } from './form-validation.service';

@Injectable()
export class FormConditionsService {
  /**https://github.com/angular/angular/issues/17824#issuecomment-353239017 */
  private readonly _renderer2 = inject(RendererFactory2).createRenderer(
    null,
    null
  );
  private readonly _formValidationService = inject(FormValidationService);
  private _controlStatusUpdating = false;

  /**To differentiate the host element from multiple ng-dynamic-json-form instances */
  hostIndex = 0;

  /**The host element for each NgDynamicJsonForm instance */
  hostEl: HTMLElement | null = null;

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

  /**Get the target element by using `id` on each `div` inside current NgDynamicJsonForm instance */
  private _getTargetEl$(controlPath: string): Observable<HTMLElement | null> {
    return new Observable((subscriber) => {
      window.requestAnimationFrame(() => {
        // Must escape the "." character so that querySelector will work correctly
        const element = this.hostEl?.querySelector(
          `div#${controlPath.replaceAll('.', '\\.')}`
        );

        subscriber.next(!element ? null : (element as HTMLElement));
        subscriber.complete();
        subscriber.unsubscribe();
      });
    });
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
          .map((x) => form.get(this._getControlPath(x[0])))
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
          // Filter the duplicated conditions,
          // to make sure `valueChanges` will trigger only once for each control
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
      const valuePath = controlPath.split(',')?.[1]?.trim();
      const control = form.get(this._getControlPath(controlPath));

      if (!control) return undefined;

      // Get the value for the specific property if valuePath is provided
      const currentValue = !valuePath
        ? control.value
        : getValueInObject(control.value, valuePath);

      return this._booleanResult(currentValue, controlValue, operator);
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
    current: any,
    target: any,
    operator: FormControlConditionOperator
  ): boolean {
    switch (operator) {
      case '===':
        return current === target;

      case '!==':
        return current !== target;

      case '>=':
        return current >= target;

      case '>':
        return current > target;

      case '<=':
        return current <= target;

      case '<':
        return current < target;

      case 'includes':
        return current.includes(target);

      case 'notIncludes':
        return !current.includes(target);
    }
  }

  /**Get the proper control path from the config if the path contains ',' */
  private _getControlPath(path: string): string {
    const paths = path.split(',');
    return paths[0].trim();
  }
}
