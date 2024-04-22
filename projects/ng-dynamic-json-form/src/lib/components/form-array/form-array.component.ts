import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, forwardRef } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';
import { FormControlConfig } from '../../models';
import {
  LayoutComponents,
  LayoutTemplates,
} from '../../ng-dynamic-json-form.config';
import { FormArrayItemHeaderComponent } from '../form-array-item-header/form-array-item-header.component';
import { FormGroupComponent } from '../form-group/form-group.component';

@Component({
  selector: 'form-array',
  standalone: true,
  imports: [
    CommonModule,
    FormArrayItemHeaderComponent,
    forwardRef(() => FormGroupComponent),
  ],
  templateUrl: './form-array.component.html',
  styles: [],
})
export class FormArrayComponent {
  @Input() config?: FormControlConfig;
  @Input() formArray?: UntypedFormArray;
  @Input() layoutComponents?: LayoutComponents;
  @Input() layoutTemplates?: LayoutTemplates;

  @HostBinding('class') hostClass = 'form-array-container';
}
