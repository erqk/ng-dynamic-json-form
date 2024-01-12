import { CommonModule, isPlatformServer } from '@angular/common';
import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  PLATFORM_ID,
  Renderer2,
  TemplateRef,
  inject,
} from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormGroup,
  ValidatorFn,
} from '@angular/forms';
import Ajv from 'ajv';
import { Subject, merge, takeUntil } from 'rxjs';
import { UI_BASIC_COMPONENTS } from '../ui-basic/ui-basic-components.constant';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { FormArrayItemHeaderComponent } from './components/form-array-item-header/form-array-item-header.component';
import { FormControlComponent } from './components/form-control/form-control.component';
import * as schema from './config-schema.json';
import { ControlLayoutDirective, HostIdDirective } from './directives';
import { FormControlConfig, UiComponents } from './models';
import { CustomComponents } from './models/custom-components.type';
import {
  LayoutComponents,
  LayoutTemplates,
  NG_DYNAMIC_JSON_FORM_CONFIG,
} from './ng-dynamic-json-form.config';
import { FormArrayHeaderEventPipe } from './pipes/form-array-header-event.pipe';
import { GenerateFormPipe } from './pipes/generate-form.pipe';
import {
  ControlValueService,
  FormGeneratorService,
  FormStatusService,
  OptionsDataService,
} from './services';
import { ConfigMappingService } from './services/config-mapping.service';
import { FormValidationService } from './services/form-validation.service';
import { NgxMaskConfigInitService } from './services/ngx-mask-config-init.service';

@Component({
  selector: 'ng-dynamic-json-form',
  templateUrl: './ng-dynamic-json-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlComponent,
    ErrorMessageComponent,
    GenerateFormPipe,
    FormArrayHeaderEventPipe,
    HostIdDirective,
    ControlLayoutDirective,
    FormArrayItemHeaderComponent,
  ],
  providers: [
    ConfigMappingService,
    ControlValueService,
    FormGeneratorService,
    FormStatusService,
    FormValidationService,
    NgxMaskConfigInitService,
    OptionsDataService,
  ],
})
export class NgDynamicJsonFormComponent {
  private _providerConfig = inject(NG_DYNAMIC_JSON_FORM_CONFIG, {
    optional: true,
  });
  private _platformId = inject(PLATFORM_ID);
  private _el = inject(ElementRef);
  private _renderer2 = inject(Renderer2);
  private _formGeneratorService = inject(FormGeneratorService);
  private _formStatusService = inject(FormStatusService);
  private _formValidationService = inject(FormValidationService);
  private _optionsDataService = inject(OptionsDataService);
  private _reset$ = new Subject<void>();
  private _onDestroy$ = new Subject<void>();

  @ContentChild('formArrayGroupHeader')
  formArrayGroupHeaderRef?: TemplateRef<any>;

  @Input() configs: FormControlConfig[] | string = [];

  /**
   * @description
   * User defined custom valiators. The `value` is the `key` of target ValidatorFn.
   *
   * @example
   * JSON config:
   * {  ...,
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
   * {  ...,
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
  @Input() layoutTemplates?: LayoutTemplates =
    this._providerConfig?.layoutTemplates;

  /**
   * Custom templates for input, suitable for input using only `FormControl`.
   * To use `FormGroup` or `FormArray`, use `CustomControlComponent` instead.
   */
  @Input() inputTemplates?: { [key: string]: TemplateRef<any> };

  @Output() formGet = new EventEmitter();

  config: FormControlConfig[] = [];
  configValidateErrors: string[] = [];

  form?: UntypedFormGroup;
  uiComponentsGet: UiComponents = UI_BASIC_COMPONENTS;

  ngOnChanges(): void {
    if (isPlatformServer(this._platformId)) {
      return;
    }

    this.uiComponentsGet = {
      ...UI_BASIC_COMPONENTS,
      ...this.uiComponents,
    };

    this._setHostUiClass();
    this._buildForm();
  }

  ngOnInit(): void {
    if (isPlatformServer(this._platformId)) {
      return;
    }

    this._initHostClass();
    this._setHostUiClass();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
    this._reset$.next();
    this._reset$.complete();
    this._optionsDataService.cancelAllRequest();
  }

  private _initHostClass(): void {
    const hostEl = this._el.nativeElement as HTMLElement;
    const dynamicFormsFound = document.querySelectorAll('ng-dynamic-json-form');
    const hostIndex = Array.from(dynamicFormsFound).indexOf(hostEl);

    this._renderer2.addClass(hostEl, 'ng-dynamic-json-form');
    this._renderer2.addClass(hostEl, `index-${hostIndex}`);
    this._formStatusService.hostIndex = hostIndex;
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
      ? { config: this.configs }
      : this.configs;

    try {
      const ajv = new Ajv({ allErrors: true });
      const validate = ajv.compile(schema);
      const parsed = JSON.parse(JSON.stringify(data));
      const valid = validate(parsed);

      if (!valid) {
        this.configValidateErrors = [
          ...(validate.errors ?? []).map((x) => JSON.stringify(x)),
        ];
        return null;
      }

      return (parsed as any)['config'] ?? null;
    } catch (err: any) {
      // https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify
      this.configValidateErrors = [
        JSON.stringify(err, Object.getOwnPropertyNames(err)),
      ];
      return null;
    }
  }

  private _buildForm(): void {
    this.config = this._validateAndGetConfig() ?? [];
    if (!this.config || !this.config.length) return;

    this.configValidateErrors = [];
    this._formValidationService.customValidators = this.customValidators;
    this.form = this._formGeneratorService.generateFormGroup(this.config);
    this.formGet.emit(this.form);

    this._reset$.next();
    this._optionsDataService.cancelAllRequest();
    merge(
      this._formValidationService.formErrorEvent$(this.form),
      this._formStatusService.formControlConditonsEvent$(this.form, this.config)
    )
      .pipe(takeUntil(merge(this._reset$, this._onDestroy$)))
      .subscribe();
  }
}
