import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
  ViewChildren,
  inject,
} from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { getClassListFromString } from '../../../core/utilities/get-class-list-from-string';
import { getStyleListFromString } from '../../../core/utilities/get-style-list-from-string';
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
    }
})
export class FormGroupComponent implements OnChanges {
  private el = inject(ElementRef);
  private globalVariableService = inject(GlobalVariableService);

  @Input() configs?: FormControlConfig[];
  @Input() collapsibleState?: FormLayout['contentCollapsible'];
  @Input() parentId?: string;
  @Input() parentForm = new UntypedFormGroup({});
  @Input() rootClass?: string;
  @Input() rootStyles?: string;

  @ViewChildren(FormGroupComponent)
  formGroupRefs?: QueryList<FormGroupComponent>;

  @ViewChildren(FormControlComponent)
  formControlRefs?: QueryList<FormControlComponent>;

  customComponents = this.globalVariableService.customComponents;

  ngOnChanges(changes: SimpleChanges): void {
    const host = this.el.nativeElement as HTMLElement;
    const { rootClass, rootStyles } = changes;

    if (rootClass) {
      const classList = getClassListFromString(rootClass.currentValue);
      host.classList.add(...classList);
    }

    if (rootStyles) {
      const styleList = getStyleListFromString(rootStyles.currentValue);

      for (const item of styleList) {
        const [name, value] = item.split(':');
        host.style.setProperty(name, value);
      }
    }
  }

  updateStatus(status: 'dirty' | 'pristine' | 'touched' | 'untouched'): void {
    this.formControlRefs?.forEach((x) => x.updateControlStatus(status, true));
    this.formGroupRefs?.forEach((x) => x.updateStatus(status));
  }
}
