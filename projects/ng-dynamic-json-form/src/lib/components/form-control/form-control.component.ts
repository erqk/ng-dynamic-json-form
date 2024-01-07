import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
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
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UI_BASIC_COMPONENTS } from '../../constants/ui-basic-components.constant';
import { ControlLayoutDirective } from '../../directives';
import { FormControlConfig } from '../../models';
import { UiComponents } from '../../models/ui-components.type';
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
  private _configMappingService = inject(ConfigMappingService);
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

  @ViewChild('inputComponentAnchor', { read: ViewContainerRef })
  inputComponentAnchor!: ViewContainerRef;

  @ViewChild('errorComponentAnchor', { read: ViewContainerRef })
  errorComponentAnchor!: ViewContainerRef;

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
      this._injectInputComponent();
      this._injectErrorMessageComponent();
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

  private _injectInputComponent(): void {
    const inputComponent =
      this.customComponent ||
      this.uiComponents?.[this._inputType] ||
      UI_BASIC_COMPONENTS[this._inputType] ||
      UiBasicInputComponent;

    this.inputComponentAnchor.clear();
    const componentRef =
      this.inputComponentAnchor.createComponent(inputComponent);

    this._controlComponentRef = componentRef.instance;
    componentRef.instance.data = this._configMappingService.mapCorrectConfig(
      this.data
    );
    componentRef.instance.registerOnChange(this._onChange);
    componentRef.instance.registerOnTouched(this._onTouched);
    componentRef.instance.writeValue(this._pendingValue$.value);
    componentRef.instance['_internal_init'](this.form, this.control);
  }

  private _injectErrorMessageComponent(): void {
    if (!this.errorMessageComponent || !this.errorComponentAnchor) return;

    this.errorComponentAnchor.clear();
    const componentRef = this.errorComponentAnchor.createComponent(
      this.errorMessageComponent
    );

    componentRef.instance.control = this.control;
    componentRef.instance.validators = this.data?.validators;
  }
}
