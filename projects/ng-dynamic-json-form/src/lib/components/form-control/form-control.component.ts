import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { UiComponents } from '../../models/ui-components-type.model';
import { NgDynamicJsonFormCustomComponent } from '../custom-component-base/custom-component-base.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { UiBasicInputComponent } from '../ui-basic/ui-basic-input/ui-basic-input.component';

@Component({
  selector: 'form-control',
  standalone: true,
  imports: [CommonModule, ErrorMessageComponent],
  template: `
    <ng-container *ngIf="data">
      <label class="input-label">{{ data.label }}</label>
      <span class="input-description">{{ data.description }}</span>
    </ng-container>

    <ng-container #componentAnchor></ng-container>

    <ng-container *ngIf="control && data">
      <error-message
        [control]="control"
        [validators]="data.validators"
      ></error-message>
    </ng-container>
  `,
  styles: [':host {display: flex; flex-direction: column; width: 100%}'],
})
export class FormControlComponent extends NgDynamicJsonFormCustomComponent {
  @Input() uiComponents: UiComponents = {};
  @Input() customComponent?: Type<NgDynamicJsonFormCustomComponent>;

  @ViewChild('componentAnchor', { read: ViewContainerRef, static: true })
  componentAnchor!: ViewContainerRef;

  ngOnInit(): void {
    const inputComponent =
      this.customComponent ||
      this.uiComponents[this.inputType] ||
      UiBasicInputComponent;

    const componentRef = this.componentAnchor.createComponent(inputComponent);

    componentRef.instance.data = this.data;
    componentRef.instance.control = this.control;
  }

  private get inputType(): string {
    // If `ngxMaskConfig` is specified, we use input with mask
    const defaultInput = !this.data?.ngxMaskConfig ? 'text' : 'textMask';

    // Fallback to text input if `type` is not specified.
    if (!this.data?.type) return defaultInput;

    switch (this.data?.type) {
      case 'number':
      case 'text':
        return defaultInput;

      default:
        return this.data.type;
    }
  }
}
