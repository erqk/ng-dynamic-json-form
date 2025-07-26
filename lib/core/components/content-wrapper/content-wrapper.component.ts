import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ControlLayoutDirective } from '../../directives/control-layout.directive';
import { FormControlConfig } from '../../models';
import { FormLayout } from '../../models/form-layout.interface';
import { IsControlRequiredPipe } from '../../pipes/is-control-required.pipe';
import { GlobalVariableService } from '../../services/global-variable.service';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { FormLabelComponent } from '../form-label/form-label.component';

@Component({
    selector: 'content-wrapper',
    imports: [
        CommonModule,
        FormLabelComponent,
        ErrorMessageComponent,
        ControlLayoutDirective,
        IsControlRequiredPipe,
    ],
    templateUrl: './content-wrapper.component.html',
    styles: []
})
export class ContentWrapperComponent {
  private _globalVariableService = inject(GlobalVariableService);

  @Input() config?: FormControlConfig;
  @Input() control?: AbstractControl;
  @Input() collapsibleState?: FormLayout['contentCollapsible'];

  descriptionPosition = this._globalVariableService.descriptionPosition;
  hideErrors$ = this._globalVariableService.hideErrorMessage$;
  showErrorsOnTouched = this._globalVariableService.showErrorsOnTouched;

  errorComponents = this._globalVariableService.errorComponents;
  errorTemplates = this._globalVariableService.errorTemplates;
  errorComponentDefault = this._globalVariableService.errorComponentDefault;
  errorTemplateDefault = this._globalVariableService.errorTemplateDefault;

  labelComponents = this._globalVariableService.labelComponents;
  labelTemplates = this._globalVariableService.labelTemplates;
  labelComponentDefault = this._globalVariableService.labelComponentDefault;
  labelTemplateDefault = this._globalVariableService.labelTemplateDefault;

  renderErrorSection = (() => {
    const typesToHide = this._globalVariableService.hideErrorsForTypes ?? [];
    const type = this.config?.type ?? 'text';

    return typesToHide.filter(Boolean).every((x) => x !== type);
  })();

  get showErrors(): boolean {
    const controlTouched = this.control?.touched ?? false;
    const controlDirty = this.control?.dirty ?? false;
    const hasErrors = !!this.control?.errors;

    if (!hasErrors) {
      return false;
    }

    if (this.hideErrors$.value === false) {
      return true;
    }

    if (this.showErrorsOnTouched) {
      return controlTouched || controlDirty;
    }

    return controlDirty;
  }
}
