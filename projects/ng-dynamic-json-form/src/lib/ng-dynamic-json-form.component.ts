import { CommonModule, isPlatformServer } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  Type,
} from '@angular/core';
import {
  FormArray,
  ReactiveFormsModule,
  UntypedFormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Subject, merge, takeUntil } from 'rxjs';
import { NgDynamicJsonFormCustomComponent } from './components/custom-component-base/custom-component-base.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { FormControlComponent } from './components/form-control/form-control.component';
import { GridItemWrapperComponent } from './components/grid-item-wrapper/grid-item-wrapper.component';
import { UI_BASIC_COMPONENTS } from './constants/ui-basic-components.constant';
import { FormControlConfig, UiComponents } from './models';
import { ErrorMessageService } from './services';
import { FormConfigInitService } from './services/form-config-init.service';
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
  ],
  providers: [
    FormConfigInitService,
    FormGeneratorService,
    FormValidatorService,
    FormStatusService,
    GridLayoutService,
    ErrorMessageService,
  ],
})
export class NgDynamicJsonFormComponent {
  @Input() jsonData: FormControlConfig[] | string = [];

  /**User defined custom valiators
   *
   * The `key` will be use to match with `value` of validator named "custom":
   * @example
   * {
   *  //...
   *  "validators": [
   *    { "name": "custom", "value": "..." }
   *  ]
   * }
   */
  @Input() customValidators: { [key: string]: ValidatorFn } = {};

  /**User defined custom components
   * The `key` will be use to match with `customComponent`:
   * @example
   * {
   *  //...
   *  "customComponent": "..."
   * }
   */
  @Input() customComponents: {
    [key: string]: Type<NgDynamicJsonFormCustomComponent>;
  } = {};

  /**Form control components built with other libraries */
  @Input() uiComponents?: UiComponents;

  @Output() formGet = new EventEmitter();

  form?: UntypedFormGroup;
  basicUIComponents = UI_BASIC_COMPONENTS;

  config: FormControlConfig[] = [];
  private _reset$ = new Subject();
  private _onDestroy$ = new Subject();

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private _el: ElementRef,
    private _renderer2: Renderer2,
    private _formConfigInitService: FormConfigInitService,
    private _formGeneratorService: FormGeneratorService,
    private _formStatusService: FormStatusService,
    private _formValidatorService: FormValidatorService
  ) {}

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (isPlatformServer(this._platformId)) {
      return;
    }

    const { jsonData, uiComponents } = simpleChanges;

    if (jsonData) {
      this._buildForm();
    }

    if (uiComponents) {
      this._setHostUiClass();
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

    if (!this.uiComponents) {
      this._renderer2.addClass(hostEl, 'ui-basic');
    } else {
      this._renderer2.removeClass(hostEl, 'ui-basic');
    }
  }

  private get _jsonDataValid(): boolean {
    if (!this.jsonData) {
      return false;
    }

    if (typeof this.jsonData === 'string') {
      try {
        JSON.parse(this.jsonData);
      } catch (e) {
        return false;
      }
    }

    if (Array.isArray(this.jsonData)) {
      return !!this.jsonData.length;
    }

    return true;
  }

  private _buildForm(): void {
    if (!this._jsonDataValid) return;

    this.config = Array.isArray(this.jsonData)
      ? JSON.parse(JSON.stringify(this.jsonData))
      : JSON.parse(this.jsonData);

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

  addFormGroup(
    formArray: FormArray,
    template: FormControlConfig[],
    index?: number
  ): void {
    const formGroup = this._formGeneratorService.generateFormGroup(template);
    if (!index) formArray.push(formGroup);
    else formArray.insert(index, formGroup);
  }

  removeFormGroup(formArray: FormArray, index?: number): void {
    formArray.removeAt(index ?? formArray.length - 1);
  }
}
