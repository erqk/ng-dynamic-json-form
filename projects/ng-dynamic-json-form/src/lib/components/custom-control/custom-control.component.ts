import { Component, HostListener, inject } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, filter, map, startWith, tap } from 'rxjs/operators';
import { FormControlConfig } from '../../models';
import { ErrorMessageService } from '../../services';
import { FormDataTransformService } from '../../services/form-data-transform.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'custom-control',
  template: ``,
  standalone: true,
})
export class CustomControlComponent implements ControlValueAccessor, Validator {
  private _dataTransformService = inject(FormDataTransformService);
  private _errorMessageService = inject(ErrorMessageService);

  private _onTouched = () => {};

  private _inputData = (input: unknown) =>
    this._dataTransformService.inputData(input, this.data);

  private _outputData = (input: unknown) =>
    this._dataTransformService.outputData(input, this.data);

  /**Can be override by instance of `AbstractControl`
   * @example
   * public override control = new FormControl() 'or' new UntypedFormControl();
   * public override control = new FormGroup() 'or' new UntypedFormGroup();
   * public override control = new FormArray() 'or' new UntypedFormArray();
   */
  public control?: any;

  public data: FormControlConfig | null = null;
  public errors$ = new BehaviorSubject<string[]>([]);

  @HostListener('focusout', ['$event'])
  onFocusOut(): void {
    this._onTouched();
  }

  writeValue(obj: any): void {
    if (obj === undefined || obj === null || obj === '') return;
    this._control.setValue(this._inputData(obj));
    this._control.markAsDirty();
    this._control.markAsTouched();
  }

  registerOnChange(fn: any): void {
    this._control?.valueChanges
      .pipe(
        startWith(this._control.value),
        map((x) => this._outputData(x))
      )
      .subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this._control?.disable() : this._control?.enable();
    this._control?.updateValueAndValidity();
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this._control?.errors ?? null;
  }

  listenErrors(control: AbstractControl | null): void {
    if (!control) return;

    control.statusChanges
      .pipe(
        startWith(control.status),
        tap(() => {
          const messages = this._errorMessageService.getErrorMessages(
            this._control.errors,
            this._control.value,
            this.data?.validators || []
          );

          this._control.setErrors(control.errors);
          this.errors$.next(messages);
        })
      )
      .subscribe();
  }

  private get _control(): AbstractControl {
    if (!this.control || !(this.control instanceof AbstractControl)) {
      throw {
        message: `The component extends CustomControlComponent but control is not defined`,
        component: this,
      };
    }

    return this.control;
  }
}
