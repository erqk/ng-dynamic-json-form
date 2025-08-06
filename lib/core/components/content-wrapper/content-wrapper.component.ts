import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { tap } from 'rxjs';
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
  styles: [],
})
export class ContentWrapperComponent {
  private global = inject(GlobalVariableService);

  readonly showErrorsOnTouched = this.global.showErrorsOnTouched;

  config = input<FormControlConfig>();
  control = input<AbstractControl>();
  collapsibleState = input<FormLayout['contentCollapsible']>();

  formControlName = computed(() => this.config()?.formControlName ?? '');

  description = computed(() => this.config()?.description);
  descriptionPosition = computed(() => {
    const position =
      this.layout()?.descriptionPosition ?? this.global.descriptionPosition;

    return position;
  });

  label = computed(() => this.config()?.label);
  layout = computed(() => this.config()?.layout);
  props = computed(() => this.config()?.props);

  validators = computed(() => {
    const { validators, asyncValidators } = this.config() ?? {};
    return [...(validators || []), ...(asyncValidators || [])];
  });

  showLabel = computed(() => this.label() && this.layout()?.hideLabel !== true);

  customErrorComponent = computed(() => {
    const name = this.formControlName();
    const components = this.global.errorComponents;
    const defaultComponent = this.global.errorComponentDefault;

    return components?.[name] ?? defaultComponent;
  });

  customErrorTemplate = computed(() => {
    const name = this.formControlName();
    const templates = this.global.errorTemplates;
    const defaultTemplate = this.global.errorTemplateDefault;

    return templates?.[name] ?? defaultTemplate ?? null;
  });

  customLabelComponent = computed(() => {
    const name = this.formControlName();
    const components = this.global.labelComponents;
    const defaultComponent = this.global.labelComponentDefault;

    return components?.[name] ?? defaultComponent;
  });

  customLabelTemplate = computed(() => {
    const name = this.formControlName();
    const templates = this.global.labelTemplates;
    const defaultTemplate = this.global.labelTemplateDefault;

    return templates?.[name] ?? defaultTemplate;
  });

  renderErrorSection = computed(() => {
    const type = this.config()?.type ?? 'text';
    const typesToHide = this.global.hideErrorsForTypes ?? [];

    return typesToHide.filter(Boolean).every((x) => x !== type);
  });

  isDirty = signal<boolean>(false);
  isTouched = signal<boolean>(false);

  hideErrors = toSignal(
    this.global.hideErrorMessage$.pipe(tap(() => this.updateControlStatus())),
  );

  showErrors = computed(() => {
    const control = this.control();
    const hideErrors = this.hideErrors();
    const isDirty = this.isDirty();
    const isTouched = this.isTouched();

    if (!control || hideErrors) {
      return false;
    }

    if (control.errors) {
      if (this.showErrorsOnTouched) {
        return isDirty || isTouched || false;
      }

      return isDirty ?? false;
    }

    return false;
  });

  updateControlStatus(): void {
    const control = this.control();

    // At this time this function is fired, all of the `updateControlStatus` in the `FormControlComponent` are just fired.
    // Control state is unchanged at this event loop, so we put it in the next event loop to get the correct result.
    queueMicrotask(() => {
      this.isDirty.set(control?.dirty ?? false);
      this.isTouched.set(control?.touched ?? false);
    });
  }
}
