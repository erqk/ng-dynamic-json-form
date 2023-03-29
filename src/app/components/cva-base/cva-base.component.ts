import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  UntypedFormControl,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-cva-base',
  template: '',
  styles: [],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CvaBaseComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CvaBaseComponent),
      multi: true,
    },
  ],
})
export class CvaBaseComponent implements ControlValueAccessor, Validator {
  form?: AbstractControl;
  formControl?: UntypedFormControl;

  writeValue(obj: any): void {
    if (obj === undefined || obj === null) return;
    this.form?.patchValue(obj);
    this.formControl?.setValue(obj);
  }
  registerOnChange(fn: any): void {
    if (!!this.form) {
      this.form?.valueChanges.pipe(debounceTime(0)).subscribe(fn);
    }

    if (!!this.formControl) {
      this.formControl?.valueChanges.pipe(debounceTime(0)).subscribe(fn);
    }
  }
  registerOnTouched(fn: any): void {
    this.form?.markAllAsTouched();
    this.formControl?.markAllAsTouched();
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form?.disable();
      this.formControl?.disable();
    } else {
      this.form?.enable();
      this.formControl?.enable();
    }

    this.form?.updateValueAndValidity();
    this.formControl?.updateValueAndValidity();
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (!!this.form) {
      return this.form.invalid ? this.form.errors : null;
    }

    if (!!this.formControl) {
      return this.formControl.invalid ? this.formControl.errors : null;
    }

    return null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    this.form?.updateValueAndValidity();
  }
}
