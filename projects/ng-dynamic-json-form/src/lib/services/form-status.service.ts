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
  combineLatest,
  debounceTime,
  merge,
  of,
  startWith,
  tap,
} from 'rxjs';
import { ValidatorAndConditionTypes } from '../enums/validator-and-condition-types.enum';
import {
  NgDynamicJsonFormControlCondition,
  NgDynamicJsonFormControlConfig,
  NgDynamicJsonFormValidatorConfig,
} from '../models';
import { NgDynamicJsonFormConditionExtracted } from '../models/condition-extracted.model';
import { clearEmpties } from '../utils/clear-empties';
import { FormValidatorService } from './form-validator.service';

@Injectable({
  providedIn: 'root',
})
export class FormStatusService {
  /**To differentiate the host element if there is multiple ng-dynamic-json-form */
  hostIndex = 0;

  constructor(private formValidatorService: FormValidatorService) {}

  formErrorEvent$(form: FormGroup): Observable<any> {
    return form.valueChanges.pipe(
      startWith(form.value),
      debounceTime(0),
      tap((x) => {
        const errors = this.getFormErrors(form);
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
    configs: NgDynamicJsonFormControlConfig[]
  ): Observable<any> {
    if (!configs.length) return of(null);

    const conditionsExtracted = this.extractConditions(form, configs);
    const allControlChanges$ = conditionsExtracted.map((conditionData) => {
      const valueChanges$ = conditionData.controlsToListen.map((x) =>
        x.valueChanges.pipe(startWith(x.value))
      );

      return combineLatest(valueChanges$).pipe(
        tap((x) => this.updateControlStatus(form, conditionData))
      );
    });

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
  private getFormErrors(form: FormGroup): ValidationErrors | null {
    const getErrors = (input: AbstractControl) => {
      let errors = null;

      if (isFormControl(input)) {
        errors = input.errors;
      }

      if (isFormGroup(input)) {
        errors = Object.keys(input.controls).reduce((acc, key) => {
          const formControlErrors: any = getErrors(input.controls[key]);
          if (!formControlErrors) return acc;

          return {
            ...acc,
            [key]: formControlErrors,
          };
        }, {});
      }

      if (isFormArray(input)) {
        const parentErrors = input.errors;
        const childrenErrors: any = input.controls.map((x) => getErrors(x));

        errors = {
          ...parentErrors,
          ...childrenErrors,
        };
      }

      return errors ? JSON.parse(JSON.stringify(errors)) : null;
    };

    const errors = clearEmpties(getErrors(form));
    return !Object.keys(errors).length ? null : errors;
  }

  private updateControlStatus(
    form: FormGroup,
    data: NgDynamicJsonFormConditionExtracted
  ): void {
    const conditions = data.conditions;
    const control = data.targetControl;

    const result = (type: string) => {
      // Pick only first level condition type, to prevent complexity goes up
      const targetConditions = conditions.filter((x) => x.name === type);
      if (!targetConditions.length) return undefined;

      return this.getConditionResult(form, targetConditions);
    };

    const setStatus = (type: string) => {
      const bool = result(type);
      if (bool === undefined) return;

      switch (type) {
        case ValidatorAndConditionTypes.HIDDEN:
          this.targetElement$(data.targetControlPath).then((x) => {
            if (!x) return;
            if (bool) this.setElementStyle(x, 'display', 'none');
            else this.setElementStyle(x, 'display', 'block');
          });

          bool ? control.disable() : control.enable();
          break;

        case ValidatorAndConditionTypes.DISABLED:
          if (bool) control.disable();
          else control.enable();
          break;

        default:
          this.toggleValidators(control, bool, type, data.validators);
          break;
      }
    };

    Object.values(ValidatorAndConditionTypes).forEach((x) => setStatus(x));
    control.updateValueAndValidity();
  }

  /**Get the target element by using:
   * - `hostIndex` on each `ng-dynamic-json-form`
   * - `id` on each `grid-item-wrapper`
   */
  private targetElement$(controlPath: string): Promise<HTMLElement | null> {
    return new Promise<HTMLElement | null>((resolve, reject) => {
      requestAnimationFrame(() => {
        const hostClass = `ng-dynamic-json-form.index-${this.hostIndex}`;
        const element = document.querySelector(
          // Must escape the "." character so that querySelector will work correctly
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
  private setElementStyle(el: HTMLElement, name: string, value: string): void {
    const oldStyles = el.getAttribute('style') || '';
    const currentStyle = oldStyles.match(new RegExp(`${name}:\\w+`));

    if (!currentStyle) {
      // Append the new style attribute if there's no existing value.
      el.setAttribute('style', `${oldStyles}; ${name}:${value}`);
    } else {
      // Replace the existing style attribute with the new one.
      el.setAttribute(
        'style',
        oldStyles.replace(currentStyle[0], `${name}:${value}`)
      );
    }
  }

  private toggleValidators(
    control: AbstractControl,
    bool: boolean,
    type: string,
    validators: NgDynamicJsonFormValidatorConfig[]
  ): void {
    const allValidators = this.formValidatorService.getValidators(validators);
    const otherValidators = this.formValidatorService.getValidators(
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
  private getControlsToListen(
    form: FormGroup,
    conditions: NgDynamicJsonFormControlCondition[],
    path: AbstractControl[] = []
  ): AbstractControl[] {
    return conditions.reduce((acc, curr) => {
      const control = form.get(curr.control);
      !!control && acc.push(control);

      return !curr.groupWith?.length
        ? acc
        : this.getControlsToListen(form, curr.groupWith, acc);
    }, path);
  }

  /**Extract all the conditions from JSON data and flatten them,
   * then output to an array of `NgDynamicJsonFormConditionExtracted`
   */
  extractConditions(
    form: FormGroup,
    configs: NgDynamicJsonFormControlConfig[],
    parentControlName?: string,
    path?: NgDynamicJsonFormConditionExtracted[]
  ): NgDynamicJsonFormConditionExtracted[] {
    if (path === undefined) {
      path = [];
    }

    const result = configs.reduce((acc, curr) => {
      if (!curr.children?.length && !!curr.conditions?.length) {
        const targetControlPath = parentControlName
          ? `${parentControlName}.${curr.formControlName}`
          : curr.formControlName;

        const targetControl = form.get(targetControlPath);
        if (!targetControl) return acc;

        acc.push({
          targetControl,
          targetControlPath,
          controlsToListen: this.getControlsToListen(form, curr.conditions),
          conditions: curr.conditions,
          validators: curr.validators || [],
        });
      }

      if (!!curr.children?.length && !curr.conditions?.length) {
        return this.extractConditions(
          form,
          curr.children,
          curr.formControlName,
          acc
        );
      }

      return acc;
    }, [] as NgDynamicJsonFormConditionExtracted[]);

    path.push(...result);
    return path;
  }

  /**Evaluate the boolean result from the condition given.
   * Solved by ChatGPT (with some modification)
   */
  private getConditionResult(
    form: FormGroup,
    conditions: NgDynamicJsonFormControlCondition[],
    groupOperator?: '&&' | '||'
  ): boolean {
    const evaluateExpression = (
      input: NgDynamicJsonFormControlCondition
    ): boolean => {
      if (input.groupOperator && input.groupWith) {
        const result = this.booleanResult(form, input);
        const operator = input.groupOperator;
        const groupWith = input.groupWith;
        const groupResults = groupWith.map(evaluateExpression);

        switch (operator) {
          case '&&':
            return result && groupResults.every((x) => x);

          case '||':
            return result || groupResults.some((x) => x);

          default:
            throw new Error(`Unknown group operator ${groupOperator}`);
        }
      } else {
        return this.booleanResult(form, input);
      }
    };

    return conditions.map(evaluateExpression).some((x) => x);
  }

  private booleanResult(
    form: FormGroup,
    data: NgDynamicJsonFormControlCondition
  ): boolean {
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
