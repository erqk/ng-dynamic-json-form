import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  HostBinding,
  Injector,
  Input,
  Output,
  SimpleChanges,
  TemplateRef,
  Type,
  forwardRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControlDirective,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
  UntypedFormGroup,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import {
  Observable,
  Subject,
  filter,
  fromEvent,
  merge,
  startWith,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { CustomErrorMessage } from './components/custom-error-message/custom-error-message.abstract';
import { CustomFormLabel } from './components/custom-form-label/custom-form-label.abstract';
import { FormControlComponent } from './components/form-control/form-control.component';
import { FormGroupComponent } from './components/form-group/form-group.component';
import { ControlLayoutDirective } from './directives/control-layout.directive';
import { HostIdDirective } from './directives/host-id.directive';
import { CustomComponents, FormControlConfig, OptionItem } from './models';
import { ConditionsActionFunctions } from './models/conditions-action-functions.interface';
import { ConfigValidationErrors } from './models/config-validation-errors.interface';
import { CustomErrorComponents } from './models/custom-error-components.type';
import { CustomLabelComponents } from './models/custom-label-components.type';
import { CustomTemplates } from './models/custom-templates.type';
import { FormDisplayValue } from './models/form-display-value.interface';
import { FormLayout } from './models/form-layout.interface';
import { FormStatusFunctions } from './models/form-status-functions.interface';
import { IsControlRequiredPipe } from './pipes/is-control-required.pipe';
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
import { markFormDirty } from './utilities/mark-form-dirty';
import { markFormPristine } from './utilities/mark-form-pristine';
import { markFormTouched } from './utilities/mark-form-touched';
import { markFormUntouched } from './utilities/mark-form-untouched';

@Component({
  selector: 'ng-dynamic-json-form',
  templateUrl: './ng-dynamic-json-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlComponent,
    HostIdDirective,
    ControlLayoutDirective,
    FormGroupComponent,
    IsControlRequiredPipe,
  ],
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
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NgDynamicJsonFormComponent),
      multi: true,
    },
  ],
})
export class NgDynamicJsonFormComponent
  implements ControlValueAccessor, Validator
{
  private _providerConfig = inject(NG_DYNAMIC_JSON_FORM_CONFIG, {
    optional: true,
  });
  private _cd = inject(ChangeDetectorRef);
  private _el = inject(ElementRef);
  private _injector = inject(Injector);
  private _destroyRef = inject(DestroyRef);
  private _configValidationService = inject(ConfigValidationService);
  private _formGeneratorService = inject(FormGeneratorService);
  private _formConditionsService = inject(FormConditionsService);
  private _formValueService = inject(FormValueService);
  private _formReadyStateService = inject(FormReadyStateService);
  private _globalVariableService = inject(GlobalVariableService);
  private _optionsDataService = inject(OptionsDataService);
  private _reset$ = new Subject<void>();
  private _controlDirective: FormControlDirective | null = null;
  /**
   * Whether to allow the form to mark as dirty
   * @description
   * If false, then it will automatically set to pristine
   * after each value changes.
   */
  private _allowFormDirty = false;
  private _globalVariablesInitialized = false;

  private _onTouched = () => {};
  private _onChange = (_: any) => {};

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
   * The function where its key is match will be called when conditions is met.
   * The function contains an argument which is the current `AbstractControl`.
   */
  @Input() conditionsActionFunctions?: ConditionsActionFunctions;

  @Input() hideErrorMessage?: boolean;
  @Input() collapsibleState?: FormLayout['contentCollapsible'];

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
  @Output() optionsLoaded = new EventEmitter();
  @Output() displayValue = new EventEmitter<FormDisplayValue>();
  @Output() updateStatusFunctions = new EventEmitter<FormStatusFunctions>();

  @HostBinding('class') hostClass = 'ng-dynamic-json-form';

  constructor() {
    this._formReadyStateService.optionsReady$
      .pipe(
        filter(Boolean),
        tap(() => this.optionsLoaded.emit()),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    const { configs, hideErrorMessage } = simpleChanges;

    if (hideErrorMessage) {
      this._globalVariableService.hideErrorMessage$.next(
        hideErrorMessage.currentValue
      );
    }

    if (configs && this._globalVariablesInitialized) {
      this._buildForm();
    }
  }

  ngOnInit(): void {
    this._setupVariables();
    this._getControlDirective();
    this._buildForm();
  }

  ngOnDestroy(): void {
    this._reset$.next();
    this._reset$.complete();
    this._optionsDataService.onDestroy();
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this._formErrors;
  }

  registerOnValidatorChange?(fn: () => void): void {}

  writeValue(obj: any): void {
    this._formValueService.patchForm(this.form, obj);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form?.disable() : this.form?.enable();
  }

  private _setupVariables(): void {
    const {
      customValidators,
      labelComponent,
      errorComponent,
      loadingComponent,
      uiComponents,
    } = this._providerConfig ?? {};

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

    this._globalVariableService.setup({
      ...errors,
      ...labels,
      ...loading,
      hostElement: this._el.nativeElement,
      customValidators,
      customComponents: this.customComponents,
      customTemplates: this.customTemplates,
      conditionsActionFunctions: this.conditionsActionFunctions,
      optionsSources: this.optionsSources,
      uiComponents: {
        ...UI_BASIC_COMPONENTS,
        ...uiComponents,
      },
    });

    this._globalVariablesInitialized = true;
  }

  private _buildForm(): void {
    this._reset();

    if (!this.configs) {
      return;
    }

    const result = this._configValidationService.validateAndGetConfig(
      this.configs
    );

    this.configGet = result.configs ?? [];
    this.configValidationErrors = result.errors ?? [];
    this._allowFormDirty = false;

    if (this.configGet.length > 0 && !this.configValidationErrors.length) {
      this.form = this._formGeneratorService.generateFormGroup(this.configGet);

      // Set initial value of the form
      this._controlDirective?.control.setValue(this.form.value);

      this._globalVariableService.rootForm = this.form;
      this._globalVariableService.rootConfigs = this.configGet;

      this._cd.detectChanges();
      this._setupListeners();

      if (typeof window !== 'undefined') {
        window.setTimeout(() => {
          this.formGet.emit(this.form);
          this.updateStatusFunctions.emit({
            setDirty: () => this._updateFormStatus('setDirty'),
            setPristine: () => this._updateFormStatus('setPristine'),
            setTouched: () => this._updateFormStatus('setTouched'),
            setUntouched: () => this._updateFormStatus('setUntouched'),
          });
        });
      }
    }

    if (!this._formReadyStateService.haveOptionsToWait(this.configGet)) {
      this._formReadyStateService.optionsLoading(false);
    }
  }

  private _getControlDirective(): void {
    this._controlDirective = this._injector.get(NgControl, null, {
      optional: true,
      self: true,
    }) as FormControlDirective;
  }

  private _setupListeners(): void {
    if (!this.form || typeof window === 'undefined') {
      return;
    }

    const host = this._el.nativeElement;
    const conditions$ = this._formConditionsService.listenConditions$();
    const event$ = (name: string) => fromEvent(host, name, { passive: true });

    const valueChanges$ = this.form.valueChanges.pipe(
      startWith(this.form.value),
      // Avoid using debounceTime() or distinctUntilChanged() here
      tap(() => this._onFormValueChanges())
    );

    const onTouched$ = event$('focusout').pipe(
      take(1),
      tap(() => this._onTouched())
    );

    const allowDirtyState$ = merge(
      event$('pointerdown'),
      event$('keydown')
    ).pipe(
      take(1),
      tap(() => (this._allowFormDirty = true))
    );

    this._reset$.next();
    merge(allowDirtyState$, onTouched$, conditions$, valueChanges$)
      .pipe(takeUntil(this._reset$), takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }

  private _reset(): void {
    this._reset$.next();
    this._optionsDataService.cancelAllRequest();
    this._formReadyStateService.resetState();
    this._controlDirective?.control.markAsUntouched();
    this._controlDirective?.form.markAsUntouched();
    this.configValidationErrors = [];
  }

  private _updateFormStatus(status: keyof FormStatusFunctions): void {
    switch (status) {
      case 'setDirty':
        this._allowFormDirty = true;
        this._controlDirective?.control.markAsDirty();
        markFormDirty(this.form);
        break;

      case 'setPristine':
        this._allowFormDirty = false;
        this._controlDirective?.control.markAsPristine();
        markFormPristine(this.form);
        break;

      case 'setTouched':
        this._controlDirective?.control.markAsTouched();
        markFormTouched(this.form);
        break;

      case 'setUntouched':
        this._controlDirective?.control.markAsUntouched();
        markFormUntouched(this.form);
        break;
    }
  }

  private _onFormValueChanges(): void {
    const formValue = this.form?.value;

    const setErrors = () => {
      // Update the form errors manually, if no ControlValueAccessor found,
      if (!this._controlDirective) {
        this.form?.setErrors(this._formErrors);
      }
    };

    const updateValue = () => {
      if (this._allowFormDirty) {
        this.onChange.emit(formValue);

        // Update the control value, if using ControlValueAccessor
        if (this._controlDirective) {
          this._onChange(formValue);
        }
      }
    };

    const updateDisplayValue = () => {
      const displayValue = this._formValueService.getFormDisplayValue(
        formValue,
        this.configGet
      );

      this.displayValue.emit(displayValue);
    };

    // `setErrors()` must be called before `updateValue()`,
    // so that the form errors is correctly set when `onChange` callback is called
    setErrors();
    updateValue();
    updateDisplayValue();
  }

  private get _formErrors(): ValidationErrors | null {
    if (!this.form) return null;

    const errors = getControlErrors(this.form);
    return errors;
  }
}
