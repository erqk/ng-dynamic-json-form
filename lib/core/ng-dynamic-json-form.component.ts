import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  Injector,
  TemplateRef,
  Type,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormControlDirective,
  NG_ASYNC_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  UntypedFormGroup,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import {
  EMPTY,
  Observable,
  Subject,
  filter,
  fromEvent,
  map,
  merge,
  of,
  startWith,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { CustomErrorMessage } from './components/custom-error-message/custom-error-message.abstract';
import { CustomFormLabel } from './components/custom-form-label/custom-form-label.abstract';
import { FormGroupComponent } from './components/form-group/form-group.component';
import { CustomComponents, FormControlConfig, OptionItem } from './models';
import { ConditionsActionFunctions } from './models/conditions-action-functions.interface';
import { CustomErrorComponents } from './models/custom-error-components.type';
import { CustomLabelComponents } from './models/custom-label-components.type';
import { CustomTemplates } from './models/custom-templates.type';
import { FormDisplayValue } from './models/form-display-value.interface';
import { FormLayout } from './models/form-layout.interface';
import { FormStatusFunctions } from './models/form-status-functions.interface';
import { NG_DYNAMIC_JSON_FORM_CONFIG } from './providers/ng-dynamic-json-form.provider';
import {
  ConfigMappingService,
  ConfigValidationService,
  FormConditionsService,
  FormGeneratorService,
  FormValidationService,
  FormValueService,
  GlobalVariableService,
  HttpRequestCacheService,
  OptionsDataService,
} from './services';
import { FormReadyStateService } from './services/form-ready-state.service';
import { WindowEventService } from './services/window-event.service';
import { UI_BASIC_COMPONENTS } from './ui-basic/ui-basic-components.constant';
import { getControlErrors } from './utilities/get-control-errors';

@Component({
  selector: 'ng-dynamic-json-form',
  templateUrl: './ng-dynamic-json-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormGroupComponent],
  host: {
    class: 'ng-dynamic-json-form',
  },
  providers: [
    ConfigValidationService,
    ConfigMappingService,
    FormGeneratorService,
    FormConditionsService,
    FormValidationService,
    FormValueService,
    FormReadyStateService,
    GlobalVariableService,
    HttpRequestCacheService,
    OptionsDataService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgDynamicJsonFormComponent),
      multi: true,
    },
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => NgDynamicJsonFormComponent),
      multi: true,
    },
  ],
})
export class NgDynamicJsonFormComponent
  implements ControlValueAccessor, Validator
{
  private providerConfig = inject(NG_DYNAMIC_JSON_FORM_CONFIG, {
    optional: true,
  });
  private cd = inject(ChangeDetectorRef);
  private el = inject(ElementRef);
  private injector = inject(Injector);
  private destroyRef = inject(DestroyRef);
  private configValidationService = inject(ConfigValidationService);
  private formGeneratorService = inject(FormGeneratorService);
  private formConditionsService = inject(FormConditionsService);
  private formValueService = inject(FormValueService);
  private formReadyStateService = inject(FormReadyStateService);
  private globalVariableService = inject(GlobalVariableService);
  private windowEventService = inject(WindowEventService);
  private optionsDataService = inject(OptionsDataService);

  private controlDirective: FormControlDirective | null = null;
  /**
   * Whether to allow the form to mark as dirty
   * @description
   * If false, then it will automatically set to pristine
   * after each value changes.
   */
  private allowFormDirty = signal<boolean>(false);
  private globalVariablesInitialized = signal<boolean>(false);
  private reset$ = new Subject<void>();

  private onTouched = () => {};
  private onChangeFn = (_: any) => {};

  private buildFormComplete = signal<boolean>(false);

  configs = input<FormControlConfig[] | string>();
  /**
   * User defined custom components. Use `formControlName` as the key to map target component.
   *
   * @example
   * // Config
   * {
   *    ...
   *    "formControlName": "compA"
   * }
   *
   * // TS
   * components = {
   *    compA: YourComponentA,
   *    compB: YourComponentB,
   *    ...
   * }
   */
  customComponents = input<CustomComponents>();
  /**
   * Custom templates for input, using `formControlName` as the key.
   * Use this if creating a custom component is way too much.
   *
   * The template variables available:
   * - `control` The FormControl for this input
   * - `data` The config for this input
   */
  customTemplates = input<CustomTemplates>();
  /**
   * Functions to execute when conditions is met.
   * @description
   * - When there's condition met, the function with key that match will be called.
   * - The function contains an optional argument, which is the control of where the conditions will affect to.
   */
  conditionsActionFunctions = input<ConditionsActionFunctions>();

  collapsibleState = input<FormLayout['contentCollapsible']>();
  descriptionPosition = input<FormLayout['descriptionPosition']>();
  rootClass = input<string>();
  rootStyles = input<string>();
  hideErrorMessage = signal<boolean | undefined>(undefined);

  // Custom error components/templates
  errorComponents = input<CustomErrorComponents>();
  errorComponentDefault = input<Type<CustomErrorMessage>>();
  errorTemplates = input<CustomTemplates>();
  errorTemplateDefault = input<TemplateRef<any>>();

  // Custom label components/templates
  labelComponents = input<CustomLabelComponents>();
  labelComponentDefault = input<Type<CustomFormLabel>>();
  labelTemplates = input<CustomTemplates>();
  labelTemplateDefault = input<TemplateRef<any>>();

  // Custom loading components/templates
  loadingComponent = input<Type<any>>();
  loadingTemplate = input<TemplateRef<any>>();
  /**
   * Custom observables for the options
   * @description
   * The observable with key that match with the `src` will be used.
   *
   * @example
   * ```ts
   * optionsSources = {
   *    'getCountries': ...
   * }
   *
   * config = {
   *  ...
   *  options: {
   *    ...
   *    src: 'getCountries'
   *  }
   * }
   * ```
   */
  optionsSources = input<{ [key: string]: Observable<OptionItem[]> }>();

  formGet = output<UntypedFormGroup>();
  /**
   * The value change event of the form, which trigger by the user
   * (by checking click or keydown event)
   */
  onChange = output<any>();
  optionsLoaded = output<void>();
  displayValue = output<FormDisplayValue>();
  updateStatusFunctions = output<FormStatusFunctions>();

  formGroupRef = viewChild(FormGroupComponent);

  form = signal<UntypedFormGroup | undefined>(undefined);

  configValidationResult = computed(() => {
    const configs = this.configs();

    if (!configs?.length) {
      return undefined;
    }

    return this.configValidationService.validateAndGetConfig(configs);
  });

  buildForm = effect(() => {
    const globalVariablesInitialized = this.globalVariablesInitialized();
    const { configs } = this.configValidationResult() ?? {};

    if (
      typeof window === 'undefined' ||
      !globalVariablesInitialized ||
      !configs?.length
    ) {
      return;
    }

    untracked(() => {
      const form = this.formGeneratorService.generateFormGroup(configs);

      this.reset();

      // Setting up the global variables
      this.globalVariableService.rootForm = form;
      this.globalVariableService.rootConfigs = configs;

      // Instantiate the form component
      this.form.set(form);

      // After the form component is instantiated, start the event listeners
      this.setupListeners();

      this.cd.markForCheck();

      // Because at this time the form is just instantiate, it needs time to init the view.
      // Everything inside `queryMicrotask` only works in the next tick.
      queueMicrotask(() => {
        this.formConditionsService.executeConditions();
        this.formGet.emit(form);

        // Put this inside is only for the purpose to prevent it gets earlier than `formGet`,
        // to prevent user call this function while form is just instantiated.
        this.updateStatusFunctions.emit({
          setDirty: () => this.updateFormStatus('setDirty'),
          setPristine: () => this.updateFormStatus('setPristine'),
          setTouched: () => this.updateFormStatus('setTouched'),
          setUntouched: () => this.updateFormStatus('setUntouched'),
        });

        this.buildFormComplete.set(true);
      });
    });
  });

  handleOptionsReady = effect(() => {
    const { configs } = this.configValidationResult() ?? {};
    const buildFormComplete = this.buildFormComplete();
    const needWaiting = this.formReadyStateService.haveOptionsToWait(
      configs ?? [],
    );

    const ready = this.formReadyStateService.optionsReady();

    if (!buildFormComplete) {
      return;
    }

    if (!needWaiting) {
      this.optionsLoaded.emit();
    } else if (ready) {
      this.optionsLoaded.emit();
    }
  });

  handleHideErrorMessageValueChange = effect(() => {
    this.globalVariableService.hideErrorMessage$.next(this.hideErrorMessage());
  });

  ngOnInit(): void {
    this.windowEventService
      .start$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.setupVariables();
    this.getControlDirective();
  }

  ngOnDestroy(): void {
    this.reset$.next();
    this.reset$.complete();
    this.optionsDataService.onDestroy();
  }

  validate(): Observable<ValidationErrors | null> {
    const form = this.form();

    if (!form || form.valid) {
      return of(null);
    }

    return form.statusChanges.pipe(
      startWith(form.status),
      filter((x) => x !== 'PENDING'),
      take(1),
      map(() => this.formErrors),
    );
  }

  registerOnValidatorChange?(fn: () => void): void {}

  writeValue(obj: any): void {
    const form = this.form();

    this.formValueService.patchForm(form, obj);
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    const form = this.form();
    isDisabled ? form?.disable() : form?.enable();
  }

  private setupVariables(): void {
    const {
      errorComponent,
      labelComponent,
      loadingComponent,
      uiComponents,
      ...providerProps
    } = this.providerConfig ?? {};

    this.globalVariableService.setup({
      customValidators: providerProps.customValidators,
      customAsyncValidators: providerProps.customAsyncValidators,
      customComponents: this.customComponents(),
      customTemplates: this.customTemplates(),
      conditionsActionFunctions: this.conditionsActionFunctions(),
      descriptionPosition: this.descriptionPosition(),
      errorComponentDefault: this.errorComponentDefault() ?? errorComponent,
      errorComponents: this.errorComponents(),
      errorTemplates: this.errorTemplates(),
      errorTemplateDefault: this.errorTemplateDefault(),
      hostElement: this.el.nativeElement,
      hideErrorsForTypes: providerProps.hideErrorsForTypes,
      labelComponentDefault: this.labelComponentDefault() ?? labelComponent,
      labelComponents: this.labelComponents(),
      labelTemplates: this.labelTemplates(),
      labelTemplateDefault: this.labelTemplateDefault(),
      loadingComponent: this.loadingComponent() ?? loadingComponent,
      loadingTemplate: this.loadingTemplate(),
      optionsSources: this.optionsSources(),
      showErrorsOnTouched: providerProps.showErrorsOnTouched ?? true,
      uiComponents: {
        ...UI_BASIC_COMPONENTS,
        ...uiComponents,
      },
      validationMessages: providerProps.validationMessages,
    });

    this.globalVariablesInitialized.set(true);
  }

  private getControlDirective(): void {
    this.controlDirective = this.injector.get(NgControl, null, {
      optional: true,
      self: true,
    }) as FormControlDirective;
  }

  private setupListeners(): void {
    const form = this.form();

    if (!form || typeof window === 'undefined') {
      return;
    }

    const hostEvent$ = (name: string) =>
      fromEvent(this.el.nativeElement, name, { passive: true });

    const conditions$ = this.formConditionsService.listenConditions$();
    const valueChanges$ = this.formValueChanges$();

    // Avoid using `debounceTime()` or `distinctUntilChanged()` here
    const statusChanges$ = form.statusChanges.pipe(
      startWith(form.status),
      tap(() => {
        const errors = this.formErrors;

        // setErrors() again after statusChanges, to get the correct errors after
        // the re-validation if there are any async validators.
        form?.setErrors(errors, {
          emitEvent: false, // prevent maximum call stack exceeded
        });
      }),
    );

    const onTouched$ = hostEvent$('focusout').pipe(
      take(1),
      tap(() => this.onTouched()),
    );

    const allowDirtyState$ = merge(
      hostEvent$('pointerdown'),
      hostEvent$('keydown'),
    ).pipe(
      take(1),
      tap(() => this.allowFormDirty.set(true)),
    );

    merge(
      allowDirtyState$,
      conditions$,
      onTouched$,
      statusChanges$,
      valueChanges$,
    )
      .pipe(takeUntil(this.reset$), takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  private reset(): void {
    this.reset$.next();
    this.form.set(undefined);
    this.allowFormDirty.set(false);
    this.buildFormComplete.set(false);

    this.optionsDataService.cancelAllRequest();
    this.formReadyStateService.resetState();
    this.controlDirective?.control.markAsUntouched();
    this.controlDirective?.form.markAsUntouched();
  }

  private updateFormStatus(status: keyof FormStatusFunctions): void {
    const form = this.formGroupRef();

    if (!form) {
      return;
    }

    switch (status) {
      case 'setDirty':
        form.updateStatus('dirty');
        break;

      case 'setPristine':
        form.updateStatus('pristine');
        break;

      case 'setTouched':
        form.updateStatus('touched');
        break;

      case 'setUntouched':
        form.updateStatus('untouched');
        break;
    }
  }

  private formValueChanges$(): Observable<any> {
    const form = this.form();

    if (!form) {
      return EMPTY;
    }

    const { configs } = this.configValidationResult() ?? {};

    const updateValue = () => {
      const allowDirty = this.allowFormDirty();
      const value = form.value;

      if (this.controlDirective) {
        this.onChangeFn(value);
      }

      if (allowDirty) {
        this.onChange.emit(value);
      }
    };

    const updateDisplayValue = () => {
      const displayValue = this.formValueService.getFormDisplayValue(
        form.value,
        configs || [],
      );

      this.displayValue.emit(displayValue);
    };

    const keepFormPristine = () => {
      const allowDirty = this.allowFormDirty();

      if (allowDirty) {
        return;
      }

      this.updateFormStatus('setPristine');
      this.controlDirective?.control.markAsPristine();
    };

    // Avoid using `debounceTime()` or `distinctUntilChanged()` here
    return form.valueChanges.pipe(
      startWith(form.value),
      tap(() => {
        const errors = this.formErrors;

        //`setErrors()` must be called first, so that the form errors
        // is correctly set when `onChange` callback is called
        form.setErrors(errors);
        updateValue();
        updateDisplayValue();
        keepFormPristine();
      }),
    );
  }

  /**
   * Use getter function to make everything works fine,
   * don't use computed signal
   */
  private get formErrors() {
    const form = this.form();

    if (!form) {
      return null;
    }

    const errors = getControlErrors(form);
    return errors;
  }
}
