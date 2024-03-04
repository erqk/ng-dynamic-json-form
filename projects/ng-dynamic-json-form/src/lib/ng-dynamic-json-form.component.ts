import { CommonModule, isPlatformServer } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  forwardRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  UntypedFormGroup,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import Ajv, { ValidateFunction } from 'ajv';
import { Subject, debounceTime, merge, take, takeUntil, tap } from 'rxjs';
import { UI_BASIC_COMPONENTS } from '../ui-basic/ui-basic-components.constant';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { FormArrayItemHeaderComponent } from './components/form-array-item-header/form-array-item-header.component';
import { FormControlComponent } from './components/form-control/form-control.component';
import { FormTitleComponent } from './components/form-title/form-title.component';
import * as schema from './config-schema.json';
import { ControlLayoutDirective, HostIdDirective } from './directives';
import { FormControlConfig, UiComponents } from './models';
import { CustomComponents } from './models/custom-components.type';
import { FormLayout } from './models/form-layout.interface';
import {
  LayoutComponents,
  LayoutTemplates,
  NG_DYNAMIC_JSON_FORM_CONFIG,
} from './ng-dynamic-json-form.config';
import {
  ControlValueService,
  FormConditionsService,
  FormGeneratorService,
  OptionsDataService,
} from './services';
import { ConfigMappingService } from './services/config-mapping.service';
import { FormPatcherService } from './services/form-patcher.service';
import { FormValidationService } from './services/form-validation.service';
import { NgxMaskConfigInitService } from './services/ngx-mask-config-init.service';

@Component({
  selector: 'ng-dynamic-json-form',
  templateUrl: './ng-dynamic-json-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlComponent,
    ErrorMessageComponent,
    HostIdDirective,
    ControlLayoutDirective,
    FormArrayItemHeaderComponent,
    FormTitleComponent,
  ],
  providers: [
    ConfigMappingService,
    ControlValueService,
    FormGeneratorService,
    FormConditionsService,
    FormValidationService,
    FormPatcherService,
    NgxMaskConfigInitService,
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
  private _platformId = inject(PLATFORM_ID);
  private _el = inject(ElementRef);
  private _renderer2 = inject(Renderer2);
  private _destroyRef = inject(DestroyRef);
  private _formGeneratorService = inject(FormGeneratorService);
  private _formConditionsService = inject(FormConditionsService);
  private _formValidationService = inject(FormValidationService);
  private _formPatcherService = inject(FormPatcherService);
  private _optionsDataService = inject(OptionsDataService);
  private _reset$ = new Subject<void>();

  private _onTouched = () => {};
  private _onChange = (x: any) => {};

  private _useControlValueAccessor = false;

  configGet: FormControlConfig[] = [];
  configValidateErrors: string[] = [];

  form?: UntypedFormGroup;
  uiComponentsGet: UiComponents = UI_BASIC_COMPONENTS;

  @Input() configs: FormControlConfig[] | string = [];

  /**
   * @description
   * User defined custom valiators. The `value` is the `key` of target ValidatorFn.
   *
   * @example
   * JSON config:
   * {
   *    ...
   *    "validators": [
   *      {
   *        "name": "custom",
   *        "value": "firstUppercase"
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
   * @description
   * User defined custom components. The `value` is the `key` of target component.
   *
   * @example
   * JSON config:
   * {
   *    ...
   *    "customComponent": "compA"
   * }
   *
   * components = {
   *    compA: YourComponentA,
   *    compB: YourComponentB,
   *    ...
   * }
   */
  @Input() customComponents?: CustomComponents =
    this._providerConfig?.customComponents;

  /**Form control components built with other libraries */
  @Input() uiComponents?: UiComponents = this._providerConfig?.uiComponents;

  /**Custom components for loading and error message */
  @Input() layoutComponents?: LayoutComponents =
    this._providerConfig?.layoutComponents;

  /**Custom templates for loading and error message */
  @Input() layoutTemplates?: LayoutTemplates;

  /**
   * Custom templates for input, suitable for input using only `FormControl`.
   * To use `FormGroup` or `FormArray`, use `CustomControlComponent` instead.
   */
  @Input() inputTemplates?: { [key: string]: TemplateRef<any> };

  /**Control the show/hide of all the error messages */
  @Input() hideErrorMessage?: boolean;

  /**Toggle all the collapsible state */
  @Input() collapsibleState?: FormLayout['contentCollapsible'];

  @Output() formGet = new EventEmitter();

  @HostListener('focusout', ['$event'])
  onFocusOut(): void {
    requestAnimationFrame(() => {
      this._onTouched();
    });
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (isPlatformServer(this._platformId)) {
      return;
    }

    const { configs, customValidators, uiComponents } = simpleChanges;

    if (configs || customValidators || uiComponents) {
      this.uiComponentsGet = {
        ...UI_BASIC_COMPONENTS,
        ...this.uiComponents,
      };

      this._setHostUiClass();
      this._buildForm();
    }
  }

  ngOnInit(): void {
    if (isPlatformServer(this._platformId)) {
      return;
    }

    this._initHostClass();
    this._setHostUiClass();
  }

  ngOnDestroy(): void {
    this._reset$.next();
    this._reset$.complete();
    this._formGeneratorService.reset$.next();
    this._formGeneratorService.reset$.complete();
    this._optionsDataService.onDestroy();
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    // This function will always called on next event loop,
    // so we get the errors immediately when this function is called.
    return this._updateFormErrors();
  }

  registerOnValidatorChange?(fn: () => void): void {
    return;
  }

  writeValue(obj: any): void {
    this._formPatcherService.patchForm(this.form, obj);
  }

  registerOnChange(fn: any): void {
    this._useControlValueAccessor = true;
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

  private _validateAndGetConfig(): FormControlConfig[] | null {
    if (!this.configs) return null;

    const data = Array.isArray(this.configs)
      ? { configs: this.configs }
      : this.configs;

    const win = window as any;
    const ajv: Ajv = win.ajv || new Ajv({ allErrors: true });
    const validate: ValidateFunction<unknown> =
      win.ngDynamiJsonFormValidateFn || ajv.compile(schema);

    if (!win.ajv) {
      win.ajv = ajv;
    }

    if (!win.ngDynamiJsonFormValidateFn) {
      win.ngDynamiJsonFormValidateFn = validate;
    }

    try {
      const parsed = JSON.parse(JSON.stringify(data));
      const valid = validate(parsed);

      if (!valid) {
        this.configValidateErrors = [
          ...(validate.errors ?? []).map((x) => JSON.stringify(x)),
        ];
        return null;
      }

      return (parsed as any)['configs'] ?? null;
    } catch (err: any) {
      // https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify
      this.configValidateErrors = [
        JSON.stringify(err, Object.getOwnPropertyNames(err)),
      ];
      return null;
    }
  }

  private _buildForm(): void {
    this._clearListeners();
    this.configValidateErrors = [];
    this.configGet = this._validateAndGetConfig() ?? [];

    if (!this.configGet || !this.configGet.length) return;

    this._formValidationService.customValidators = this.customValidators;
    this._formPatcherService.config = this.configGet;

    this.form = this._formGeneratorService.generateFormGroup(this.configGet);
    this.formGet.emit(this.form);

    this._markFormPristine();
    this._setupListeners();
  }

  private _markFormPristine(): void {
    if (!this.form) return;

    this.form.valueChanges
      .pipe(
        debounceTime(0),
        take(1),
        tap(() => this._formGeneratorService.markFormPristine(this.form!))
      )
      .subscribe();
  }

  private _setupListeners(): void {
    if (!this.form) return;

    let markForCheck = false;

    const conditions$ = this._formConditionsService.formConditionsEvent$(
      this.form,
      this.configGet
    );

    const valueChanges$ = this.form.valueChanges.pipe(
      debounceTime(0),
      tap((x) => {
        this._onChange(x);

        if (!this._useControlValueAccessor) {
          this._updateFormErrors();
        }

        if (!markForCheck) {
          this._cd.detectChanges();
          markForCheck = true;
        }
      })
    );

    merge(valueChanges$, conditions$)
      .pipe(takeUntil(this._reset$), takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }

  private _clearListeners(): void {
    this._reset$.next();
    this._formGeneratorService.reset$.next();
    this._optionsDataService.cancelAllRequest();
  }

  private _updateFormErrors(): ValidationErrors | null {
    if (!this.form) return null;

    const errors = this._formValidationService.getFormErrors(this.form);
    this.form.setErrors(errors);

    return errors;
  }
}
