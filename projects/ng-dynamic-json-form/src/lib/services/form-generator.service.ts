import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  UntypedFormArray,
  UntypedFormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { NgDynamicJsonFormControlConfig } from '../models/form-control-config.model';
import { FormStatusService } from './form-status.service';
import { FormValidatorService } from './form-validator.service';

@Injectable({
  providedIn: 'root',
})
export class FormGeneratorService {
  reset$ = new Subject();

  constructor(
    private formStatusService: FormStatusService,
    private formValidatorService: FormValidatorService
  ) {}

  generateFormGroup(data: NgDynamicJsonFormControlConfig[]): UntypedFormGroup {
    const formGroup = new UntypedFormGroup({});
    for (const item of data) {
      let control: AbstractControl | null = null;
      const validators = this.formValidatorService.getValidators(
        item.validators ?? []
      );

      // form control
      if (!item.children && !item.formArray) {
        control = new FormControl(item.value, {
          validators,
        });
      }

      // form group
      if (!!item.children && !item.formArray) {
        control = this.generateFormGroup(item.children);
      }

      // form array
      if (
        !!item.formArray &&
        !!item.formArray.template.length &&
        !item.children
      ) {
        const arrayLength =
          Array.isArray(item.value) && !!item.value.length
            ? item.value.length
            : item.formArray.length;

        control = this.generateFormArray(
          item.formArray.template,
          arrayLength,
          validators
        );
        control.patchValue(item.value ?? []);
      }

      if (!control) {
        throw 'failed to generate form control!';
      }

      formGroup.addControl(item.formControlName, control);
    }

    return formGroup;
  }

  private generateFormArray(
    data: NgDynamicJsonFormControlConfig[],
    count: number,
    validators: ValidatorFn[]
  ): UntypedFormArray {
    const formArray = new UntypedFormArray([], {
      validators,
    });

    this.reset$.next(null);
    for (let i = 0; i < count; i++) {
      const formGroup = this.generateFormGroup(data);
      formArray.push(formGroup);

      this.formStatusService
        .formControlConditonsEvent$(formGroup, data)
        .pipe(takeUntil(this.reset$))
        .subscribe();
    }

    return formArray;
  }

  /**Auto set the other fields `gridColumn` when there's one or more field with `gridColumn` set
   * By doing this, the other input fields will auto expand and their layout is not affected
   */
  setGridColumn(
    data: NgDynamicJsonFormControlConfig[],
    parentColumnCount?: number
  ): void {
    const customColumnItems = data.filter(
      (x) =>
        !!x.cssGrid?.gridColumn &&
        new RegExp(/^(span\s)\d+|\d+$/).test(x.cssGrid.gridColumn)
    );
    const nothingToSet =
      customColumnItems.length === 1 &&
      customColumnItems[0].cssGrid?.gridColumn === '1';

    if (nothingToSet) {
      return;
    }

    const columnCount =
      parentColumnCount !== undefined && parentColumnCount > 0
        ? parentColumnCount
        : customColumnItems.reduce((max, curr) => {
            const gridColumn = curr.cssGrid?.gridColumn || '1';
            const int = parseInt(gridColumn.replaceAll(/span/g, '').trim());
            return int > max ? int : max;
          }, 1);

    for (const item of data) {
      if (!item.cssGrid?.gridColumn) {
        item.cssGrid = { ...item.cssGrid, gridColumn: `span ${columnCount}` };
      }

      if (!!item.children?.length) {
        const gridTemplateColumns = item.cssGrid.gridTemplateColumns;
        let columnCount = 0;

        if (gridTemplateColumns) {
          if (gridTemplateColumns.indexOf('repeat(') > -1) {
            const multiplier = parseInt(
              gridTemplateColumns.split(',')[0].match(/\d/)?.pop() || '1'
            );

            columnCount =
              gridTemplateColumns
                .split(',')[1]
                .split('fr')
                .filter((x) => new RegExp(/\d/).test(x)).length * multiplier;
          } else {
            columnCount = gridTemplateColumns
              .split('fr')
              .map((x) => x.trim())
              .filter((x) => !!x).length;
          }
        }

        this.setGridColumn(item.children, columnCount);
      }
    }
  }
}
