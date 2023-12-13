import { Component, HostListener, SimpleChanges, inject } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { FormControlConfig } from '../../models';
import { ErrorMessageService } from '../../services';
import { FormDataTransformService } from '../../services/form-data-transform.service';
import { filter, map, startWith } from 'rxjs/operators';
import { FormControlType } from '../../models/form-control-type.interface';
import { Observable } from 'rxjs/internal/Observable';

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

  public data: FormControlConfig | null = null;

  /**Can be override by instance of `AbstractControl`
   * @example
   * public override control = new FormControl() 'or' new UntypedFormControl();
   * public override control = new FormGroup() 'or' new UntypedFormGroup();
   * public override control = new FormArray() 'or' new UntypedFormArray();
   */
  public control?: any;

  public errors$?: Observable<string[]>;

  @HostListener('focusout', ['$event'])
  onFocusOut(): void {
    this._onTouched();
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    const { control, data } = simpleChanges;

    if (control && data) {
      this.errors$ = this._control.valueChanges.pipe(
        startWith(this._control.status),
        map(() =>
          this._errorMessageService.getErrorMessages(
            this._control,
            this.data?.validators || []
          )
        )
      );
    }
  }

  writeValue(obj: any): void {
    if (obj === undefined || obj === null || obj === '') return;
    this._control?.setValue(this._inputData(obj));
  }

  registerOnChange(fn: any): void {
    this._control?.valueChanges
      .pipe(
        startWith(this.control.value),
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
