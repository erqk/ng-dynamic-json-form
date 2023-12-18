import { Injectable } from '@angular/core';
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
  from,
  merge,
  mergeMap,
  of,
  startWith,
  tap,
} from 'rxjs';
import { ValidatorAndConditionTypes } from '../enums/validator-and-condition-types.enum';
import {
  FormControlCondition,
  FormControlConfig,
  ValidatorConfig,
} from '../models';
import { ConditionExtracted } from '../models/condition-extracted.model';
import { clearEmpties } from '../utils/clear-empties';
import { FormValidatorService } from './form-validator.service';

@Injectable()
export class FormStatusService {
  /**To differentiate the host element if there is multiple ng-dynamic-json-form */
  hostIndex = 0;

  constructor(private _formValidatorService: FormValidatorService) {}

  formErrorEvent$(form: FormGroup): Observable<any> {
    return form.valueChanges.pipe(
      startWith(form.value),
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
    const allControlChanges$ = conditionsExtracted.map((conditionData) =>
      from(conditionData.controlsToListen).pipe(
        mergeMap((x) => x.valueChanges.pipe(startWith(x.value))),
        debounceTime(0),
        tap(() => this._updateControlStatus(form, conditionData))
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
    const conditions = data.conditions;
    const control = data.targetControl;
    const conditionsGrouped = conditions.reduce((acc, curr) => {
      const group = acc.find((child) =>
        child.some((x) => x.name === curr.name)
      );

      group ? group.push(curr) : acc.push([curr]);
      return acc;
    }, [] as FormControlCondition[][]);

    if (!conditionsGrouped.length) return;

    const toggleHiddenState = (hidden: boolean) => {
      this._targetElement$(data.targetControlPath).then((x) => {
        if (!x) return;

        this._setElementStyle(x, 'display', hidden ? 'none' : 'block');
        hidden ? control.disable() : control.enable();
      });
    };

    for (const group of conditionsGrouped) {
      const name = group[0].name;
      const conditionResult = this._getConditionResult(form, group);

      if (!name) continue;
      switch (name) {
        case ValidatorAndConditionTypes.HIDDEN:
          toggleHiddenState(conditionResult);
          break;

        case ValidatorAndConditionTypes.DISABLED:
          conditionResult ? control.disable() : control.enable();
          break;

        default:
          this._toggleValidators(
            control,
            conditionResult,
            name,
            data.validators
          );
          break;
      }
    }

    control.updateValueAndValidity();
  }

  /**Get the target element by using:
   * - `hostIndex` on each `ng-dynamic-json-form`
   * - `id` on each `grid-item-wrapper`
   */
  private _targetElement$(controlPath: string): Promise<HTMLElement | null> {
    return new Promise<HTMLElement | null>((resolve, reject) => {
      requestAnimationFrame(() => {
        const hostClass = `ng-dynamic-json-form.index-${this.hostIndex}`;

        // Must escape the "." character so that querySelector will work correctly
        const element = document.querySelector(
          `${hostClass} grid-item-wrapper#${controlPath.replace('.', '\\.')}`
        ) as HTMLElement | null;

        resolve(element);
      });
    });
  }

  /**
   *
   * @param el HTMLELement
   * @param name the attribute name (ex: display, opacity, visibility...)
   * @param value the attribute's value (ex: none, 0, hidden...)
   */
  private _setElementStyle(el: HTMLElement, name: string, value: string): void {
    const oldStyles = el.getAttribute('style') || '';
    const currentStyle = oldStyles.match(new RegExp(`${name}:\\w+`));

    // Append the new style attribute if there's no existing value,
    // else replace the existing style attribute with the new one.
    const valueToSet = !currentStyle
      ? `${oldStyles}; ${name}:${value}`
      : oldStyles.replace(currentStyle[0], `${name}:${value}`);

    el.setAttribute('style', valueToSet);
  }

  private _toggleValidators(
    control: AbstractControl,
    bool: boolean,
    type: string,
    validators: ValidatorConfig[]
  ): void {
    const allValidators = this._formValidatorService.getValidators(validators);
    const otherValidators = this._formValidatorService.getValidators(
      validators.filter((x) => x.name !== type)
    );

    if (bool) control.setValidators(allValidators);
    else control.setValidators(otherValidators);
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
    return conditions.reduce((acc, curr) => {
      const control = form.get(curr.control);
      !!control && acc.push(control);

      return !curr.groupWith?.length
        ? acc
        : this._getControlsToListen(form, curr.groupWith, acc);
    }, path);
  }

  /**Extract all the conditions from JSON data and flatten them,
   * then output to an array of `ConditionExtracted`
   */
  private _extractConditions(
    form: FormGroup,
    configs: FormControlConfig[],
    previousControlPath?: string,
    accumulated?: ConditionExtracted[]
  ): ConditionExtracted[] {
    const result = (accumulated || []).concat();

    for (const item of configs) {
      const hasConditions = !!item.conditions?.length;
      const hasChildren = !!item.children?.length;

      const targetControlPath = previousControlPath
        ? `${previousControlPath}.${item.formControlName}`
        : item.formControlName;
      const targetControl = form.get(targetControlPath);

      if (hasConditions && !!targetControl) {
        result.push({
          targetControl,
          targetControlPath,
          controlsToListen: this._getControlsToListen(form, item.conditions!),
          conditions: item.conditions!,
          validators: item.validators || [],
        });
      }

      if (hasChildren) {
        result.push(
          ...this._extractConditions(
            form,
            item.children!,
            targetControlPath,
            result
          )
        );
      }
    }

    return result;
  }

  /**Evaluate the boolean result from the condition given.
   * Solved by ChatGPT (with some modification)
   */
  private _getConditionResult(
    form: FormGroup,
    conditions: FormControlCondition[],
    groupOperator?: '&&' | '||'
  ): boolean {
    const evaluateExpression = (input: FormControlCondition): boolean => {
      const result = this._booleanResult(form, input);
      const operator = input.groupOperator;
      const groupWith = input.groupWith;

      if (!operator || !groupWith) {
        return result;
      }

      const groupResults = groupWith.map(evaluateExpression);

      switch (operator) {
        case '&&':
          return result && groupResults.every((x) => x);

        case '||':
          return result || groupResults.some((x) => x);

        default:
          throw new Error(`Unknown group operator ${groupOperator}`);
      }
    };

    return conditions.map(evaluateExpression).some((x) => x);
  }

  private _booleanResult(form: FormGroup, data: FormControlCondition): boolean {
    const left = form.get(data.control)?.value;
    const right = data.controlValue;

    switch (data.operator) {
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
