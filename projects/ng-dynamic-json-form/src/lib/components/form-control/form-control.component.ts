import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  DestroyRef,
  HostBinding,
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
import { EMPTY, Observable, filter, finalize, tap } from 'rxjs';
import { UI_BASIC_COMPONENTS } from '../../../ui-basic/ui-basic-components.constant';
import { UiBasicInputComponent } from '../../../ui-basic/ui-basic-input/ui-basic-input.component';
import { FormControlConfig, OptionItem } from '../../models';
import { OptionsDataService } from '../../services';
import { ConfigMappingService } from '../../services/config-mapping.service';
import { GlobalVariableService } from '../../services/global-variable.service';
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

  layoutComponents = this._globalVariableService.globalLayoutComponents;
  layoutTemplates = this._globalVariableService.globalLayoutTemplates;
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
    this._hideErrorMessageEvent();
    this._cd.detectChanges();
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

    componentRef.instance['_internal_init'](this.control);
    componentRef.instance.writeValue(this._pendingValue);

    if (!this.data?.readonly) {
      componentRef.instance.registerOnChange(this._onChange);
      componentRef.instance.registerOnTouched(this._onTouched);

      this._onChange(this._pendingValue);
    }

    this._controlComponentRef = componentRef.instance;

    // Fix for UI not reflected after props binding (Don't know the cause yet)
    window.requestAnimationFrame(() => {
      this._controlComponentRef?.control?.updateValueAndValidity();
    });
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

  private _hideErrorMessageEvent(): void {
    if (this._controlComponentRef) {
      this._controlComponentRef!['_internal_hideErrors$'] =
        this._hideErrorMessage$;
    }

    this._hideErrorMessage$
      .pipe(
        filter((x) => x === false),
        tap(() => {
          this.control?.markAsTouched();
          this.control?.markAsDirty();
          this._controlComponentRef?.control?.markAsTouched();
          this._controlComponentRef?.control?.markAsDirty();
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
