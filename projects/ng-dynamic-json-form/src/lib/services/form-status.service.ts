import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  Validators,
  isFormArray,
  isFormControl,
  isFormGroup,
} from '@angular/forms';
import {
  Observable,
  Subject,
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
  reset$ = new Subject();

  constructor(private formValidatorService: FormValidatorService) {}

  formErrorEvent$(form: FormGroup): Observable<any> {
    return form.valueChanges.pipe(
      startWith(form.value),
      debounceTime(0),
      tap((x) => this.updateFormErrors(form))
    );
  }

  formControlConditonsEvent$(
    form: FormGroup,
    config: NgDynamicJsonFormControlConfig[]
  ): Observable<any> {
    if (!config.length) return of(null);

    const conditionData = this.extractConditions(config);
    const controlPaths = (
      input: NgDynamicJsonFormControlCondition[],
      path: string[] = []
    ): string[] => {
      return input.reduce((acc, curr) => {
        acc.push(curr.control);
        return !curr.groupWith?.length
          ? acc
          : controlPaths(curr.groupWith, acc);
      }, path);
    };

    const allControlChanges$ = conditionData.map((data) => {
      const controlsToListen = controlPaths(data.conditions)
        .reduce((a, b) => {
          // prevent listening to same control multiple times
          const isDuplicates = a.some((x) => x === b);
          if (!isDuplicates) a.push(b);
          return a;
        }, [] as string[])
        .map((x) => form.get(x))
        .filter((x) => !!x);

      return combineLatest(
        controlsToListen.map((x) =>
          x!.valueChanges.pipe(startWith(x?.value ?? ''))
        )
      ).pipe(tap((x) => this.updateControlStatus(form, data)));
    });

    return merge(...allControlChanges$);
  }

  private updateFormErrors(form: FormGroup): void {
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

  private updateControlStatus(
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

    const setControlStatus = (type: string) => {
      const bool = result(type);
      if (bool === undefined) return;

      switch (type) {
        case ValidatorAndConditionTypes.HIDDEN:
          if (bool) {
            getElement$.then((x) => x?.setAttribute('style', 'display:none'));
            control.disable();
          } else {
            getElement$.then((x) => x?.setAttribute('style', 'display:block'));
            control.enable();
          }
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

    Object.values(ValidatorAndConditionTypes).forEach((x) =>
      setControlStatus(x)
    );
    control.updateValueAndValidity();
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

  private extractConditions(
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
          validators: curr.validators || [],
        });
      }

      if (!!curr.children?.length && !curr.conditions?.length) {
        return this.extractConditions(curr.children, curr.formControlName, acc);
      }

      return acc;
    }, [] as NgDynamicJsonFormConditionExtracted[]);

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
