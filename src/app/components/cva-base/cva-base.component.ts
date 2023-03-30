import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormControl,
  ValidationErrors,
  Validator,
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

  writeValue(obj: any): void {
    if (obj === undefined || obj === null) return;
    this.form?.patchValue(obj);
  }
  registerOnChange(fn: any): void {
    this.form?.valueChanges.pipe(debounceTime(0)).subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.form?.markAllAsTouched();
    // this.formControl?.markAllAsTouched();
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form?.disable() : this.form?.enable();
    this.form?.updateValueAndValidity();
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (!this.form) {
      return null;
    }

    return this.form.invalid ? this.form.errors : null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    this.form?.updateValueAndValidity();
  }
}
