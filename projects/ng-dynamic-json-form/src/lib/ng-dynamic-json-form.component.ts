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
  SimpleChanges,
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
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { FormControlComponent } from './components/form-control/form-control.component';
import { GridItemWrapperComponent } from './components/grid-item-wrapper/grid-item-wrapper.component';
import * as schema from './config-schema.json';
import { UI_BASIC_COMPONENTS } from './constants/ui-basic-components.constant';
import { FormControlConfig, UiComponents } from './models';
import { CustomComponents } from './models/custom-components.type';
import { FormArrayHeaderEventPipe } from './pipes/form-array-header-event.pipe';
import { GenerateFormPipe } from './pipes/generate-form.pipe';
import { ErrorMessageService } from './services';
import { FormConfigInitService } from './services/form-config-init.service';
import { FormDataTransformService } from './services/form-data-transform.service';
import { FormGeneratorService } from './services/form-generator.service';
import { FormStatusService } from './services/form-status.service';
import { FormValidatorService } from './services/form-validator.service';
import { GridLayoutService } from './services/grid-layout.service';

@Component({
  selector: 'ng-dynamic-json-form',
  templateUrl: './ng-dynamic-json-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlComponent,
    GridItemWrapperComponent,
    ErrorMessageComponent,
    GenerateFormPipe,
    FormArrayHeaderEventPipe,
  ],
  providers: [
    FormConfigInitService,
    FormDataTransformService,
    FormGeneratorService,
    FormValidatorService,
    FormStatusService,
    GridLayoutService,
    ErrorMessageService,
  ],
})
export class NgDynamicJsonFormComponent {
  private _platformId = inject(PLATFORM_ID);
  private _el = inject(ElementRef);
  private _renderer2 = inject(Renderer2);
  private _formConfigInitService = inject(FormConfigInitService);
  private _formGeneratorService = inject(FormGeneratorService);
  private _formStatusService = inject(FormStatusService);
  private _formValidatorService = inject(FormValidatorService);
  private _reset$ = new Subject();
  private _onDestroy$ = new Subject();

  @ContentChild('formArrayGroupHeader')
  formArrayGroupHeaderRef?: TemplateRef<any>;

  @Input() configs: FormControlConfig[] | string = [];

  /**User defined custom valiators. The `value` is the `key` of target ValidatorFn.
   * @example
   * JSON config:
   * {  ...,
   *    "validators": [
   *      { "name": "custom",
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
  @Input() customValidators: { [key: string]: ValidatorFn } = {};

  /**User defined custom components. The `value` is the `key` of target component.
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
  @Input() customComponents: CustomComponents = {};

  /**Form control components built with other libraries */
  @Input() uiComponents?: CustomComponents;

  @Output() formGet = new EventEmitter();

  config: FormControlConfig[] = [];
  configValidateErrors: string[] = [];

  form?: UntypedFormGroup;
  uiComponentsGet: UiComponents = UI_BASIC_COMPONENTS;

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (isPlatformServer(this._platformId)) {
      return;
    }

    const { configs, uiComponents } = simpleChanges;

    if (configs && configs.currentValue) {
      this._buildForm();
    }

    if (uiComponents) {
      this._setHostUiClass();
      this.uiComponentsGet = {
        ...UI_BASIC_COMPONENTS,
        ...this.uiComponents,
      };
    }
  }

  ngOnInit(): void {
    if (isPlatformServer(this._platformId)) {
      return;
    }

    this._initHostClass();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next(null);
    this._onDestroy$.complete();
    this._reset$.complete();
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

    !this.uiComponents
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
    this._formConfigInitService.init(this.config);
    this._formValidatorService.customValidators = this.customValidators;
    this.form = this._formGeneratorService.generateFormGroup(this.config);
    this.formGet.emit(this.form);

    this._reset$.next(null);
    merge(
      this._formStatusService.formErrorEvent$(this.form),
      this._formStatusService.formControlConditonsEvent$(this.form, this.config)
    )
      .pipe(takeUntil(merge(this._reset$, this._onDestroy$)))
      .subscribe();
  }
}
