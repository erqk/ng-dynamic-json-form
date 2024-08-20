import { Injectable, RendererFactory2, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {
  Observable,
  distinctUntilChanged,
  filter,
  from,
  mergeMap,
  of,
  startWith,
  tap,
} from 'rxjs';
import {
  Conditions,
  ConditionsActionEnum,
  ConditionsGroup,
  ConditionsStatementTupple,
  FormControlConfig,
  ValidatorConfig,
} from '../models';
import { evaluateConditionsStatements } from '../utilities/evaluate-conditions-statements';
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
  private _lastExecutedAction: {
    [controlPath: string]: {
      validatorConfigs?: ValidatorConfig[];
      disabled?: boolean;
      hidden?: boolean;
    };
  } = {};

  /**Listen to the controls that specified in `conditions` to trigger the `targetControl` status and validators
   * @param form The root form
   * @param configs The JSON data
   */
  listenConditions$(): Observable<any> {
    const configs = this._globalVariableService.rootConfigs;
    const form = this._globalVariableService.rootForm;

    if (!configs.length || !form) {
      return of(null);
    }

    const controls = this._getPathsOfControlsToListen(configs)
      .map((x) => form.get(x))
      .filter(Boolean) as AbstractControl[];

    const configsWithConditions = this._configsWithConditions(configs);
    const valueChanges$ = (c: AbstractControl) =>
      c.valueChanges.pipe(
        startWith(c.value),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      );

    return from(controls).pipe(
      mergeMap((x) => valueChanges$(x)),
      tap(() => this._onConditionsMet(configsWithConditions))
    );
  }

  private _onConditionsMet(data: {
    [fullControlPath: string]: FormControlConfig;
  }): void {
    const form = this._globalVariableService.rootForm;
    if (!form) return;

    for (const key in data) {
      const control = form.get(key);
      if (!control) continue;

      const config = data[key];
      const conditions = config.conditions!;

      this._executeCustomActions(conditions, control);
      this._toggleValidators(config, control, key);
      this._toggleControlStates(conditions, control, key);
    }
  }

  private _toggleControlStates(
    conditions: Conditions,
    control: AbstractControl,
    controlPath: string
  ): void {
    const actionDisabled = ConditionsActionEnum['control.disabled'];
    const actionHidden = ConditionsActionEnum['control.hidden'];
    const actions = Object.keys(conditions).filter(
      (x) => x === actionDisabled || x === actionHidden
    );

    if (!actions.length) {
      return;
    }

    const toggleDisabled = (disabled: boolean) => {
      disabled ? control.disable() : control.enable();
    };

    const disableControl = (bool: boolean) => {
      const noChange = this._getLastAction(controlPath, 'disabled') === bool;
      if (noChange) return;

      this._setLastAction(controlPath, 'disabled', bool);
      toggleDisabled(bool);
    };

    const hideControl = (bool: boolean) => {
      const noChange = this._getLastAction(controlPath, 'hidden') === bool;
      if (noChange) return;

      this._setLastAction(controlPath, 'hidden', bool);
      this._getTargetEl$(controlPath)
        .pipe(
          filter(Boolean),
          tap((x) => {
            toggleDisabled(bool);
            this._renderer2.setStyle(x, 'display', bool ? 'none' : null);
          })
        )
        .subscribe();
    };

    for (const action of actions) {
      const bool = this._evaluateConditionsStatement(conditions[action]!);
      if (bool === undefined) return;
      if (action === actionDisabled) disableControl(bool);
      if (action === actionHidden) hideControl(bool);
    }
  }

  private _toggleValidators(
    config: FormControlConfig,
    control: AbstractControl,
    controlPath: string
  ): void {
    const { conditions = {}, validators = [] } = config;
    const actions = Object.keys(conditions).filter((x) =>
      new RegExp(/^validator\.[a-zA-z]{1,}$/).test(x)
    );

    if (!actions.length) {
      return;
    }

    const validatorConfigs = validators.filter((x) => {
      const actionName = `validator.${x.name ?? ''}` as ConditionsActionEnum;
      const target = actions.includes(actionName);

      return !target
        ? false
        : this._evaluateConditionsStatement(conditions[actionName]!);
    });

    const prevConfigs = this._getLastAction(controlPath, 'validatorConfigs');
    const noChange =
      JSON.stringify(prevConfigs) === JSON.stringify(validatorConfigs);

    if (!noChange) {
      const resultValidators =
        this._formValidationService.getValidators(validatorConfigs);

      control.setValidators(resultValidators);
      control.updateValueAndValidity();

      this._setLastAction(controlPath, 'validatorConfigs', validatorConfigs);
    }
  }

  private _executeCustomActions(
    conditions: Conditions,
    control: AbstractControl
  ): void {
    const definedActions = Object.values(ConditionsActionEnum);
    const customActions = Object.keys(conditions).filter(
      (x) => !definedActions.includes(x as ConditionsActionEnum)
    );

    if (!customActions.length) {
      return;
    }

    for (const action of customActions) {
      const bool = this._evaluateConditionsStatement(conditions[action]!);
      if (!bool) return;

      const functions = this._globalVariableService.conditionsActionFuntions;

      if (!functions) return;
      if (!functions[action]) return;
      if (typeof functions[action] !== 'function') return;

      functions[action](control);
    }
  }

  private _setLastAction(
    key: string,
    type: keyof (typeof this._lastExecutedAction)[''],
    value: boolean | ValidatorConfig[]
  ): void {
    const target = this._lastExecutedAction[key];

    if (!target) {
      Object.assign(this._lastExecutedAction, { [key]: { [type]: value } });
      return;
    }

    Object.assign(target, { [type]: value });
  }

  private _getLastAction(
    key: string,
    type: keyof (typeof this._lastExecutedAction)['']
  ): boolean | ValidatorConfig[] | undefined {
    const target = this._lastExecutedAction[key];
    return !target ? undefined : target[type];
  }

  /**Get the target element by using `id`(full control path) on each `div` inside current NgDynamicJsonForm instance */
  private _getTargetEl$(controlPath: string): Observable<HTMLElement | null> {
    return new Observable((subscriber) => {
      window.requestAnimationFrame(() => {
        // Use `CSS.escape()` to escape all the invalid characters.
        const element = this._globalVariableService.hostElement?.querySelector(
          `#${CSS.escape(controlPath)}`
        );

        subscriber.next(!element ? null : (element as HTMLElement));
        subscriber.complete();
        subscriber.unsubscribe();
      });
    });
  }

  private _getPathsOfControlsToListen(configs: FormControlConfig[]): string[] {
    const extractPaths = (group: ConditionsGroup): string[] => {
      const value = group['&&'] || group['||'];
      if (!value) return [];

      return value.flatMap((x) =>
        Array.isArray(x)
          ? [
              this._getControlPathFromStatement(x[0]) ?? '',
              this._getControlPathFromStatement(x[2]) ?? '',
            ]
          : extractPaths(x)
      );
    };

    const result = configs.reduce((acc, curr) => {
      const { conditions, children } = curr;
      const paths = !conditions
        ? []
        : Object.values(conditions)
            .filter((x) => Boolean(x) && Object.keys(x!).length > 0)
            .flatMap((x) => extractPaths(x!))
            .filter(Boolean);

      const childrenPaths = !children?.length
        ? []
        : this._getPathsOfControlsToListen(children);

      acc.push(...paths.concat(childrenPaths));
      return acc;
    }, [] as string[]);

    const removeDuplicates = [...new Set(result)];
    return removeDuplicates;
  }

  /**Get all the configs which has `conditions` set, with it's full control path as the key. */
  private _configsWithConditions(
    configs: FormControlConfig[],
    parentControlPath?: string
  ): { [fullControlPath: string]: FormControlConfig } {
    const result = configs.reduce((acc, curr) => {
      const { conditions, children } = curr;
      const fullControlPath = parentControlPath
        ? `${parentControlPath}.${curr.formControlName}`
        : curr.formControlName;

      if (conditions) acc[fullControlPath] = curr;
      if (children && children.length) {
        acc = {
          ...acc,
          ...this._configsWithConditions(children, fullControlPath),
        };
      }

      return acc;
    }, {} as { [fullControlPath: string]: FormControlConfig });

    return result;
  }

  private _evaluateConditionsStatement(
    conditionsGroup: ConditionsGroup
  ): boolean | undefined {
    const form = this._globalVariableService.rootForm;

    if (!form || (!conditionsGroup['&&'] && !conditionsGroup['||'])) {
      return undefined;
    }

    const mapTuppleFn = (tupple: ConditionsStatementTupple) => {
      const [left, operator, right] = tupple;
      const result = [
        this._getValueFromStatement(left),
        operator,
        this._getValueFromStatement(right),
      ] as ConditionsStatementTupple;

      return result;
    };

    return evaluateConditionsStatements(conditionsGroup, mapTuppleFn);
  }

  /**Get control path using the string in the conditions statement tupple.
   * - `['controlA', '===', 'text']` => Should get "controlA"
   * - `['controlA', '===', 'controlB']` => Should get "controlA", "controlB" individually
   * - `['value', '===', 'controlA,prop1']` => Should get "controlA"
   */
  private _getControlPathFromStatement(input: any): string | undefined {
    const form = this._globalVariableService.rootForm;
    if (!form) return undefined;
    if (typeof input !== 'string') return undefined;

    const paths = getControlAndValuePath(input);
    const targetControl = form.get(paths.controlPath);

    if (!targetControl) return undefined;
    return paths.controlPath;
  }

  /**Get the value from the statement, either it's literaly a value or comes from a control
   *
   * ```json
   * {
   *   controlA: 'textValue',
   *   controlB: false
   * }
   * ```
   *
   * - [controlA, "===", "value"] => ["textValue", "===", "value"]
   * - [false, "===", "controlB"] => [false, "===", false]
   */
  private _getValueFromStatement(input: any): any {
    const form = this._globalVariableService.rootForm;

    if (!form) return input;
    if (typeof input !== 'string') return input;

    const paths = getControlAndValuePath(input);
    const targetControl = form.get(paths.controlPath);

    // If it is string but not found in the FormGroup,
    // then we consider it as literal string value,
    // not control path.
    if (!targetControl) return input;

    const result = !paths.valuePath
      ? targetControl.value
      : getValueInObject(targetControl.value, paths.valuePath);

    return result;
  }
}
