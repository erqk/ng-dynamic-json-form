import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { getValidators } from '../utils/validator-generator';
import { NgDynamicJsonFormConfig } from '../models/form-control-config.model';
import { clearEmpties } from '../utils/clear-empties';
import { Subject, debounceTime, takeUntil, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormGeneratorService {
  reset$ = new Subject();

  /**
   * @param data Array of form controls data parsed from JSON
   * @param convertToFormControl
   * Put this value to true to ensure ControlValueAccessor is correctly implemented.
   * When you're using that component in outer FormGroup and pass formControlName to it.
   * This is because you cannot mix AbstractControl type inside the formGroup that implements ControlValueAccessor
   *
   * @example
   * ParentFormComponent
   * // When we use the component that implement ControlValueAccessor like this
   * <ng-container [formGroup]="form">
   *  <app-child-form formControlName="name"></app-child-form>
   * </ng-container>
   * // Then in the ChildFormComponent
   * // This is OK:
   * childForm = new UntypedFormGroup({
   *  child1: new UntypedFormControl(),
   *  child2: new UntypedFormControl(),
   *  ...
   * });
   * // Angular will complain "control.registerOnChange is not a function..."
   * childForm = new UntypedFormGroup({
   *  child1: new UntypedFormGroup(),
   *  child2: new UntypedFormControl(),
   *  ...
   * });
   *
   * @returns UntypedFormGroup
   *
   */
  generateFormGroup(
    data: NgDynamicJsonFormConfig[],
    convertToFormControl = false,
    setInitialValue = true
  ): UntypedFormGroup {
    const formGroup = new UntypedFormGroup({});
    for (const item of data) {
      let control: AbstractControl | null = null;

      // form control
      if (!item.children && !item.formArray) {
        control = new FormControl(setInitialValue ? item.value : '', {
          validators: getValidators(item.validators ?? []),
        });
      }

      // form group
      if (!!item.children && !item.formArray) {
        control = this.generateFormGroup(
          item.children,
          convertToFormControl,
          setInitialValue
        );
      }

      // form array
      if (
        !!item.formArray &&
        !!item.formArray.template.length &&
        !item.children
      ) {
        control = this.generateFormArray(
          item.formArray.template,
          item.formArray.length
        );
      }

      if (!control) {
        throw 'failed to generate form control!';
      }

      formGroup.addControl(
        item.formControlName,
        convertToFormControl ? new FormControl(control.value) : control
      );
    }

    this.listenFormChanges(formGroup);
    return formGroup;
  }

  private generateFormArray(
    data: NgDynamicJsonFormConfig[],
    count: number,
    convertToFormControl = false
  ): UntypedFormArray {
    const formArray = new UntypedFormArray([]);

    for (let i = 0; i < count; i++) {
      const formGroup = this.generateFormGroup(
        data,
        convertToFormControl,
        false
      );

      formArray.push(formGroup);
    }

    return formArray;
  }

  private listenFormChanges(form: FormGroup): void {
    this.reset$.next(null);

    form.valueChanges
      .pipe(
        debounceTime(0),
        tap((x) => this.updateFormStatus(form)),
        takeUntil(this.reset$)
      )
      .subscribe();
  }

  private updateFormStatus(form: FormGroup): void {
    const getFormErrors = (input: UntypedFormControl | UntypedFormGroup) => {
      const isFormGroup = 'controls' in input;

      if (!isFormGroup) {
        return JSON.parse(JSON.stringify(input.errors));
      }

      const errors = Object.keys(input.controls).reduce((acc, key) => {
        const formControlErrors = getFormErrors(
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

    const errors = clearEmpties(getFormErrors(form));
    form.setErrors(!Object.keys(errors).length ? null : errors);
  }
}
