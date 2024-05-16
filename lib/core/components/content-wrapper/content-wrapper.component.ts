import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ControlLayoutDirective } from '../../directives/control-layout.directive';
import { FormControlConfig } from '../../models';
import { FormLayout } from '../../models/form-layout.interface';
import { IsControlRequiredPipe } from '../../pipes/is-control-required.pipe';
import { GlobalVariableService } from '../../services/global-variable.service';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { FormTitleComponent } from '../form-title/form-title.component';

@Component({
  selector: 'content-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    FormTitleComponent,
    ErrorMessageComponent,
    ControlLayoutDirective,
    IsControlRequiredPipe,
  ],
  templateUrl: './content-wrapper.component.html',
  styles: [],
})
export class ContentWrapperComponent {
  private _globalVariableService = inject(GlobalVariableService);

  @Input() config?: FormControlConfig;
  @Input() control?: AbstractControl;
  @Input() collapsibleState?: FormLayout['contentCollapsible'];
  @Input() controlLayoutDisabled = false;

  errorComponents = this._globalVariableService.errorComponents;
  errorTemplates = this._globalVariableService.errorTemplates;
  labelComponents = this._globalVariableService.labelComponents;
  labelTemplates = this._globalVariableService.labelTemplates;
  layoutComponents = this._globalVariableService.layoutComponents;
  layoutTemplates = this._globalVariableService.layoutTemplates;

  get showErrors(): boolean {
    const controlTouched = this.control?.touched ?? false;
    const controlDirty = this.control?.dirty ?? false;
    const hasErrors = !!this.control?.errors;

    // Primary condition
    if (this.config?.layout?.hideErrorMessage === true) {
      return false;
    }

    // Secondary condition
    if (this._globalVariableService.hideErrorMessage$.value) {
      return false;
    }

    // Last resort
    return (controlDirty || controlTouched) && hasErrors;
  }
}
