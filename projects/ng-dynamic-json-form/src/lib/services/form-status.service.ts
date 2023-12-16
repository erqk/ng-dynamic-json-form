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
  merge,
  mergeMap,
  of,
  startWith,
  tap,
} from 'rxjs';
import {
  FormControlCondition,
  FormControlConfig,
  ValidatorConfig,
} from '../models';
import { ConditionExtracted } from '../models/condition-extracted.interface';
import { clearEmpties } from '../utils/clear-empties';
import { FormValidatorService } from './form-validator.service';

@Injectable()
export class FormStatusService {
  /**https://github.com/angular/angular/issues/17824#issuecomment-353239017 */
  private _renderer2 = inject(RendererFactory2).createRenderer(null, null);

  /**To differentiate the host element if there is multiple ng-dynamic-json-form */
  hostIndex = 0;

  constructor(private _formValidatorService: FormValidatorService) {}

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

    const conditionsExtracted = this._extractConditions(form, configs);

    const allControlChanges$ = conditionsExtracted.map((data) =>
      from(data.controlsToListen).pipe(
        mergeMap((x) => x.valueChanges.pipe(startWith(x.value))),
        tap(() => this._updateControlStatus(form, data))
      )
    );

    return merge(...allControlChanges$);
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
    data: ConditionExtracted
  ): void {
    const { conditions, targetControl, validators } = data;
    const conditionsGrouped = conditions.reduce((acc, curr) => {
      const group = acc.find((child) =>
        child.some((x) => x.name === curr.name)
      );

      group ? group.push(curr) : acc.push([curr]);
      return acc;
    }, [] as FormControlCondition[][]);

    if (!conditionsGrouped.length) return;

    for (const group of conditionsGrouped) {
      const name = group[0].name;
      const conditionResult = this._getConditionsResult(form, group);

      if (!name) continue;
      switch (name) {
        case 'hidden':
          this._toggleElementVisibility(conditionResult, data);
          continue;

        case 'disabled':
          conditionResult ? targetControl.disable() : targetControl.enable();
          targetControl.updateValueAndValidity();
          break;

        default:
          this._toggleValidators(
            targetControl,
            conditionResult,
            name,
            validators
          );
          break;
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
    const control = data.targetControl;
    this._getTargetEl$(data.targetControlPath)
      .pipe(
        filter((x) => !!x),
        tap((x) => {
          this._renderer2.setStyle(x, 'display', hidden ? 'none' : null);
          hidden ? control.disable() : control.enable();
          control.updateValueAndValidity();
        })
      )
      .subscribe();
  }

  private _toggleValidators(
    control: AbstractControl,
    bool: boolean,
    type: string,
    validatorConfig: ValidatorConfig[]
  ): void {
    const configFilterd = validatorConfig.filter((x) =>
      bool ? true : x.name !== type
    );
    const validators = this._formValidatorService.getValidators(configFilterd);

    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  /**Get all the `AbstractControl` to listen from conditions
   *
   * @example
   * [...controls from A conditions]
   */
  private _getControlsToListen(
    form: FormGroup,
    conditions: FormControlCondition[],
    path: AbstractControl[] = []
  ): AbstractControl[] {
    if (!conditions.length) return [];

    return conditions.reduce((acc, curr) => {
      const {
        operation: [control, _, __],
        groupWith = [],
      } = curr;

      const _control = form.get(control);

      if (!!_control && !acc.includes(_control)) {
        acc.push(_control);
      }

      return !!groupWith.length
        ? this._getControlsToListen(form, groupWith, acc)
        : acc;
    }, path);
  }

  /**Extract all the conditions from JSON data and flatten them,
   * then output to an array of `ConditionExtracted`
   */
  private _extractConditions(
    form: FormGroup,
    configs: FormControlConfig[],
    prevControlPath = '',
    accumulated?: ConditionExtracted[]
  ): ConditionExtracted[] {
    const result = (accumulated || []).concat();

    for (const item of configs) {
      const {
        formControlName,
        conditions = [],
        children = [],
        validators = [],
      } = item;

      const targetControlPath = prevControlPath
        ? `${prevControlPath}.${formControlName}`
        : formControlName;

      const targetControl = form.get(targetControlPath);
      const controlsToListen = this._getControlsToListen(form, conditions);

      if (!!conditions.length && !!targetControl) {
        result.push({
          targetControl,
          targetControlPath,
          controlsToListen,
          conditions,
          validators,
        });
      }

      if (!!children.length) {
        return this._extractConditions(
          form,
          children,
          targetControlPath,
          result
        );
      }
    }

    return result;
  }

  /**Evaluate the boolean result from the condition given.
   * Solved by ChatGPT (with some modification)
   */
  private _getConditionsResult(
    form: FormGroup,
    conditions: FormControlCondition[]
  ): boolean {
    const evaluate = (input: FormControlCondition): boolean => {
      const {
        operation: [control, operator, controlValue],
        groupOperator,
        groupWith,
      } = input;
      const _control = form.get(control);

      if (!_control) return false;

      const result = this._booleanResult(
        _control.value,
        controlValue,
        operator
      );

      if (!groupOperator || !groupWith) {
        return result;
      }

      const groupResults = groupWith.map(evaluate);

      switch (groupOperator) {
        case '&&':
          return result && groupResults.every((x) => x);

        case '||':
          return result || groupResults.some((x) => x);

        default:
          throw new Error(`Unknown group operator ${groupOperator}`);
      }
    };

    // Evaluate all the conditions on the first level with OR operator.
    return conditions.map(evaluate).some((x) => x);
  }

  private _booleanResult(
    left: any,
    right: any,
    operator: FormControlCondition['operation']['1']
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
