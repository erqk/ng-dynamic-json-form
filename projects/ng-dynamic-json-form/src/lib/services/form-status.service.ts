import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  Validators,
  isFormArray,
  isFormControl,
  isFormGroup,
} from '@angular/forms';
import { Subject } from 'rxjs';
import {
  NgDynamicJsonFormControlCondition,
  NgDynamicJsonFormControlConfig,
} from '../models';
import { NgDynamicJsonFormConditionExtracted } from '../models/condition-extracted.model';
import { clearEmpties } from '../utils/clear-empties';

@Injectable({
  providedIn: 'root',
})
export class FormStatusService {
  reset$ = new Subject();

  updateFormErrors(form: FormGroup): void {
    const getErrors = (input: AbstractControl) => {
      let errors = null;

      if (isFormControl(input)) {
        errors = input.errors;
      }

      if (isFormGroup(input)) {
        errors = Object.keys(input.controls).reduce((acc, key) => {
          const formControlErrors = getErrors(input.controls[key]);

          if (!!formControlErrors) {
            acc = {
              ...acc,
              [key]: formControlErrors,
            };
          }

          return acc;
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
    form.setErrors(!Object.keys(errors).length ? null : errors);
  }

  updateControlStatus(
    form: FormGroup,
    data: NgDynamicJsonFormConditionExtracted
  ): void {
    const conditions = data.conditions;
    const controlPath = data.targetControlPath;
    const control = form.get(controlPath);

    if (!control || !conditions.length) return;

    // Pick only first level condition type, to prevent complexity goes up
    const conditionsFiltered = (type: string) =>
      conditions.filter((x) => x.name === type);

    const result = (type: string) =>
      conditionsFiltered(type).length > 0
        ? this.getConditionResult(form, conditionsFiltered(type))
        : undefined;

    const getElement$ = new Promise<HTMLElement | null>((resolve, reject) => {
      requestAnimationFrame(() => {
        const element = document.querySelector(
          `ng-dynamic-json-form grid-item-wrapper#${controlPath.replace(
            '.',
            '\\.'
          )}`
        ) as HTMLElement | null;

        resolve(element);
      });
    });

    enum conditionTypeEnum {
      HIDDEN = 'hidden',
      DISABLED = 'disabled',
      REQUIRED = 'required',
    }

    const setControlStatus = (type: string) => {
      const bool = result(type);
      if (bool === undefined) return;

      switch (type) {
        case conditionTypeEnum.HIDDEN:
          if (bool) {
            getElement$.then((x) => x?.setAttribute('style', 'display:none'));
            control.disable();
          } else {
            getElement$.then((x) => x?.setAttribute('style', 'display:block'));
            control.enable();
          }
          break;

        case conditionTypeEnum.DISABLED:
          if (bool) control.disable();
          else control.enable();
          break;

        case conditionTypeEnum.REQUIRED:
          if (bool) control.addValidators(Validators.required);
          else control.removeValidators(Validators.required);
          break;
      }
    };

    Object.values(conditionTypeEnum).forEach((x) => setControlStatus(x));
    control.updateValueAndValidity();
  }

  extractConditions(
    input: NgDynamicJsonFormControlConfig[],
    parentControlName?: string,
    path?: NgDynamicJsonFormConditionExtracted[]
  ): NgDynamicJsonFormConditionExtracted[] {
    if (path === undefined) {
      path = [];
    }

    const result = input.reduce((acc, curr) => {
      if (!curr.children?.length && !!curr.conditions?.length) {
        acc.push({
          targetControlPath: parentControlName
            ? `${parentControlName}.${curr.formControlName}`
            : curr.formControlName,
          conditions: curr.conditions,
        });
      }

      if (!!curr.children?.length && !curr.conditions?.length) {
        return this.extractConditions(curr.children, curr.formControlName, acc);
      }

      return acc;
    }, [] as any[]);

    path.push(...result);
    return path;
  }

  /**Solved by ChatGPT (with some modification) */
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
