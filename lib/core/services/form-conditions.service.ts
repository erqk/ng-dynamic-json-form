import { Injectable, inject } from '@angular/core';
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
  ConditionsStatementTuple,
  FormControlConfig,
} from '../models';
import { evaluateConditionsStatements } from '../utilities/evaluate-conditions-statements';
import { getControlAndValuePath } from '../utilities/get-control-and-value-path';
import { getValueInObject } from '../utilities/get-value-in-object';
import { FormValidationService } from './form-validation.service';
import { GlobalVariableService } from './global-variable.service';

@Injectable()
export class FormConditionsService {
  private globalVariableService = inject(GlobalVariableService);
  private formValidationService = inject(FormValidationService);

  /**Listen to the controls that specified in `conditions` to trigger the `targetControl` status and validators
   * @param form The root form
   * @param configs The JSON data
   */
  listenConditions$(): Observable<any> {
    const configs = this.globalVariableService.rootConfigs;
    const form = this.globalVariableService.rootForm;

    if (!configs.length || !form || typeof window === 'undefined') {
      return of(null);
    }

    const controls = this.getPathsOfControlsToListen(configs)
      .map((x) => form.get(x))
      .filter(Boolean) as AbstractControl[];

    const configsWithConditions = this.configsWithConditions(configs);
    const valueChanges$ = (c: AbstractControl) =>
      c.valueChanges.pipe(
        startWith(c.value),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
        // Should avoid using debounceTime() here, as it will cause flickers when toggle the visibility
      );

    return from(controls).pipe(
      mergeMap((x) => valueChanges$(x)),
      tap(() => this.handleValueChanges(configsWithConditions))
    );
  }

  private handleValueChanges(data: {
    [fullControlPath: string]: FormControlConfig;
  }): void {
    const form = this.globalVariableService.rootForm;
    if (!form) return;

    for (const key in data) {
      const control = form.get(key);
      if (!control) continue;

      const config = data[key];
      const conditions = config.conditions!;

      this.executeCustomActions(conditions, control);
      this.toggleValidators(config, control);
      this.toggleControlStates(conditions, control, key);
    }
  }

  private toggleControlStates(
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

    for (const action of actions) {
      const bool = this.evaluateConditionsStatement(conditions[action]!);

      if (bool === undefined) {
        continue;
      }

      if (action === actionDisabled) {
        this.disableControl(control, bool);
      }

      if (action === actionHidden) {
        // Must toggle visibility before disable, to prevent incorrect behavior of child element
        // e.g. Primeng Textarea `autoResize` will fail
        this.hideControl$(controlPath, bool)
          .pipe(tap(() => this.disableControl(control, bool)))
          .subscribe();
      }
    }
  }

  private disableControl(control: AbstractControl, disable: boolean): void {
    disable ? control.disable() : control.enable();
    this.globalVariableService.rootForm?.updateValueAndValidity();
  }

  private hideControl$(controlPath: string, hide: boolean): Observable<any> {
    const setStyle = (el: HTMLElement, name: string, value: any) => {
      if (hide) {
        el.style.setProperty(name, value);
      } else {
        el.style.removeProperty(name);
      }
    };

    return this.getTargetEl$(controlPath).pipe(
      filter(Boolean),
      tap((x) => {
        setStyle(x, 'display', 'none');
      })
    );
  }

  private toggleValidators(
    config: FormControlConfig,
    control: AbstractControl
  ): void {
    const { conditions = {}, validators = [] } = config;
    const actionPrefix = {
      asyncValidator: 'asyncValidator',
      validator: 'validator',
    };

    if (!validators.length) {
      return;
    }

    const getActions = (async: boolean) => {
      return Object.keys(conditions).filter((x) => {
        const prefix = async
          ? actionPrefix.asyncValidator
          : actionPrefix.validator;

        // Get the actions that starts with "validator.xxx" or "asyncValidator.xxx" only
        const regExp = new RegExp(`^${prefix}\.[a-zA-z]{1,}$`);

        return regExp.test(x);
      });
    };

    const getConditionValidatorConfigs = (async: boolean) => {
      const actions = getActions(async);
      const result = validators.filter((x) => {
        const prefix = async
          ? actionPrefix.asyncValidator
          : actionPrefix.validator;
        const actionName = `${prefix}.${x.name ?? ''}` as ConditionsActionEnum;
        const target = actions.includes(actionName);

        if (target) {
          return this.evaluateConditionsStatement(conditions[actionName]!);
        }

        return true;
      });

      return result;
    };

    const toggleValidators = () => {
      const validatorConfigs = getConditionValidatorConfigs(false);
      const validatorFns =
        this.formValidationService.getValidators(validatorConfigs);

      control.setValidators(validatorFns);
    };

    const toggleAsyncValidators = () => {
      const validatorConfigs = getConditionValidatorConfigs(true);
      const validatorFns =
        this.formValidationService.getAsyncValidators(validatorConfigs);

      control.setAsyncValidators(validatorFns);
    };

    toggleValidators();
    toggleAsyncValidators();
    control.updateValueAndValidity();
    this.globalVariableService.rootForm?.updateValueAndValidity();
  }

  private executeCustomActions(
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
      const bool = this.evaluateConditionsStatement(conditions[action]!);
      if (!bool) continue;

      const functions = this.globalVariableService.conditionsActionFunctions;

      if (!functions) continue;
      if (!functions[action]) continue;
      if (typeof functions[action] !== 'function') continue;

      functions[action](control);
    }
  }

  /**Get the target element by using `id`(full control path) on each `div` inside current NgDynamicJsonForm instance */
  private getTargetEl$(controlPath: string): Observable<HTMLElement | null> {
    if (typeof window === 'undefined') {
      return of(null);
    }

    return new Observable((subscriber) => {
      window.requestAnimationFrame(() => {
        // Use `CSS.escape()` to escape all the invalid characters.
        const element = this.globalVariableService.hostElement?.querySelector(
          `#${CSS.escape(controlPath)}`
        );

        subscriber.next(!element ? null : (element as HTMLElement));
        subscriber.complete();
        subscriber.unsubscribe();
      });
    });
  }

  private getPathsOfControlsToListen(configs: FormControlConfig[]): string[] {
    const extractPaths = (group: ConditionsGroup): string[] => {
      const value = group['&&'] || group['||'];
      if (!value) return [];

      return value.flatMap((x) =>
        Array.isArray(x)
          ? [
              this.getControlPathFromStatement(x[0]) ?? '',
              this.getControlPathFromStatement(x[2]) ?? '',
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
        : this.getPathsOfControlsToListen(children);

      acc.push(...paths.concat(childrenPaths));
      return acc;
    }, [] as string[]);

    const removeDuplicates = [...new Set(result)];
    return removeDuplicates;
  }

  /**
   * Get all the configs which has `conditions` set.
   *
   * @description
   * The `fullControlPath` is the path to the control where the conditions will have effect on it.
   */
  private configsWithConditions(
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
          ...this.configsWithConditions(children, fullControlPath),
        };
      }

      return acc;
    }, {} as { [fullControlPath: string]: FormControlConfig });

    return result;
  }

  private evaluateConditionsStatement(
    conditionsGroup: ConditionsGroup
  ): boolean | undefined {
    const form = this.globalVariableService.rootForm;

    if (!form || (!conditionsGroup['&&'] && !conditionsGroup['||'])) {
      return undefined;
    }

    const mapTupleFn = (tuple: ConditionsStatementTuple) => {
      const [left, operator, right] = tuple;
      const result = [
        this.getValueFromStatement(left),
        operator,
        this.getValueFromStatement(right),
      ] as ConditionsStatementTuple;

      return result;
    };

    return evaluateConditionsStatements(conditionsGroup, mapTupleFn);
  }

  /**
   * Get control path using the string in the conditions statement tuple.
   *
   * ```js
   * form = new FormGroup{
   *  controlA: new FormControl(),
   *  controlB: new FormControl(),
   * }
   * ```
   *
   * - "controlA" => Should get "controlA"
   * - "controlB" => Should get "controlB"
   * - "controlA,prop1" => Should get "controlA"
   * - "controlC" => undefined
   */
  private getControlPathFromStatement(input: any): string | undefined {
    const form = this.globalVariableService.rootForm;
    if (!form) return undefined;
    if (typeof input !== 'string') return undefined;

    const paths = getControlAndValuePath(input);
    const targetControl = form.get(paths.controlPath);

    if (!targetControl) return undefined;
    return paths.controlPath;
  }

  /**Get the value from the statement, either it's literally a value or comes from a control
   *
   * ```js
   * formValue = {
   *   controlA: 'textValue',
   *   controlB: false
   * }
   * ```
   *
   * - "controlA" => "textValue"
   * - "controlB" => false
   */
  private getValueFromStatement(input: any): any {
    const form = this.globalVariableService.rootForm;

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
