import {
  Component,
  Input,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiBasicInputComponent } from '../ui-basic/ui-basic-input/ui-basic-input.component';
import { NgDynamicJsonFormCustomComponent } from '../custom-component-base/custom-component-base.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';

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
  @Input() componentList: {
    [key: string]: Type<NgDynamicJsonFormCustomComponent>;
  } = {};

  @Input() customComponent?: Type<NgDynamicJsonFormCustomComponent>;

  @ViewChild('componentAnchor', { read: ViewContainerRef, static: true })
  componentAnchor!: ViewContainerRef;

  ngOnInit(): void {
    const inputComponent =
      this.customComponent ||
      this.componentList[this.inputType] ||
      UiBasicInputComponent;

    const componentRef = this.componentAnchor.createComponent(inputComponent);

    componentRef.instance.data = this.data;
    componentRef.instance.control = this.control;
  }

  get inputType(): string {
    if (!this.data?.type) return 'input';

    switch (this.data?.type) {
      case 'email':
      case 'number':
      case 'password':
      case 'text':
        return 'input';

      default:
        return this.data.type;
    }
  }
}
