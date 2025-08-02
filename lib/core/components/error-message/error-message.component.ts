import { CommonModule } from '@angular/common';
import {
  Component,
  TemplateRef,
  Type,
  ViewContainerRef,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { ValidatorConfig } from '../../models';
import { FormValidationService } from '../../services/form-validation.service';
import { CustomErrorMessage } from '../custom-error-message/custom-error-message.abstract';

@Component({
  selector: 'error-message',
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
  host: {
    class: 'error-message',
  },
})
export class ErrorMessageComponent {
  private internal_formValidationService = inject(FormValidationService);
  private customComponentInstance = signal<CustomErrorMessage | null>(null);

  control = input<AbstractControl>();
  validators = input<ValidatorConfig[]>();
  customComponent = input<Type<CustomErrorMessage>>();
  customTemplate = input<TemplateRef<any> | null>(null);

  useDefaultTemplate = computed(
    () => !this.customComponent() && !this.customTemplate(),
  );

  componentAnchor = viewChild.required('componentAnchor', {
    read: ViewContainerRef,
  });

  errorMessages = rxResource({
    params: () => {
      const control = this.control();
      const validators = this.validators();

      return { control, validators };
    },
    stream: ({ params }) => {
      return this.internal_formValidationService.getErrorMessages$(
        params.control,
        params.validators,
      );
    },
    defaultValue: [],
  });

  updateControlErrors = effect(() => {
    const messages = this.errorMessages.value();
    const customComponent = this.customComponentInstance();

    if (!customComponent) {
      return;
    }

    customComponent.errorMessages.set([...messages]);
  });

  injectComponent = effect(() => {
    const control = this.control();
    const customComponent = this.customComponent();
    const anchor = this.componentAnchor();

    if (!customComponent || !anchor || !control) {
      return;
    }

    untracked(() => {
      anchor.clear();

      const componentRef = anchor.createComponent(customComponent);

      componentRef.instance.control = control;
      this.customComponentInstance.set(componentRef.instance);

      this.injectComponent.destroy();
    });
  });
}
