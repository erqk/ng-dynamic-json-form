import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  DestroyRef,
  HostListener,
  Input,
  OnDestroy,
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
import { combineLatest, debounceTime, finalize, startWith, tap } from 'rxjs';
import { FormControlConfig, FormControlType, OptionItem } from '../../models';
import {
  FormReadyStateService,
  GlobalVariableService,
  OptionsDataService,
} from '../../services';
import { UI_BASIC_COMPONENTS } from '../../ui-basic/ui-basic-components.constant';
import { UiBasicInputComponent } from '../../ui-basic/ui-basic-input/ui-basic-input.component';
import { CustomControlComponent } from '../custom-control/custom-control.component';

@Component({
  selector: 'form-control',
  standalone: true,
  imports: [CommonModule],
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
  host: {
    class: 'form-control',
  },
})
export class FormControlComponent
  implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor, Validator
{
  private _cd = inject(ChangeDetectorRef);
  private _destroyRef = inject(DestroyRef);
  private _globalVariableService = inject(GlobalVariableService);
  private _formReadyStateService = inject(FormReadyStateService);
  private _optionsDataService = inject(OptionsDataService);

  private _uiComponents = this._globalVariableService.uiComponents;

  private _controlComponent?: CustomControlComponent;
  private _pendingValue: any = null;

  private _onChange = (_: any) => {};
  private _onTouched = () => {};

  @Input() data?: FormControlConfig;
  @Input() control?: AbstractControl;
  @Input() customComponent?: Type<CustomControlComponent>;

  @ViewChild('inputComponentAnchor', { read: ViewContainerRef })
  inputComponentAnchor!: ViewContainerRef;

  @HostListener('focusout', ['$event'])
  onFocusOut(): void {
    if (this.data?.type === 'select') {
      // For select component, trigger when it's blurred.
      // It's implemented on the corresponding component.
      return;
    }

    this._onTouched();
  }

  customTemplates = this._globalVariableService.customTemplates;
  loadingComponent = this._globalVariableService.loadingComponent;
  loadingTemplate = this._globalVariableService.loadingTemplate;

  loading = false;
  useCustomLoading = false;
  hostForm = this._globalVariableService.rootForm;
  hideErrorMessage$ = this._globalVariableService.hideErrorMessage$;

  writeValue(obj: any): void {
    this._pendingValue = obj;
    this._controlComponent?.writeValue(obj);
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._controlComponent?.setDisabledState(isDisabled);
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this._controlComponent?.validate(control) ?? null;
  }

  ngOnInit(): void {
    this.useCustomLoading =
      Boolean(this.loadingComponent) || Boolean(this.loadingTemplate);
  }

  ngAfterViewInit(): void {
    this._injectInputComponent();
    this._fetchOptions();
    this._errorMessageEvent();
    this._cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.control = undefined;
    this.data = undefined;
  }

  updateControlStatus(
    status: 'dirty' | 'pristine' | 'touched' | 'untouched',
    updateSelf = false,
  ): void {
    const control = this.control;
    const controlComponent = this._controlComponent;

    const markAsDirty = () => {
      controlComponent?.control?.markAsDirty();
      controlComponent?.markAsDirty();

      if (updateSelf) {
        control?.markAsDirty();
      }
    };

    const markAsPristine = () => {
      controlComponent?.control?.markAsPristine();
      controlComponent?.markAsPristine();

      if (updateSelf) {
        control?.markAsPristine();
      }
    };

    const markAsTouched = () => {
      controlComponent?.control?.markAsTouched();
      controlComponent?.markAsTouched();

      if (updateSelf) {
        control?.markAsTouched();
      }
    };

    const markAsUntouched = () => {
      controlComponent?.control?.markAsUntouched();
      controlComponent?.markAsUntouched();

      if (updateSelf) {
        control?.markAsUntouched();
      }
    };

    switch (status) {
      case 'dirty':
        markAsDirty();
        break;

      case 'pristine':
        markAsPristine();
        break;

      case 'touched':
        markAsTouched();
        break;

      case 'untouched':
        markAsUntouched();
        break;
    }
  }

  get showErrors(): boolean {
    const controlTouched = this.control?.touched ?? false;
    const controlDirty = this.control?.dirty ?? false;
    const hasErrors = !!this.control?.errors;

    if (this.hideErrorMessage$) {
      return false;
    }

    return (controlDirty || controlTouched) && hasErrors;
  }

  private _injectComponent<T>(
    vcr?: ViewContainerRef,
    component?: Type<T>,
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
      inputComponent,
    );

    if (!componentRef) return;

    componentRef.instance.data = this.data;
    componentRef.instance.hostForm = this._globalVariableService.rootForm;
    componentRef.instance.writeValue(this._pendingValue);
    componentRef.instance.registerOnChange(this._onChange);
    componentRef.instance.registerOnTouched(this._onTouched);

    this._controlComponent = componentRef.instance;
  }

  private _fetchOptions(): void {
    if (!this.data || !this.data.options) {
      this._pendingValue = null;
      return;
    }

    const {
      src,
      srcAppendPosition,
      autoSelectFirst,
      data: staticOptions = [],
    } = this.data.options;

    const updateControlValue = (value: any) => {
      this.control?.setValue(value);
      this._controlComponent?.writeValue(value);
    };

    const selectFirst = (options: OptionItem[]) => {
      if (!autoSelectFirst || !options.length) return;
      updateControlValue(options[0].value);
    };

    const setLoading = (val: boolean) => {
      this.loading = val;
      this._formReadyStateService.optionsLoading(val);
    };

    if (!src) {
      selectFirst(staticOptions);
      return;
    }

    const source$ =
      typeof src === 'string'
        ? this._globalVariableService.optionsSources?.[src]
        : this._optionsDataService.getOptions$(src, () => {
            setLoading(true);
            updateControlValue(null);
          });

    setLoading(true);

    source$
      ?.pipe(
        tap((x) => {
          const options =
            srcAppendPosition === 'before'
              ? x.concat(staticOptions)
              : staticOptions.concat(x);

          if (this._pendingValue) {
            updateControlValue(this._pendingValue);
            this._pendingValue = null;
          } else {
            selectFirst(options);
          }

          setLoading(false);
          this._controlComponent?.onOptionsGet(options);
        }),
        finalize(() => setLoading(false)),
      )
      .subscribe();
  }

  private _errorMessageEvent(): void {
    if (!this.control) return;

    const control = this.control;
    const controlComponent = this._controlComponent;

    combineLatest([
      this.hideErrorMessage$,
      control.statusChanges.pipe(startWith(control.status)),
    ])
      .pipe(
        debounceTime(0),
        tap(() => {
          const hideErrors = this.hideErrorMessage$.value;
          const controlErrors = control.errors;
          const componentErrors = controlComponent?.control?.errors;
          const errors =
            hideErrors || (!controlErrors && !componentErrors)
              ? null
              : control.errors;

          if (controlComponent) {
            controlComponent.control?.setErrors(errors);
            controlComponent.setErrors(errors);
            controlComponent.hideErrorMessage = hideErrors;
          }

          if (hideErrors === false) {
            this.updateControlStatus('dirty', true);
            this.updateControlStatus('touched', true);
          }
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }

  private get _inputType(): FormControlType {
    if (this.data?.inputMask) {
      return 'textMask';
    }

    // Fallback to text input if `type` is not specified.
    if (!this.data?.type) {
      return 'text';
    }

    switch (this.data.type) {
      case 'number':
      case 'text':
        return 'text';

      default:
        return this.data.type;
    }
  }
}
