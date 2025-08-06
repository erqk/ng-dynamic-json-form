import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  effect,
  inject,
  input,
  viewChild,
  viewChildren,
} from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { getClassListFromString } from '../../../core/utilities/get-class-list-from-string';
import { getStyleListFromString } from '../../../core/utilities/get-style-list-from-string';
import { ControlLayoutDirective } from '../../directives/control-layout.directive';
import { HostIdDirective } from '../../directives/host-id.directive';
import { FormControlConfig, FormStatusFunctions } from '../../models';
import { FormLayout } from '../../models/form-layout.interface';
import { ControlTypeByConfigPipe } from '../../pipes/control-type-by-config.pipe';
import { GlobalVariableService } from '../../services/global-variable.service';
import { ContentWrapperComponent } from '../content-wrapper/content-wrapper.component';
import { FormControlComponent } from '../form-control/form-control.component';

@Component({
  selector: 'form-group',
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
  private el = inject(ElementRef);
  private globalVariableService = inject(GlobalVariableService);

  readonly customComponents = this.globalVariableService.customComponents;

  configs = input<FormControlConfig[]>();
  collapsibleState = input<FormLayout['contentCollapsible']>();
  parentId = input<string>();
  parentForm = input.required<UntypedFormGroup>();
  rootClass = input<string>();
  rootStyles = input<string>();

  contentWrapperRefs = viewChildren(ContentWrapperComponent);
  contentWrapperEl = viewChild(ContentWrapperComponent, {
    read: ElementRef,
  });
  formGroupRefs = viewChildren(FormGroupComponent);
  formControlRefs = viewChildren(FormControlComponent);

  updateClassList = effect(() => {
    const host = this.el.nativeElement as HTMLElement;
    const rootClass = this.rootClass();

    if (!rootClass) {
      return;
    }

    const classList = getClassListFromString(rootClass);
    host.classList.add(...classList);
  });

  updateStyleList = effect(() => {
    const host = this.el.nativeElement as HTMLElement;
    const rootStyles = this.rootStyles();

    if (!rootStyles) {
      return;
    }

    const styleList = getStyleListFromString(rootStyles);

    for (const item of styleList) {
      const [name, value] = item.split(':');
      host.style.setProperty(name, value);
    }
  });

  updateStatus(type: keyof FormStatusFunctions): void {
    this.contentWrapperRefs()?.forEach((x) => x.updateControlStatus());
    this.formControlRefs()?.forEach((x) => x.updateControlStatus(type));
    this.formGroupRefs()?.forEach((x) => x.updateStatus(type));
  }
}
