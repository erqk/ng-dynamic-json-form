import { Pipe, PipeTransform, inject } from '@angular/core';
import { FormGeneratorService } from '../services/form-generator.service';
import { FormControlConfig } from '../models';

@Pipe({
  name: 'generateForm',
  standalone: true,
})
export class GenerateFormPipe implements PipeTransform {
  private _formGeneratorService = inject(FormGeneratorService);

  transform(config: FormControlConfig[]) {
    return this._formGeneratorService.generateFormGroup(config);
  }
}
