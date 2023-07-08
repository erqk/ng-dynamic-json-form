import { Pipe, PipeTransform, inject } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';
import { FormControlConfig } from '../models';
import { FormGeneratorService } from '../services/form-generator.service';

@Pipe({
  name: 'formArrayHeaderEvent',
  standalone: true,
})
export class FormArrayHeaderEventPipe implements PipeTransform {
  private _formGeneratorService = inject(FormGeneratorService);

  transform(
    formArray: UntypedFormArray,
    config: FormControlConfig[],
    index?: number
  ) {
    const add = () => this._addFormGroup(formArray, config, index);
    const remove = () => this._removeFormGroup(formArray, index);

    return {
      add,
      remove,
    };
  }

  private _addFormGroup(
    formArray: UntypedFormArray,
    template: FormControlConfig[],
    index?: number
  ): void {
    const formGroup = this._formGeneratorService.generateFormGroup(template);
    if (!index) formArray.push(formGroup);
    else formArray.insert(index + 1, formGroup);
  }

  private _removeFormGroup(formArray: UntypedFormArray, index?: number): void {
    formArray.removeAt(index ?? formArray.length - 1);
  }
}
