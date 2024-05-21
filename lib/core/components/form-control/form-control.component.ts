import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  DestroyRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
  forwardRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import {
  EMPTY,
  Observable,
  combineLatest,
  delay,
  finalize,
  startWith,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { FormControlConfig, OptionItem } from '../../models';
import { OptionsDataService } from '../../services';
import { ConfigMappingService } from '../../services/config-mapping.service';
import { GlobalVariableService } from '../../services/global-variable.service';
import { UI_BASIC_COMPONENTS } from '../../ui-basic/ui-basic-components.constant';
import { UiBasicInputComponent } from '../../ui-basic/ui-basic-input/ui-basic-input.component';
import { ContentWrapperComponent } from '../content-wrapper/content-wrapper.component';
import { CustomControlComponent } from '../custom-control/custom-control.component';

@Component({
  selector: 'form-control',
  standalone: true,
  imports: [CommonModule, ContentWrapperComponent],
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
  styles: [':host { display: block }'],
})
export class FormControlComponent
  implements OnInit, AfterViewInit, ControlValueAccessor, Validator
{
  private _cd = inject(ChangeDetectorRef);
  private _destroyRef = inject(DestroyRef);
  private _configMappingService = inject(ConfigMappingService);
  private _globalVariableService = inject(GlobalVariableService);
  private _optionsDataService = inject(OptionsDataService);

  private _uiComponents = this._globalVariableService.uiComponents;
  private _hideErrorMessage$ = this._globalVariableService.hideErrorMessage$;

  private _controlComponentRef?: CustomControlComponent;
  private _patchingValue = false;
  private _pendingValue: any = null;

  /**To prevent data keep concating */
  private _existingOptions: OptionItem[] = [];

  private _onChange = (_: any) => {};
  private _onTouched = () => {};

  @Input() data?: FormControlConfig;
  @Input() control?: AbstractControl;
  @Input() customComponent?: Type<CustomControlComponent>;

  @ViewChild('inputComponentAnchor', { read: ViewContainerRef })
  inputComponentAnchor!: ViewContainerRef;

  @HostBinding('class') hostClass = 'form-control';

  @HostListener('focusout', ['$event'])
  onFocusOut(): void {
    if (this.data?.type === 'select') {
      // For select component, trigger when it's blurred.
      // It's implemented on the corresponding component.
      return;
    }

    this._onTouched();
  }

  layoutComponents = this._globalVariableService.layoutComponents;
  layoutTemplates = this._globalVariableService.layoutTemplates;
  customTemplates = this._globalVariableService.customTemplates;

  loading = false;
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

  ngOnInit(): void {
    this.useCustomLoading =
      !!this.layoutComponents?.loading || !!this.layoutTemplates?.loading;
  }

  ngAfterViewInit(): void {
    this._injectInputComponent();
    this._fetchOptions();
    this._errorMessageEvent();
  }

  get showErrors(): boolean {
    const controlTouched = this.control?.touched ?? false;
    const controlDirty = this.control?.dirty ?? false;
    const hasErrors = !!this.control?.errors;

    if (this._hideErrorMessage$) {
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
    if (this.customTemplates?.[this.data?.formControlName ?? '']) {
      return;
    }

    const inputComponent =
      this.customComponent ||
      this._uiComponents?.[this._inputType] ||
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

    componentRef.instance.writeValue(this._pendingValue);

    if (!this.data?.readonly) {
      componentRef.instance.registerOnChange(this._onChange);
      componentRef.instance.registerOnTouched(this._onTouched);
    }

    this._controlComponentRef = componentRef.instance;
  }

  private _fetchOptions(): void {
    if (!this.data || !this.data.options) return;
    const { sourceList, trigger, autoSelectFirst, data } = this.data.options;

    if (!sourceList?.length && !trigger) {
      if (autoSelectFirst) {
        this.control?.setValue(data?.[0]?.value ?? null);
      }

      return;
    }

    this._existingOptions = this.data.options.data || [];

    const event$ = !trigger
      ? this._optionsDataService.getOptions$(this.data.options)
      : this._optionsOnTrigger$;

    this.loading = true;

    event$
      .pipe(
        tap((x) => this._setOptionsData(x)),
        finalize(() => (this.loading = false))
      )
      .subscribe();
  }

  private _errorMessageEvent(): void {
    if (!this._controlComponentRef || !this.control) return;

    const control = this.control;
    const controlComponent = this._controlComponentRef;

    // Needs to add delay for `controlComponent.setErrors()` to work properly.
    // Guess because it is called at the same time with the initialization of the control.
    // Hence after the control is initialized, the status will be reset to VALID.
    combineLatest([
      this._hideErrorMessage$,
      control.statusChanges.pipe(startWith(control.status)),
    ])
      .pipe(
        delay(0),
        tap(() => {
          const hideErrors = this._hideErrorMessage$.value;
          const errors =
            hideErrors || (!control.errors && !controlComponent.control?.errors)
              ? null
              : control.errors;

          if (hideErrors === false) {
            control.markAsTouched();
            control.markAsDirty();
            controlComponent.control?.markAsTouched();
            controlComponent.control?.markAsDirty();
            controlComponent.markAsTouched();
            controlComponent.markAsDirty();
          }

          controlComponent.control?.setErrors(errors);
          controlComponent.setErrors(errors);
          this._cd.markForCheck();
        }),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }

  private get _optionsOnTrigger$(): Observable<OptionItem[]> {
    if (!this.data?.options) return EMPTY;

    const trigger = this.data.options.trigger;
    if (!trigger || !trigger.action) return EMPTY;

    const source$ = () => {
      switch (trigger.action) {
        case 'FILTER':
          return this._optionsDataService.filterOptionsOnTrigger$(trigger);

        case 'REQUEST':
          return this._optionsDataService.requestOptionsOnTrigger$(trigger);
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