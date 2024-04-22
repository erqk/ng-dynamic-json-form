import { Pipe, PipeTransform } from '@angular/core';
import { FormControlConfig } from '../models';

@Pipe({
  name: 'controlTypeByConfig',
  standalone: true,
})
export class ControlTypeByConfigPipe implements PipeTransform {
  transform(
    config: FormControlConfig
  ): 'FormControl' | 'FormGroup' | 'FormArray' {
    if (!config.formArray && config.children && config.children.length > 0) {
      return 'FormGroup';
    }

    if (
      !config.children &&
      config.formArray &&
      config.formArray.template.length > 0
    ) {
      return 'FormArray';
    }

    return 'FormControl';
  }
}
