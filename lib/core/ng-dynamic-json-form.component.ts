import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  Output,
  SimpleChanges,
  TemplateRef,
  Type,
  ViewChild,
  forwardRef,
  inject,
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
import { ConfigValidationErrors } from './models/config-validation-errors.interface';
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
import { UI_BASIC_COMPONENTS } from './ui-basic/ui-basic-components.constant';
import { getControlErrors } from './utilities/get-control-errors';

@Component({
  selector: 'ng-dynamic-json-form',
  templateUrl: './ng-dynamic-json-form.component.html',
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
  private optionsDataService = inject(OptionsDataService);

  private controlDirective: FormControlDirective | null = null;
  /**
   * Whether to allow the form to mark as dirty
   * @description
   * If false, then it will automatically set to pristine
   * after each value changes.
   */
  private allowFormDirty = false;
  private globalVariablesInitialized = false;
  private reset$ = new Subject<void>();
  private validationCount = 0;

  private onTouched = () => {};
  private onChangeFn = (_: any) => {};

  configGet: FormControlConfig[] = [];
  configValidationErrors: ConfigValidationErrors[] = [];
  form?: UntypedFormGroup;

  @Input() configs?: FormControlConfig[] | string;
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
  @Input() customComponents?: CustomComponents;
  /**
   * Custom templates for input, using `formControlName` as the key.
   * Use this if creating a custom component is way too much.
   *
   * The template variables available:
   * - `control` The FormControl for this input
   * - `data` The config for this input
   */
  @Input() customTemplates?: CustomTemplates;
  /**
   * Functions to execute when conditions is met.
   * @description
   * - When there's condition met, the function with key that match will be called.
   * - The function contains an optional argument, which is the control of where the conditions will affect to.
   */
  @Input() conditionsActionFunctions?: ConditionsActionFunctions;

  @Input() collapsibleState?: FormLayout['contentCollapsible'];
  @Input() descriptionPosition?: FormLayout['descriptionPosition'];
  @Input() rootClass?: string;
  @Input() rootStyles?: string;
  @Input() hideErrorMessage?: boolean;

  // Custom error components/templates
  @Input() errorComponents?: CustomErrorComponents;
  @Input() errorComponentDefault?: Type<CustomErrorMessage>;
  @Input() errorTemplates?: CustomTemplates;
  @Input() errorTemplateDefault?: TemplateRef<any>;

  // Custom label components/templates
  @Input() labelComponents?: CustomLabelComponents;
  @Input() labelComponentDefault?: Type<CustomFormLabel>;
  @Input() labelTemplates?: CustomTemplates;
  @Input() labelTemplateDefault?: TemplateRef<any>;

  // Custom loading components/templates
  @Input() loadingComponent?: Type<any>;
  @Input() loadingTemplate?: TemplateRef<any>;
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
  @Input() optionsSources?: { [key: string]: Observable<OptionItem[]> };

  @Output() formGet = new EventEmitter<UntypedFormGroup>();
  /**
   * The value change event of the form, which trigger by the user
   * (by checking click or keydown event)
   */
  @Output() onChange = new EventEmitter<any>();
  @Output() optionsLoaded = new EventEmitter<void>();
  @Output() displayValue = new EventEmitter<FormDisplayValue>();
  @Output() updateStatusFunctions = new EventEmitter<FormStatusFunctions>();

  @ViewChild(FormGroupComponent) formGroupRef?: FormGroupComponent;

  ngOnChanges(simpleChanges: SimpleChanges): void {
    const { configs, hideErrorMessage } = simpleChanges;

    if (hideErrorMessage) {
      this.globalVariableService.hideErrorMessage$.next(
        hideErrorMessage.currentValue,
      );
    }

    if (configs && this.globalVariablesInitialized) {
      this.buildForm();
    }
  }

  ngOnInit(): void {
    this.setupVariables();
    this.getControlDirective();
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.reset$.next();
    this.reset$.complete();
    this.optionsDataService.onDestroy();
  }

  validate(): Observable<ValidationErrors | null> {
    if (!this.form || this.form.valid) {
      return of(null);
    }

    return this.form.statusChanges.pipe(
      startWith(this.form.status),
      filter((x) => x !== 'PENDING'),
      take(1),
      map(() => this._formErrors),
    );
  }

  registerOnValidatorChange?(fn: () => void): void {}

  writeValue(obj: any): void {
    this.formValueService.patchForm(this.form, obj);
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form?.disable() : this.form?.enable();
  }

  private setupVariables(): void {
    const {
      errorComponent,
      labelComponent,
      loadingComponent,
      uiComponents,
      ...providerProps
    } = this.providerConfig ?? {};

    const errors = {
      errorComponents: this.errorComponents,
      errorTemplates: this.errorTemplates,
      errorComponentDefault: this.errorComponentDefault ?? errorComponent,
      errorTemplateDefault: this.errorTemplateDefault,
    };

    const labels = {
      labelComponents: this.labelComponents,
      labelTemplates: this.labelTemplates,
      labelComponentDefault: this.labelComponentDefault ?? labelComponent,
      labelTemplateDefault: this.labelTemplateDefault,
    };

    const loading = {
      loadingComponent: this.loadingComponent ?? loadingComponent,
      loadingTemplate: this.loadingTemplate,
    };

    this.globalVariableService.setup({
      ...errors,
      ...labels,
      ...loading,
      uiComponents: {
        ...UI_BASIC_COMPONENTS,
        ...uiComponents,
      },
      customComponents: this.customComponents,
      customTemplates: this.customTemplates,
      conditionsActionFunctions: this.conditionsActionFunctions,
      descriptionPosition: this.descriptionPosition,
      hostElement: this.el.nativeElement,
      optionsSources: this.optionsSources,
      customAsyncValidators: providerProps.customAsyncValidators,
      customValidators: providerProps.customValidators,
      hideErrorsForTypes: providerProps.hideErrorsForTypes,
      showErrorsOnTouched: providerProps.showErrorsOnTouched ?? true,
      validationMessages: providerProps.validationMessages,
    });

    this.globalVariablesInitialized = true;
  }

  private buildForm(): void {
    this.reset();

    if (!this.configs) {
      return;
    }

    const result = this.configValidationService.validateAndGetConfig(
      this.configs,
    );

    this.configGet = result.configs ?? [];
    this.configValidationErrors = result.errors ?? [];
    this.allowFormDirty = false;

    if (this.configGet.length > 0 && !this.configValidationErrors.length) {
      this.form = this.formGeneratorService.generateFormGroup(this.configGet);

      this.globalVariableService.rootForm = this.form;
      this.globalVariableService.rootConfigs = this.configGet;

      this.cd.detectChanges();
      this.setupListeners();

      if (typeof window !== 'undefined') {
        // The form controls' state will be toggle immediately after conditions listeners are setup.
        // It will be a problem when user calling the `disable()` or `enable()` in the `formGet` callback (race condition).
        // Hence, we emit the event in the next tick to prevent this.
        window.setTimeout(() => {
          this.formGet.emit(this.form);
          this.updateStatusFunctions.emit({
            setDirty: () => this.updateFormStatus('setDirty'),
            setPristine: () => this.updateFormStatus('setPristine'),
            setTouched: () => this.updateFormStatus('setTouched'),
            setUntouched: () => this.updateFormStatus('setUntouched'),
          });

          this.checkOptionsLoaded();
        });
      }
    }

    if (!this.formReadyStateService.haveOptionsToWait(this.configGet)) {
      this.formReadyStateService.optionsLoading(false);
    }
  }

  private getControlDirective(): void {
    this.controlDirective = this.injector.get(NgControl, null, {
      optional: true,
      self: true,
    }) as FormControlDirective;
  }

  private setupListeners(): void {
    if (!this.form || typeof window === 'undefined') {
      return;
    }

    const host = this.el.nativeElement;
    const conditions$ = this.formConditionsService.listenConditions$();
    const event$ = (name: string) => fromEvent(host, name, { passive: true });

    const valueChanges$ = this.formValueChanges$();

    // Avoid using `debounceTime()` or `distinctUntilChanged()` here
    const statusChanges$ = this.form.statusChanges.pipe(
      startWith(this.form.status),
      tap(() => {
        // setErrors() again after statusChanges, to get the correct errors after
        // the re-validation if there are any async validators.
        this.form?.setErrors(this._formErrors, {
          emitEvent: false, // prevent maximum call stack exceeded
        });
      }),
    );

    const onTouched$ = event$('focusout').pipe(
      take(1),
      tap(() => this.onTouched()),
    );

    const allowDirtyState$ = merge(
      event$('pointerdown'),
      event$('keydown'),
    ).pipe(
      take(1),
      tap(() => (this.allowFormDirty = true)),
    );

    this.reset$.next();
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
    this.optionsDataService.cancelAllRequest();
    this.formReadyStateService.resetState();
    this.controlDirective?.control.markAsUntouched();
    this.controlDirective?.form.markAsUntouched();
    this.configValidationErrors = [];
  }

  private updateFormStatus(status: keyof FormStatusFunctions): void {
    switch (status) {
      case 'setDirty':
        this.formGroupRef?.updateStatus('dirty');
        break;

      case 'setPristine':
        this.formGroupRef?.updateStatus('pristine');
        break;

      case 'setTouched':
        this.formGroupRef?.updateStatus('touched');
        break;

      case 'setUntouched':
        this.formGroupRef?.updateStatus('untouched');
        break;
    }
  }

  private formValueChanges$(): Observable<any> {
    const form = this.form;
    if (!form) {
      return EMPTY;
    }

    const updateValue = () => {
      const value = form.value;

      if (this.controlDirective) {
        this.onChangeFn(value);
      }

      if (this.allowFormDirty) {
        this.onChange.emit(value);
      }
    };

    const updateDisplayValue = () => {
      const displayValue = this.formValueService.getFormDisplayValue(
        form.value,
        this.configGet,
      );

      this.displayValue.emit(displayValue);
    };

    const keepFormPristine = () => {
      if (this.allowFormDirty) return;
      this.updateFormStatus('setPristine');
      this.controlDirective?.control.markAsPristine();
    };

    // Avoid using `debounceTime()` or `distinctUntilChanged()` here
    return form.valueChanges.pipe(
      startWith(form.value),
      tap(() => {
        //`setErrors()` must be called first, so that the form errors
        // is correctly set when `onChange` callback is called
        form.setErrors(this._formErrors);
        updateValue();
        updateDisplayValue();
        keepFormPristine();
      }),
    );
  }

  private checkOptionsLoaded(): void {
    const ready$ = this.formReadyStateService.optionsReady$;

    if (ready$.value) {
      this.optionsLoaded.emit();
      return;
    }

    ready$
      .pipe(
        filter(Boolean),
        take(1),
        tap(() => this.optionsLoaded.emit()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private get _formErrors(): ValidationErrors | null {
    if (!this.form) return null;

    const errors = getControlErrors(this.form);
    return errors;
  }
}
