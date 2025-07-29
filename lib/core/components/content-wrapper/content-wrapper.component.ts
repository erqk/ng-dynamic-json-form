import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { delay, filter, map, merge, switchMap } from 'rxjs';
import { ControlLayoutDirective } from '../../directives/control-layout.directive';
import { FormControlConfig } from '../../models';
import { FormLayout } from '../../models/form-layout.interface';
import { IsControlRequiredPipe } from '../../pipes/is-control-required.pipe';
import { GlobalVariableService } from '../../services/global-variable.service';
import { WindowEventService } from '../../services/window-event.service';
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
  private windowEventService = inject(WindowEventService);

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

  controlStatus = toSignal(
    toObservable(this.control).pipe(
      filter(Boolean),
      filter(() => typeof window !== 'undefined'),
      switchMap((x) => {
        const userEvent$ = merge(
          this.windowEventService.keyUp$,
          this.windowEventService.pointerUp$,
        ).pipe(
          // Control state is unchanged until the keyup/pointerup event was fired.
          // We give some time for the control to check and update, so what we
          // can get the latest result correctly.
          delay(1),
        );

        return merge(x.statusChanges, userEvent$);
      }),
      map(() => ({
        dirty: this.control()?.dirty ?? false,
        touched: this.control()?.touched ?? false,
      })),
    ),
  );

  hideErrors = toSignal(this.global.hideErrorMessage$);

  showErrors = computed(() => {
    const control = this.control();
    const controlStatus = this.controlStatus();
    const hideErrors = this.hideErrors();

    if (!control || hideErrors) {
      return false;
    }

    if (control.errors) {
      const { dirty, touched } = controlStatus ?? {};

      if (this.showErrorsOnTouched) {
        return dirty || touched || false;
      }

      return dirty ?? false;
    }

    return false;
  });
}
