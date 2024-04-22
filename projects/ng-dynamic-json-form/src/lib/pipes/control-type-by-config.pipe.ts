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
    if (!config.formArray && !config.children) {
      return 'FormControl';
    }

    if (!config.formArray) {
      return 'FormGroup'
    }

    return 'FormArray'
  }
}
