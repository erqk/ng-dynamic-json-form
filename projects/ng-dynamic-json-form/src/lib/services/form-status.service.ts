import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import {
  NgDynamicJsonFormConfig,
  NgDynamicJsonFormControlCondition,
} from '../models';
import { NgDynamicJsonFormConditionExtracted } from '../models/condition-extracted.model';
import { clearEmpties } from '../utils/clear-empties';

@Injectable({
  providedIn: 'root',
})
export class FormStatusService {
  reset$ = new Subject();

  updateFormErrors(form: FormGroup): void {
    const getErrors = (input: UntypedFormControl | UntypedFormGroup) => {
      const isFormGroup = 'controls' in input;

      if (!isFormGroup) {
        return JSON.parse(JSON.stringify(input.errors));
      }

      const errors = Object.keys(input.controls).reduce((acc, key) => {
        const formControlErrors = getErrors(
          input.controls[key] as UntypedFormControl
        );

        if (!!formControlErrors) {
          acc = {
            ...acc,
            [key]: formControlErrors,
          };
        }

        return acc;
      }, {});

      return JSON.parse(JSON.stringify(errors));
    };

    const errors = clearEmpties(getErrors(form));
    form.setErrors(!Object.keys(errors).length ? null : errors);
  }

  updateControlStatus(
    form: FormGroup,
    control: AbstractControl | null,
    controlPath: string,
    conditions: NgDynamicJsonFormControlCondition[]
  ): void {
    if (!conditions.length) return;

    const conditionsFiltered = (type: 'hidden' | 'disabled' | 'required') =>
      conditions.filter((x) => x.name === type);

    const result = (type: 'hidden' | 'disabled' | 'required') =>
      this.getConditionResult(form, conditionsFiltered(type));

    const controlRequired = result('required');
    const disableControl = result('disabled');
    const hideControl = result('hidden');
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

    if (!control) return;

    if (controlRequired !== undefined) {
      if (controlRequired) control.addValidators(Validators.required);
      else control.removeValidators(Validators.required);
    }

    if (disableControl !== undefined) {
      if (disableControl) control.disable();
      else control.enable();
    }

    if (hideControl !== undefined) {
      if (hideControl) {
        getElement$.then((x) => x?.setAttribute('style', 'display:none'));
        control.disable();
      } else {
        getElement$.then((x) => x?.setAttribute('style', 'display:block'));
        control.enable();
      }
    }

    control.updateValueAndValidity();
  }

  extractConditions(
    input: NgDynamicJsonFormConfig[],
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

  private getConditionResult(
    form: FormGroup,
    conditions: NgDynamicJsonFormControlCondition[]
  ): boolean | undefined {
    if (!conditions.length) return undefined;

    const chainCondition = (
      input: NgDynamicJsonFormControlCondition[],
      chainOperator: 'AND' | 'OR' = 'OR'
    ): boolean => {
      return input.reduce((acc, curr) => {
        const targetControl = form.get(curr.control);
        const result = this.booleanEvaluation(
          curr.operator,
          targetControl?.value,
          curr.controlValue
        );

        if (!!curr.children?.length) {
          return chainCondition(curr.children, curr.childBoolOperator);
        }

        switch (chainOperator) {
          case 'AND':
            return acc && result;

          case 'OR':
            return acc || result;
        }
      }, false);
    };

    if (conditions.length === 1) {
      const config = conditions[0];
      const targetControl = form.get(config.control);

      return this.booleanEvaluation(
        config.operator,
        targetControl?.value,
        config.controlValue
      );
    }

    return conditions.reduce((acc, curr) => {
      const targetControl = form.get(curr.control);
      const result = !!curr.children?.length
        ? chainCondition(curr.children, curr.childBoolOperator)
        : this.booleanEvaluation(
            curr.operator,
            targetControl?.value,
            curr.controlValue
          );

      return acc || result;
    }, false);
  }

  private booleanEvaluation(
    operator: string,
    left: string,
    right: string
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

    return false;
  }
}
