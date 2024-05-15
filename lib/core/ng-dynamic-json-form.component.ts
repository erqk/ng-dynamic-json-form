import { CommonModule, isPlatformServer } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  Output,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
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
  ValidatorFn,
} from '@angular/forms';
import {
  Subject,
  debounceTime,
  fromEvent,
  merge,
  startWith,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { FormControlComponent } from './components/form-control/form-control.component';
import { FormGroupComponent } from './components/form-group/form-group.component';
import { FormTitleComponent } from './components/form-title/form-title.component';
import { ControlLayoutDirective } from './directives/control-layout.directive';
import { HostIdDirective } from './directives/host-id.directive';
import { FormControlConfig, UiComponents } from './models';
import { CustomComponents } from './models/custom-components.type';
import { CustomErrorComponents } from './models/custom-error-components.type';
import { CustomLabelComponents } from './models/custom-label-components.type';
import { CustomTemplates } from './models/custom-templates.type';
import { FormLayout } from './models/form-layout.interface';
import { GlobalLayoutComponents } from './models/global-layout-components.interface';
import { GlobalLayoutTemplates } from './models/global-layout-templates.interface';
import { NG_DYNAMIC_JSON_FORM_CONFIG } from './ng-dynamic-json-form.config';
import { IsControlRequiredPipe } from './pipes/is-control-required.pipe';
import {
  ControlValueService,
  FormConditionsService,
  FormGeneratorService,
  OptionsDataService,
} from './services';
import { ConfigMappingService } from './services/config-mapping.service';
import { ConfigValidationService } from './services/config-validation.service';
import { FormPatcherService } from './services/form-patcher.service';
import { FormValidationService } from './services/form-validation.service';
import { GlobalVariableService } from './services/global-variable.service';
import { NgxMaskConfigInitService } from './services/ngx-mask-config-init.service';
import { UI_BASIC_COMPONENTS } from './ui-basic/ui-basic-components.constant';
import { markFormPristine } from './utilities/mark-form-pristine';

@Component({
  selector: 'ng-dynamic-json-form',
  templateUrl: './ng-dynamic-json-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlComponent,
    HostIdDirective,
    ControlLayoutDirective,
    FormTitleComponent,
    FormGroupComponent,
    IsControlRequiredPipe,
  ],
  providers: [
    ConfigValidationService,
    ConfigMappingService,
    ControlValueService,
    FormGeneratorService,
    FormConditionsService,
    FormValidationService,
    FormPatcherService,
    NgxMaskConfigInitService,
    OptionsDataService,
    GlobalVariableService,
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
  private _platformId = inject(PLATFORM_ID);
  private _el = inject(ElementRef);
  private _renderer2 = inject(Renderer2);
  private _injector = inject(Injector);
  private _destroyRef = inject(DestroyRef);
  private _configValidationService = inject(ConfigValidationService);
  private _formGeneratorService = inject(FormGeneratorService);
  private _formConditionsService = inject(FormConditionsService);
  private _formValidationService = inject(FormValidationService);
  private _formPatcherService = inject(FormPatcherService);
  private _globalVariableService = inject(GlobalVariableService);
  private _optionsDataService = inject(OptionsDataService);
  private _reset$ = new Subject<void>();

  private _onTouched = () => {};
  private _onChange = (x: any) => {};

  private _controlDirective: FormControlDirective | null = null;

  /**Whether to allow the form to mark as dirty
   * @description
   * If false, then it willl automatically set to pristine
   * after each value changes.
   */
  private _allowFormDirty = false;

  configGet: FormControlConfig[] = [];
  configValidationErrors: string[] = [];

  form?: UntypedFormGroup;
  uiComponentsGet: UiComponents = UI_BASIC_COMPONENTS;

  @Input() configs: FormControlConfig[] | string = [];

  /**Form control components built with other libraries */
  @Input() uiComponents?: UiComponents = this._providerConfig?.uiComponents;

  /**
   * User defined custom valiators. Use `name` as the key to map target ValidatorFn.
   *
   * @example
   * JSON:
   * {
   *    ...
   *    "validators": [
   *      {
   *        "name": "firstUppercase"
   *      }
   *    ]
   * }
   *
   * validators = {
   *    firstUppercase: firstUppercaseValidator,
   *    url: urlValidator,
   *    ...
   * }
   */
  @Input() customValidators?: { [key: string]: ValidatorFn } =
    this._providerConfig?.customValidators;

  /**
   * User defined custom components. Use `formControlName` as the key to map target component.
   *
   * @example
   * JSON:
   * {
   *    ...
   *    "formControlName": "compA"
   * }
   *
   * components = {
   *    compA: YourComponentA,
   *    compB: YourComponentB,
   *    ...
   * }
   */
  @Input() customComponents?: CustomComponents;

  /**
   * Custom templates for input, suitable for input using only `FormControl`.
   * To use `FormGroup` or `FormArray`, use `CustomControlComponent` instead.
   */
  @Input() customTemplates?: CustomTemplates;

  /**Custom components/templates for error message of specific control,
   * where formControlName is the key */
  @Input() errorComponents?: CustomErrorComponents;
  @Input() errorTemplates?: CustomTemplates;

  /**Custom components/templates for global layout UI */
  @Input() globalLayoutComponents?: GlobalLayoutComponents =
    this._providerConfig?.globalLayoutComponents;
  @Input() globalLayoutTemplates?: GlobalLayoutTemplates;

  /**Custom components/templates for label of specific control,
   * where formControlName is the key */
  @Input() labelComponents?: CustomLabelComponents;
  @Input() labelTemplates?: CustomTemplates;

  /**Control the show/hide of all the error messages */
  @Input() hideErrorMessage?: boolean;

  /**Toggle all the collapsible state */
  @Input() collapsibleState?: FormLayout['contentCollapsible'];

  @Output() formGet = new EventEmitter();

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (isPlatformServer(this._platformId)) {
      return;
    }

    const { configs, customValidators, uiComponents, hideErrorMessage } =
      simpleChanges;

    if (hideErrorMessage) {
      this._globalVariableService.hideErrorMessage$.next(this.hideErrorMessage);
    }

    if (configs || customValidators || uiComponents) {
      this.uiComponentsGet = {
        ...UI_BASIC_COMPONENTS,
        ...this.uiComponents,
      };

      this._globalVariableService.customValidators = this.customValidators;
      this._globalVariableService.uiComponents = this.uiComponentsGet;

      this._setHostUiClass();
      this._buildForm();
    }
  }

  ngOnInit(): void {
    if (isPlatformServer(this._platformId)) {
      return;
    }

    this._globalVariableService.setup({
      customValidators: this.customValidators,
      customComponents: this.customComponents,
      customTemplates: this.customTemplates,
      errorComponents: this.errorComponents,
      errorTemplates: this.errorTemplates,
      globalLayoutComponents: this.globalLayoutComponents,
      globalLayoutTemplates: this.globalLayoutTemplates,
      labelComponents: this.labelComponents,
      labelTemplates: this.labelTemplates,
    });

    this._getControlDirective();
    this._initHostClass();
    this._setHostUiClass();
  }

  ngOnDestroy(): void {
    this._reset$.next();
    this._reset$.complete();
    this._optionsDataService.onDestroy();
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    // This function will always called on next event loop,
    // so we get the errors immediately when this function is called.
    return this._formErrors;
  }

  registerOnValidatorChange?(fn: () => void): void {
    return;
  }

  writeValue(obj: any): void {
    this._formPatcherService.patchForm(this.form, obj);
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

  private _initHostClass(): void {
    const hostEl = this._el.nativeElement as HTMLElement;

    this._renderer2.addClass(hostEl, 'ng-dynamic-json-form');
    this._formConditionsService.hostEl = hostEl;
  }

  private _setHostUiClass(): void {
    const hostEl = this._el.nativeElement as HTMLElement;
    const useDefaultUi =
      !this.uiComponents || !Object.keys(this.uiComponents).length;

    useDefaultUi
      ? this._renderer2.addClass(hostEl, 'ui-basic')
      : this._renderer2.removeClass(hostEl, 'ui-basic');
  }

  private _buildForm(): void {
    this._clearListeners();
    this.configValidationErrors = [];

    const validationResult = this._configValidationService.validateAndGetConfig(
      this.configs
    );
    if (!validationResult.configs) {
      this.configValidationErrors = validationResult.configValidationErrors;
      return;
    }

    this.configGet = validationResult.configs ?? [];
    this._formValidationService.customValidators = this.customValidators;
    this._formPatcherService.config = this.configGet;
    this._allowFormDirty = false;

    this.form = this._formGeneratorService.generateFormGroup(this.configGet);
    this._globalVariableService.rootForm = this.form;
    this.formGet.emit(this.form);

    this._setupListeners();
  }

  private _getControlDirective(): void {
    this._controlDirective = this._injector.get(NgControl, null, {
      optional: true,
      self: true,
    }) as FormControlDirective;
  }

  private _setupListeners(): void {
    if (!this.form) return;

    const host = this._el.nativeElement;
    const event$ = (name: string) => fromEvent(host, name, { passive: true });

    const conditions$ = this._formConditionsService.formConditionsEvent$(
      this.form,
      this.configGet
    );

    const valueChanges$ = this.form.valueChanges.pipe(
      startWith(this.form.value),
      debounceTime(0),
      tap(() => this._onFormValueChanges())
    );

    const onTouched$ = event$('focusout').pipe(
      take(1),
      tap(() => this._onTouched())
    );

    const allowDirtyState$ = merge(
      event$('focusin'),
      event$('click'),
      event$('keydown')
    ).pipe(
      take(1),
      tap(() => (this._allowFormDirty = true))
    );

    merge(allowDirtyState$, onTouched$, conditions$, valueChanges$)
      .pipe(takeUntil(this._reset$), takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }

  private _clearListeners(): void {
    this._reset$.next();
    this._optionsDataService.cancelAllRequest();
  }

  private _onFormValueChanges(): void {
    let markForCheck = false;

    this._onChange(this.form?.value);

    if (!this._allowFormDirty) {
      // The FormControl of ControlValueAccessor
      const formControl = this._controlDirective?.form;
      formControl?.markAsPristine();
      this.form && markFormPristine(this.form);
    }

    // No ControlValueAccessor is used, update the form errors manually
    if (!this._controlDirective) {
      this.form?.setErrors(this._formErrors);
    }

    if (!markForCheck) {
      this._cd.markForCheck();
      this._cd.detectChanges();
      markForCheck = true;
    }
  }

  private get _formErrors(): ValidationErrors | null {
    if (!this.form) return null;

    const errors = this._formValidationService.getFormErrors(this.form);
    return errors;
  }
}
