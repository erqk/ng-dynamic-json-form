import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  HostBinding,
  Input,
  SimpleChanges,
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
import { EMPTY, Observable, catchError, finalize, of, tap } from 'rxjs';
import { UI_BASIC_COMPONENTS } from '../../../ui-basic/ui-basic-components.constant';
import { UiBasicInputComponent } from '../../../ui-basic/ui-basic-input/ui-basic-input.component';
import { ControlLayoutDirective } from '../../directives';
import { FormControlConfig, OptionItem } from '../../models';
import { UiComponents } from '../../models/ui-components.type';
import {
  LayoutComponents,
  LayoutTemplates,
} from '../../ng-dynamic-json-form.config';
import { OptionsDataService } from '../../services';
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
  private _cd = inject(ChangeDetectorRef);
  private _configMappingService = inject(ConfigMappingService);
  private _optionsDataService = inject(OptionsDataService);

  private _controlComponentRef?: CustomControlComponent;
  private _patchingValue = false;
  private _pendingValue: any = null;
  private _viewInitialized = false;

  /**To prevent data keep concating */
  private _existingOptions: OptionItem[] = [];

  private _onChange = (_: any) => {};
  private _onTouched = () => {};

  @Input() form?: UntypedFormGroup;
  @Input() control?: AbstractControl;
  @Input() data?: FormControlConfig;
  @Input() uiComponents?: UiComponents;
  @Input() customComponent?: Type<CustomControlComponent>;
  @Input() layoutComponents?: LayoutComponents;
  @Input() layoutTemplates?: LayoutTemplates;
  @Input() inputTemplates?: { [key: string]: TemplateRef<any> };
  @Input() hideErrorMessage?: boolean;

  @ViewChild('inputComponentAnchor', { read: ViewContainerRef })
  inputComponentAnchor!: ViewContainerRef;

  @ViewChild('errorComponentAnchor', { read: ViewContainerRef })
  errorComponentAnchor!: ViewContainerRef;

  @HostBinding('class.form-control') hostClass = true;

  loading = false;
  errorMessages: string[] = [];
  useCustomLoading = false;

  writeValue(obj: any): void {
    this._pendingValue = obj;
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

  ngOnChanges(simpleChanges: SimpleChanges): void {
    const { hideErrorMessage } = simpleChanges;

    if (hideErrorMessage && this._viewInitialized) {
      this._controlComponentRef?.['_internal_hideErrors$'].next(
        this.hideErrorMessage ?? false
      );

      if (!this.hideErrorMessage) {
        this.control?.markAsTouched();
        this.control?.markAsDirty();
        this._controlComponentRef?.control?.markAsTouched();
        this._controlComponentRef?.control?.markAsDirty();
      }
    }
  }

  ngOnInit(): void {
    this._fetchOptions();
    this.useCustomLoading =
      !!this.layoutComponents?.loading || !!this.layoutTemplates?.loading;
  }

  ngAfterViewInit(): void {
    this._injectInputComponent();
    this._injectErrorMessageComponent();
    this._viewInitialized = true;
    this._cd.markForCheck();
    this._cd.detectChanges();
  }

  onErrorMessagesGet(e: string[]): void {
    this.errorMessages = e;

    if (this._controlComponentRef) {
      this._controlComponentRef.errorMessages = e;
    }
  }

  get showErrors(): boolean {
    const controlTouched = this.control?.touched ?? false;
    const controlDirty = this.control?.dirty ?? false;
    const hasErrors = !!this.control?.errors;

    if (this.hideErrorMessage) {
      return false;
    }

    return (controlDirty || controlTouched) && hasErrors;
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

    componentRef.instance.data = this._configMappingService.mapCorrectConfig(
      this.data
    );

    componentRef.instance['_internal_init'](this.control);
    componentRef.instance.writeValue(this._pendingValue);

    this._controlComponentRef = componentRef.instance;

    if (!this.data?.readonly) {
      componentRef.instance.registerOnChange(this._onChange);
      componentRef.instance.registerOnTouched(this._onTouched);

      this._onChange(this._pendingValue);
    }
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
    const trigger = this.data.options.trigger;

    const event$ = !trigger
      ? this._optionsDataService.getOptions$(this.data.options)
      : this._optionsOnTrigger$;

    this.loading = true;

    event$
      .pipe(
        tap((x) => this._setOptionsData(x)),
        catchError(() => {
          this._setOptionsData([]);
          return of(null);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }

  private get _optionsOnTrigger$(): Observable<OptionItem[]> {
    if (!this.data?.options) return EMPTY;

    const trigger = this.data.options.trigger;
    if (!trigger || !trigger.action || !this.form) return EMPTY;

    const source$ = () => {
      switch (trigger.action) {
        case 'FILTER':
          return this._optionsDataService.filterOptionsOnTrigger$(
            this.form!,
            trigger
          );

        case 'REQUEST':
          return this._optionsDataService.requestOptionsOnTrigger$(
            this.form!,
            trigger
          );
      }
    };

    return source$().pipe(
      tap((x) => {
        // Auto choose the first option if the option list contains only one option.
        // Skip this if `_patchingValue` is true, or the value will get overwritten.
        if (!this._patchingValue) {
          const clearData = !x.length || x.length > 1;
          const autoValue = clearData ? '' : x[0].value;
          this._controlComponentRef?.writeValue(autoValue);
        }

        this._patchingValue = false;
      })
    );
  }

  private _setOptionsData(options: OptionItem[]): void {
    if (!this.data || !this.data.options) {
      return;
    }

    const existingOptions = this._existingOptions;
    const { sourceAppendPosition, autoSelectFirst } = this.data.options;

    const appendBefore = sourceAppendPosition === 'before';
    const dataGet = appendBefore
      ? options.concat(existingOptions)
      : existingOptions.concat(options);

    if (autoSelectFirst) {
      this.control?.setValue(dataGet[0]?.value ?? null);
    }

    this._controlComponentRef?.onOptionsGet(dataGet);
    this.loading = false;
    this._cd.markForCheck();
    this._cd.detectChanges();
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
