import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { ControlLayoutDirective } from '../../directives/control-layout.directive';
import { HostIdDirective } from '../../directives/host-id.directive';
import { FormControlConfig } from '../../models';
import { FormLayout } from '../../models/form-layout.interface';
import { ControlTypeByConfigPipe } from '../../pipes/control-type-by-config.pipe';
import { GlobalVariableService } from '../../services/global-variable.service';
import { ContentWrapperComponent } from '../content-wrapper/content-wrapper.component';
import { FormControlComponent } from '../form-control/form-control.component';

@Component({
  selector: 'form-group',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContentWrapperComponent,
    HostIdDirective,
    ControlLayoutDirective,
    FormControlComponent,
    ControlTypeByConfigPipe,
  ],
  templateUrl: './form-group.component.html',
  host: {
    class: 'grid-container form-group-container',
  },
})
export class FormGroupComponent {
  private _globalVariableService = inject(GlobalVariableService);

  @Input() configs?: FormControlConfig[];
  @Input() parentId?: string;
  @Input() parentForm = new UntypedFormGroup({});
  @Input() hostLayout?: FormLayout;
  @Input() collapsibleState?: FormLayout['contentCollapsible'];

  @ViewChildren(FormGroupComponent)
  formGroupRefs?: QueryList<FormGroupComponent>;

  @ViewChildren(FormControlComponent)
  formControlRefs?: QueryList<FormControlComponent>;

  customComponents = this._globalVariableService.customComponents;

  updateStatus(status: 'dirty' | 'pristine' | 'touched' | 'untouched'): void {
    this.formControlRefs?.forEach((x) => x.updateControlStatus(status, true));
    this.formGroupRefs?.forEach((x) => x.updateStatus(status));
  }
}
