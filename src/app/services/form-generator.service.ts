import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { JsonFormControlData } from '../core/models/json-form-control-data.model';
import { JsonFormGroupData } from '../core/models/json-form-group-data.model';
import { getValidators } from '../utils/validator-generator';

@Injectable({
  providedIn: 'root',
})
export class FormGeneratorService {
  constructor() {}

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
    data: JsonFormControlData[],
    convertToFormControl = false
  ): UntypedFormGroup {
    const formGroup = new UntypedFormGroup({});
    for (const item of data) {
      let control: AbstractControl | null = null;

      // form control
      if (!item.children && !item.formArray) {
        control = new FormControl(item.value, {
          validators: getValidators(item.validators ?? []),
        });
      }

      // form group
      if (!!item.children && !item.formArray) {
        control = this.generateFormGroup(
          item.children,
          convertToFormControl
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

      if (!!control) {
        formGroup.addControl(
          item.formControlName,
          convertToFormControl ? new FormControl(control.value) : control
        );
      }
    }

    return formGroup;
  }

  private generateFormArray(
    data: JsonFormControlData[],
    count: number,
    convertToFormControl = false
  ): UntypedFormArray {
    const formArray = new UntypedFormArray([]);

    for (let i = 0; i < count; i++) {
      const formGroup = this.generateFormGroup(
        data,
        convertToFormControl
      );

      formArray.push(formGroup);
    }

    return formArray;
  }
}
