import { CommonModule } from '@angular/common';
import {
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
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UI_BASIC_COMPONENTS } from '../../constants/ui-basic-components.constant';
import { FormControlConfig } from '../../models';
import { UiComponents } from '../../models/ui-components-type.type';
import { ErrorMessageService } from '../../services';
import { CustomControlComponent } from '../custom-control/custom-control.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { UiBasicInputComponent } from '../ui-basic/ui-basic-input/ui-basic-input.component';

@Component({
  selector: 'form-control',
  standalone: true,
  imports: [CommonModule, ErrorMessageComponent],
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
  private _errorMessageService = inject(ErrorMessageService);
  private _controlComponentRef?: CustomControlComponent;
  private _onChange = (_: any) => {};
  private _onTouched = () => {};

  private readonly _pendingValue$ = new BehaviorSubject<any>('');

  @Input() control: AbstractControl | null = null;
  @Input() data: FormControlConfig | null = null;
  @Input() uiComponents: UiComponents = {};
  @Input() customComponent?: Type<CustomControlComponent>;

  @ViewChild('componentAnchor', { read: ViewContainerRef })
  componentAnchor!: ViewContainerRef;

  isMaterial = false;

  ngOnChanges(): void {
    this._injectComponent();
  }

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

  private _injectComponent(): void {
    const inputComponent =
      this.customComponent ||
      this.uiComponents[this._inputType]?.component ||
      UI_BASIC_COMPONENTS[this._inputType]?.component ||
      UiBasicInputComponent;

    if (this.uiComponents[this._inputType]) {
      this.isMaterial = this.uiComponents[this._inputType]?.type === 'material';
    }

    window.setTimeout(() => {
      this.componentAnchor.clear();
      const componentRef = this.componentAnchor.createComponent(inputComponent);

      this._controlComponentRef = componentRef.instance;
      componentRef.instance.data = this.data;
      componentRef.instance?.registerOnChange(this._onChange);
      componentRef.instance?.registerOnTouched(this._onTouched);
      componentRef.instance?.writeValue(this._pendingValue$.value);
    }, 0);
  }
}
