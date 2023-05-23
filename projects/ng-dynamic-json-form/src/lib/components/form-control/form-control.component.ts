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
  templateUrl: './form-control.component.html',
  styles: [
    ':host {display: flex; flex-direction: column; gap: 0.35rem; width: 100%}',
  ],
})
export class FormControlComponent extends NgDynamicJsonFormCustomComponent {
  @Input() uiComponents: UiComponents = {};
  @Input() customComponent?: Type<NgDynamicJsonFormCustomComponent>;

  @ViewChild('componentAnchor', { read: ViewContainerRef })
  componentAnchor!: ViewContainerRef;

  isMaterial = false;

  ngOnInit(): void {
    this.injectComponent();
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

  private injectComponent(): void {
    const inputComponent =
      this.customComponent ||
      this.uiComponents[this.inputType] ||
      UiBasicInputComponent;

    this.isMaterial = inputComponent.name.includes('UiMaterial');

    setTimeout(() => {
      const componentRef = this.componentAnchor.createComponent(inputComponent);
      componentRef.instance.data = this.data;
      componentRef.instance.control = this.control;
    }, 0);
  }
}
