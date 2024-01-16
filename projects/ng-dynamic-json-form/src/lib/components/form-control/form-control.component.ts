import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  HostBinding,
  Input,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
  forwardRef,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  UntypedFormGroup,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { EMPTY, Subject, finalize, takeUntil, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UI_BASIC_COMPONENTS } from '../../../ui-basic/ui-basic-components.constant';
import { UiBasicInputComponent } from '../../../ui-basic/ui-basic-input/ui-basic-input.component';
import { ControlLayoutDirective } from '../../directives';
import { FormControlConfig, OptionItem } from '../../models';
import { UiComponents } from '../../models/ui-components.type';
import {
  LayoutComponents,
  LayoutTemplates,
} from '../../ng-dynamic-json-form.config';
import { FormValidationService, OptionsDataService } from '../../services';
import { ConfigMappingService } from '../../services/config-mapping.service';
import { CustomControlComponent } from '../custom-control/custom-control.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'form-control',
  standalone: true,
  imports: [CommonModule, ErrorMessageComponent, ControlLayoutDirective],
  templateUrl: './form-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormControlComponent),
      multi: true,
    },
  ],
})
export class FormControlComponent implements ControlValueAccessor, Validator {
  private readonly _cd = inject(ChangeDetectorRef);
  private readonly _el = inject(ElementRef);
  private readonly _configMappingService = inject(ConfigMappingService);
  private readonly _optionsDataService = inject(OptionsDataService);
  private readonly _formValidationService = inject(FormValidationService);

  private _controlComponentRef?: CustomControlComponent;
  private _patchingValue = false;

  /**To prevent data keep concating */
  private _existingOptions: OptionItem[] = [];

  private _onChange = (_: any) => {};
  private _onTouched = () => {};

  private readonly _onDestroy$ = new Subject<void>();
  private readonly _pendingValue$ = new BehaviorSubject<any>('');

  @Input() form?: UntypedFormGroup;
  @Input() control?: AbstractControl;
  @Input() data?: FormControlConfig;
  @Input() uiComponents?: UiComponents;
  @Input() customComponent?: Type<CustomControlComponent>;
  @Input() layoutComponents?: LayoutComponents;
  @Input() layoutTemplates?: LayoutTemplates;
  @Input() inputTemplates?: { [key: string]: TemplateRef<any> };

  @ViewChild('inputComponentAnchor', { read: ViewContainerRef })
  inputComponentAnchor!: ViewContainerRef;

  @ViewChild('errorComponentAnchor', { read: ViewContainerRef })
  errorComponentAnchor!: ViewContainerRef;

  @HostBinding('class.form-control') hostClass = true;

  loading = false;
  errorMessages: string[] = [];

  writeValue(obj: any): void {
    this._pendingValue$.next(obj);
    this._patchingValue = true;
    this._controlComponentRef?.writeValue(obj);
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._controlComponentRef?.setDisabledState(isDisabled);
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this._controlComponentRef?.validate(control) ?? null;
  }

  ngAfterViewInit(): void {
    this._getErrorMessages();
    this._fetchOptions();
    this._injectInputComponent();
    this._injectErrorMessageComponent();
    this._cd.detectChanges();
  }

  private _injectComponent<T>(
    vcr?: ViewContainerRef,
    component?: Type<T>
  ): ComponentRef<T> | null {
    if (!vcr || !component) return null;

    vcr.clear();
    const componentRef = vcr.createComponent(component);
    return componentRef;
  }

  private _injectInputComponent(): void {
    const inputComponent =
      this.customComponent ||
      this.uiComponents?.[this._inputType] ||
      UI_BASIC_COMPONENTS[this._inputType] ||
      UiBasicInputComponent;

    const componentRef = this._injectComponent(
      this.inputComponentAnchor,
      inputComponent
    );

    if (!componentRef) return;

    this._controlComponentRef = componentRef.instance;

    componentRef.instance.data = this._configMappingService.mapCorrectConfig(
      this.data
    );

    componentRef.instance['_internal_init'](this.control);
    componentRef.instance.registerOnChange(this._onChange);
    componentRef.instance.registerOnTouched(this._onTouched);
    componentRef.instance.writeValue(this._pendingValue$.value);
  }

  private _injectErrorMessageComponent(): void {
    if (!this.layoutComponents?.errorMessage) return;

    const componentRef = this._injectComponent(
      this.errorComponentAnchor,
      this.layoutComponents.errorMessage
    );

    if (!componentRef) return;

    componentRef.instance.control = this.control;
    componentRef.instance.validators = this.data?.validators;
  }

  private _fetchOptions(): void {
    if (!this.data || !this.data.options) {
      return;
    }

    this._existingOptions = this.data.options.data || [];
    const service = this._optionsDataService;
    const trigger = this.data.options.trigger;

    const optionsOnTriggers$ = () => {
      if (!trigger || !trigger.action || !this.form) return EMPTY;

      return trigger.action === 'FILTER'
        ? service.filterOptionsOnTrigger$(this.form, trigger)
        : service.requestOptionsOnTrigger$(this.form, trigger);
    };

    const event$ = !trigger
      ? service.getOptions$(this.data.options).pipe(
          tap((x) => this._setOptionsData(x)),
          finalize(() => (this.loading = false))
        )
      : optionsOnTriggers$().pipe(
          tap((x) => {
            this._setOptionsData(x);

            // For patchValue() or setValue() of this control to work properly
            // Otherwise the value will get overwritten
            if (!this._patchingValue) {
              const clearData = !x.length || x.length > 1;
              const autoValue = clearData ? '' : x[0].value;
              this._controlComponentRef?.writeValue(autoValue);
            }

            this._patchingValue = false;
          }),
          finalize(() => (this.loading = false))
        );

    this.loading = true;
    event$.subscribe();
  }

  private _setOptionsData(options: OptionItem[]): void {
    if (!this.data || !this.data.options) {
      return;
    }

    const existingOptions = this._existingOptions;
    const { sourceAppendPosition } = this.data.options;

    const appendBefore = sourceAppendPosition === 'before';
    const dataGet = appendBefore
      ? options.concat(existingOptions)
      : existingOptions.concat(options);

    this.data.options.data = dataGet;
    this.loading = false;
    this._cd.detectChanges();
  }

  private _getErrorMessages(): void {
    this._formValidationService
      .getErrorMessages$(this.control, this.data?.validators)
      .pipe(
        tap((x) => (this.errorMessages = x)),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }

  private get _inputType(): string {
    const defaultInput = !this.data?.inputMask ? 'text' : 'textMask';

    // Fallback to text input if `type` is not specified.
    if (!this.data?.type) return defaultInput;

    switch (this.data?.type) {
      case 'number':
      case 'text':
        return defaultInput;

      default:
        return this.data.type;
    }
  }
}
