import { Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { NgDynamicJsonFormControlConfig } from '../../models';

@Component({
  selector: 'ng-dynamic-component-base',
  template: ``,
  standalone: true,
})
export class NgDynamicJsonFormCustomComponent {
  @Input() control: UntypedFormControl | null = null;
  @Input() data: NgDynamicJsonFormControlConfig | null = null;
}
