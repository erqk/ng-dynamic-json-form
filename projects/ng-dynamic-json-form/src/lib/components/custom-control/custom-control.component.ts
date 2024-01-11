import { Component, HostListener, ViewChild, inject } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { InputText } from 'primeng/inputtext';
import { Subject } from 'rxjs';
import { map, startWith, takeUntil, tap } from 'rxjs/operators';
import { FormControlConfig } from '../../models';
import { ControlValueService, FormValidationService } from '../../services';

@Component({
  selector: 'custom-control',
  template: ``,
  standalone: true,
})
export class CustomControlComponent implements ControlValueAccessor, Validator {
  private _internal_controlValueService = inject(ControlValueService);
  private _internal_formValidationService = inject(FormValidationService);

  private _internal_onTouched = () => {};

  private _internal_getInputData = (input: unknown) =>
    this._internal_controlValueService.mapInputData(input, this.data);

  private _internal_getOutputData = (input: unknown) =>
    this._internal_controlValueService.mapOutputData(input, this.data);

  private readonly _internal_init$ = new Subject<void>();

  /**Can be override by instance of `AbstractControl`
   * @example
   * public override control = new FormControl() 'or' new UntypedFormControl();
   * public override control = new FormGroup() 'or' new UntypedFormGroup();
   * public override control = new FormArray() 'or' new UntypedFormArray();
   */
  public control?: any;
  public data?: FormControlConfig;
  public errorMessages: string[] = [];

  @ViewChild(InputText) inputTextRef?: InputText;
  @ViewChild(MatFormField) matFormFielRef?: MatFormField;

  @HostListener('focusout', ['$event'])
  onFocusOut(): void {
    this._internal_onTouched();
  }

  writeValue(obj: any): void {
    if (obj === undefined || obj === null || obj === '') return;
    this._internal_control.setValue(this._internal_getInputData(obj));
    this._internal_control.markAsDirty();
    this._internal_control.markAsTouched();
  }

  registerOnChange(fn: any): void {
    this._internal_control?.valueChanges
      .pipe(
        startWith(this._internal_control.value),
        map((x) => this._internal_getOutputData(x))
      )
      .subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this._internal_onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled
      ? this._internal_control?.disable()
      : this._internal_control?.enable();
    this._internal_control?.updateValueAndValidity();
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this._internal_control?.errors ?? null;
  }

  /**@internal */
  private get _internal_control(): AbstractControl {
    if (!this.control || !(this.control instanceof AbstractControl)) {
      throw {
        message: `The component extends CustomControlComponent but control is not defined`,
        component: this,
      };
    }

    return this.control;
  }

  /**
   * @internal
   * Init event after component creation. Called by FormControlComponent.
   */
  private _internal_init(control?: AbstractControl): void {
    this._internal_init$.next();
    this._internal_listenErrors(control);
  }

  /**@internal */
  private _internal_listenErrors(control?: AbstractControl): void {
    if (!control) return;

    this._internal_formValidationService
      .getErrorMessages$(control, this.data?.validators)
      .pipe(
        tap((x) => (this.errorMessages = x)),
        takeUntil(this._internal_init$)
      )
      .subscribe();
  }
}
