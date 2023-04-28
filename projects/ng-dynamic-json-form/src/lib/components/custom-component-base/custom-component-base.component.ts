import { Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { NgDynamicJsonFormConfig } from '../../models';

@Component({
  selector: 'ng-dynamic-component-base',
  template: ``,
  standalone: true,
})
export class NgDynamicJsonFormCustomComponent {
  @Input() control: UntypedFormControl | null = null;
  @Input() data: NgDynamicJsonFormConfig | null = null;
}
