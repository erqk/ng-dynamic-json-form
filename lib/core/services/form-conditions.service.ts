import { Injectable, RendererFactory2, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
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
  private _pauseEvent = false;

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

    return from(controls).pipe(
      mergeMap((x) => x.valueChanges.pipe(startWith(x.value))),
      filter(() => !this._pauseEvent),
      debounceTime(0),
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
      const actions = Object.keys(conditions) as ConditionsActionEnum[];

      for (const action of actions) {
        const bool = this._evaluateConditionsStatement(conditions[action]!);
        if (bool === undefined) return;

        const isPredefinedAction =
          Object.values(ConditionsActionEnum).includes(action);
        const toggleState = new RegExp(/^control\.[a-zA-Z]{1,}$/).test(action);
        const toggleValidators = new RegExp(/^validator\.[a-zA-z]{1,}$/).test(
          action
        );

        if (isPredefinedAction) {
          if (toggleState) {
            this._toggleControlState({
              action,
              bool,
              control,
              controlPath: key,
            });
          }

          if (toggleValidators) {
            this._toggleValidators({
              action,
              bool,
              control,
              validatorConfigs: config.validators ?? [],
            });
          }
        } else if (bool) {
          const functions =
            this._globalVariableService.conditionsActionFuntions;

          if (!functions) return;
          if (!functions[action]) return;
          if (typeof functions[action] !== 'function') return;

          functions[action](control);
        }
      }
    }
  }

  private _toggleControlState(data: {
    action: ConditionsActionEnum;
    bool: boolean;
    control: AbstractControl;
    controlPath: string;
  }): void {
    const { action, bool, control, controlPath } = data;
    const toggleDisabled = (disabled: boolean) => {
      this._pauseEvent = true;
      disabled ? control.disable() : control.enable();
      this._pauseEvent = false;
    };

    switch (action) {
      case ConditionsActionEnum['control.disabled']:
        toggleDisabled(bool);
        break;

      case ConditionsActionEnum['control.hidden']:
        toggleDisabled(bool);

        this._getTargetEl$(controlPath)
          .pipe(
            filter(Boolean),
            tap((x) => {
              this._renderer2.setStyle(x, 'display', bool ? 'none' : null);
            })
          )
          .subscribe();
        break;
    }
  }

  private _toggleValidators(data: {
    action: ConditionsActionEnum;
    bool: boolean;
    control: AbstractControl;
    validatorConfigs: ValidatorConfig[];
  }): void {
    const { action, bool, control, validatorConfigs } = data;
    const _validatorConfigs = bool
      ? validatorConfigs
      : validatorConfigs.filter(
          (x) => x.name !== action.replace('validator.', '')
        );

    const validators =
      this._formValidationService.getValidators(_validatorConfigs);

    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  /**Get the target element by using `id`(full control path) on each `div` inside current NgDynamicJsonForm instance */
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
