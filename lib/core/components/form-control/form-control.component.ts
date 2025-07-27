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
import { getControlErrors } from '../../utilities/get-control-errors';
import { CustomControlComponent } from '../custom-control/custom-control.component';

@Component({
    selector: 'form-control',
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
    }
})
export class FormControlComponent
  implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor, Validator
{
  private cd = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private globalVariableService = inject(GlobalVariableService);
  private formReadyStateService = inject(FormReadyStateService);
  private optionsDataService = inject(OptionsDataService);

  private uiComponents = this.globalVariableService.uiComponents;

  private controlComponent?: CustomControlComponent;
  private pendingValue: any = null;

  private onChange = (_: any) => {};
  private onTouched = () => {};

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

    this.onTouched();
  }

  customTemplates = this.globalVariableService.customTemplates;
  loadingComponent = this.globalVariableService.loadingComponent;
  loadingTemplate = this.globalVariableService.loadingTemplate;

  loading = false;
  useCustomLoading = false;
  hostForm = this.globalVariableService.rootForm;
  hideErrorMessage$ = this.globalVariableService.hideErrorMessage$;

  writeValue(obj: any): void {
    this.pendingValue = obj;
    this.controlComponent?.writeValue(obj);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.controlComponent?.setDisabledState(isDisabled);
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.controlComponent?.validate(control) ?? null;
  }

  ngOnInit(): void {
    this.useCustomLoading =
      Boolean(this.loadingComponent) || Boolean(this.loadingTemplate);
  }

  ngAfterViewInit(): void {
    this.injectInputComponent();
    this.fetchOptions();
    this.errorMessageEvent();
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.control = undefined;
    this.data = undefined;
  }

  updateControlStatus(
    status: 'dirty' | 'pristine' | 'touched' | 'untouched',
    updateSelf = false
  ): void {
    const control = this.control;
    const controlComponent = this.controlComponent;

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

  private injectComponent<T>(
    vcr?: ViewContainerRef,
    component?: Type<T>
  ): ComponentRef<T> | null {
    if (!vcr || !component) return null;

    vcr.clear();
    const componentRef = vcr.createComponent(component);
    return componentRef;
  }

  private injectInputComponent(): void {
    if (this.customTemplates?.[this.data?.formControlName ?? '']) {
      return;
    }

    const inputComponent =
      this.customComponent ||
      this.uiComponents?.[this._inputType] ||
      UI_BASIC_COMPONENTS[this._inputType] ||
      UiBasicInputComponent;

    const componentRef = this.injectComponent(
      this.inputComponentAnchor,
      inputComponent
    );

    if (!componentRef) return;

    componentRef.instance.data = this.data;
    componentRef.instance.hostForm = this.globalVariableService.rootForm;
    componentRef.instance.writeValue(this.pendingValue);
    componentRef.instance.registerOnChange(this.onChange);
    componentRef.instance.registerOnTouched(this.onTouched);

    this.controlComponent = componentRef.instance;
    this.setControlErrors();
  }

  private fetchOptions(): void {
    if (!this.data || !this.data.options) {
      this.pendingValue = null;
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
      this.controlComponent?.writeValue(value);
    };

    const selectFirst = (options: OptionItem[]) => {
      if (!autoSelectFirst || !options.length) return;
      updateControlValue(options[0].value);
    };

    const setLoading = (val: boolean) => {
      this.loading = val;
      this.formReadyStateService.optionsLoading(val);
    };

    if (!src) {
      selectFirst(staticOptions);
      return;
    }

    const source$ =
      typeof src === 'string'
        ? this.globalVariableService.optionsSources?.[src]
        : this.optionsDataService.getOptions$(src, () => {
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

          if (this.pendingValue) {
            updateControlValue(this.pendingValue);
            this.pendingValue = null;
          } else {
            selectFirst(options);
          }

          setLoading(false);
          this.controlComponent?.onOptionsGet(options);
        }),
        finalize(() => setLoading(false))
      )
      .subscribe();
  }

  private errorMessageEvent(): void {
    if (!this.control) return;

    const control = this.control;
    const controlComponent = this.controlComponent;

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
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  /**
   * If the CVA has errors but this control doesn't,
   * we set this control with the CVA errors
   */
  private setControlErrors(): void {
    const cvaErrors = getControlErrors(this.controlComponent?.control);
    if (!this.control?.errors && cvaErrors) {
      this.control?.setErrors(cvaErrors);
    }
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
