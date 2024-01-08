import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  Input,
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
import { Observable, finalize, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UI_BASIC_COMPONENTS } from '../../constants/ui-basic-components.constant';
import { ControlLayoutDirective } from '../../directives';
import { FormControlConfig, OptionItem } from '../../models';
import { UiComponents } from '../../models/ui-components.type';
import { OptionsDataService } from '../../services';
import { ConfigMappingService } from '../../services/config-mapping.service';
import { CustomControlComponent } from '../custom-control/custom-control.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { UiBasicInputComponent } from '../ui-basic/ui-basic-input/ui-basic-input.component';

@Component({
  selector: 'form-control',
  standalone: true,
  imports: [CommonModule, ErrorMessageComponent, ControlLayoutDirective],
  templateUrl: './form-control.component.html',
  styles: [
    ':host {display: flex; flex-direction: column; gap: 0.35rem; width: 100%}',
  ],
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
  private _el = inject(ElementRef);
  private _configMappingService = inject(ConfigMappingService);
  private _optionsDataService = inject(OptionsDataService);
  private _controlComponentRef?: CustomControlComponent;
  private _onChange = (_: any) => {};
  private _onTouched = () => {};
  private readonly _pendingValue$ = new BehaviorSubject<any>('');

  @Input() form?: UntypedFormGroup;
  @Input() control?: AbstractControl;
  @Input() data?: FormControlConfig;
  @Input() uiComponents?: UiComponents;
  @Input() customComponent?: Type<CustomControlComponent>;
  @Input() errorMessageComponent?: Type<ErrorMessageComponent>;
  @Input() loadingComponent?: Type<any>;

  @ViewChild('inputComponentAnchor', { read: ViewContainerRef })
  inputComponentAnchor!: ViewContainerRef;

  @ViewChild('errorComponentAnchor', { read: ViewContainerRef })
  errorComponentAnchor!: ViewContainerRef;

  @ViewChild('loadingComponentAnchor', { read: ViewContainerRef })
  loadingComponentAnchor!: ViewContainerRef;

  loading = false;

  writeValue(obj: any): void {
    this._pendingValue$.next(obj);
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
    requestAnimationFrame(() => {
      this._injectLoadingComponent();
      this._injectInputComponent();
      this._injectErrorMessageComponent();
      this._fetchOptions();
    });
  }

  private get _inputType(): string {
    // If `ngxMaskConfig` is specified, we use input with mask
    const defaultInput = !this.data?.ngxMaskConfig ? 'text' : 'textMask';

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
    componentRef.instance.registerOnChange(this._onChange);
    componentRef.instance.registerOnTouched(this._onTouched);
    componentRef.instance.writeValue(this._pendingValue$.value);
    componentRef.instance['_internal_init'](this.control);
  }

  private _injectErrorMessageComponent(): void {
    const componentRef = this._injectComponent(
      this.errorComponentAnchor,
      this.errorMessageComponent
    );

    if (!componentRef) return;

    componentRef.instance.control = this.control;
    componentRef.instance.validators = this.data?.validators;
  }

  private _injectLoadingComponent(): void {
    this._injectComponent(this.loadingComponentAnchor, this.loadingComponent);
  }

  private _fetchOptions(): void {
    if (!this.data || !this.data.options) {
      return;
    }

    const { data: existingOptions = [], sourceAppendPosition } =
      this.data.options;

    const setData = (
      source: Observable<OptionItem[]>
    ): Observable<OptionItem[]> =>
      source.pipe(
        tap((x) => {
          const appendBefore = sourceAppendPosition === 'before';
          const dataGet = appendBefore
            ? x.concat(existingOptions)
            : existingOptions.concat(x);

          this.data!.options!.data = dataGet;
          this._setLoading(false);
        }),
        finalize(() => this._setLoading(false))
      );

    if (!this.form || !this.data.options.trigger) {
      this._setLoading(true);
      this._optionsDataService
        .getOptions$(this.data.options)
        .pipe(setData)
        .subscribe();

      return;
    }

    const trigger = this.data.options.trigger;
    if (!trigger.action) return;

    const optionsOnTrigger$ =
      trigger.action === 'FILTER'
        ? this._optionsDataService.filterOptionsOnTrigger$(this.form, trigger)
        : this._optionsDataService.requestOptionsOnTrigger$(this.form, trigger);

    this._setLoading(true);
    optionsOnTrigger$
      .pipe(
        setData,
        tap((x) => {
          const clearData = !x.length || x.length > 1;
          const autoValue = clearData ? '' : x[0].value;
          this.control?.setValue(autoValue);
        })
      )
      .subscribe();
  }

  private _setLoading(value: boolean): void {
    const host = this._el.nativeElement as HTMLElement;

    this.loading = value;

    if (!this.loadingComponent) {
      this.loading
        ? host.classList.add('disabled')
        : host.classList.remove('disabled');
    }
  }
}
