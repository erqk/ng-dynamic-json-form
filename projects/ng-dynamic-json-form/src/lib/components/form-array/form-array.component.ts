import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, forwardRef } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';
import { FormControlConfig } from '../../models';
import { GlobalLayoutComponents } from '../../models/global-layout-components.interface';
import { GlobalLayoutTemplates } from '../../models/global-layout-templates.interface';
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
  @Input() layoutComponents?: GlobalLayoutComponents;
  @Input() layoutTemplates?: GlobalLayoutTemplates;

  @HostBinding('class') hostClass = 'form-array-container';
}
