import { Pipe, PipeTransform } from '@angular/core';
import { FormControlConfig } from '../models';

@Pipe({
  name: 'controlTypeByConfig',
  standalone: true,
})
export class ControlTypeByConfigPipe implements PipeTransform {
  transform(config: FormControlConfig): 'FormControl' | 'FormGroup' {
    if (!config.children) {
      return 'FormControl';
    }

    return 'FormGroup';
  }
}
